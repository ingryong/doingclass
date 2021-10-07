<template>
  <div class="join">
    <h1>SignUp</h1>
    <div class="login_group">
      <div class="input_group f-column m-auto">
        <input
          type="text"
          class="form-control"
          placeholder="이메일"
          ref="user_id"
          v-model="user_id"
          v-on:keyup.enter="signup"
        />
        <input
          type="password"
          class="form-control"
          placeholder="비밀번호"
          ref="user_pw"
          v-model="user_pw"
        />
        <input
          type="password"
          class="form-control"
          placeholder="비밀번호 확인"
          ref="confirm"
          v-model="confirm"
          v-on:keyup.enter="signup"
        />
      </div>
      <div class="btn_group">
        <button class="btn-l" @click="signup">회원가입</button>
      </div>
      <div class="flex between">
        <a href="/login">로그인</a>
        <apan>아이디/비밀번호 찾기</apan>
      </div>
    </div>
  </div>
</template>

<script>
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

export default {
  data() {
    // 현재 컴포넌트에서 사용할 데이터셋
    return {
      user_id: "",
      user_pw: "",
      confirm: ""
    };
  },
  methods: {
    signup() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.user_id, this.user_pw)
        .then(userCredential => {
          const user = userCredential.user;
          console.log("User", user);
          alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
          this.$router.replace("/login");
        })
        .catch(error => {
          if (!this.user_id) {
            alert("이메일을 입력해주세요.");
            this.$refs.user_id.focus();
            return;
          } else if (!this.user_pw) {
            alert("비밀번호를 입력해주세요.");
            this.$refs.user_pw.focus();
            return;
          } else if (!this.confirm) {
            alert("비밀번호 확인을 입력해주세요.");
            this.$refs.confirm.focus();
          } else if (this.user_pw !== this.confirm) {
            alert("입력하신 비밀번호가 일치하지 않습니다.");
            this.$refs.confirm.focus();
          } else if (error.code === "auth/invalid-email") {
            alert("올바른 이메일주소를 입력해주세요.");
            this.$refs.user_id.focus();
          } else if (error.code === "auth/email-already-in-use") {
            alert("이미 사용중인 이메일주소 입니다.");
            this.$refs.user_id.focus();
          } else if (error.code === "auth/weak-password") {
            alert(
              "입력하신 비밀번호가 너무 짧습니다. \n6자 이상의 비밀번호를 설정해주세요"
            );
            this.$refs.user_pw.focus();
          } else {
            alert(error.message);
          }
          console.log(error.code);
        });
    }
  }
};
</script>

<style lang="scss">
.join {
  padding: 40px 0px;
  padding-bottom: 100px;
  background: #f1f1f1;

  h1 {
    font-size: 3rem;
  }

  .login_group {
    width: 340px;
    margin: auto;

    .input_group {
      input {
        line-height: 1.6;
        padding: 8px 20px;
        border: 1px solid $gray-1;
        border-radius: 0px;
        font-size: 1rem;
      }
    }
    .btn_group {
      padding: 10px 0px;
      margin: auto;
      button {
        background-color: #222;
        color: #fff;
        border: 1px solid #222;
      }
      button:hover {
        background-color: #000;
        border: 1px solid #000;
      }
    }
  }
}
</style>
