<template>
  <div class="login">
    <h1>Login</h1>
    <div class="login_group">
      <div class="input_group f-column m-auto">
        <input
          type="text"
          class="form-control"
          placeholder="이메일"
          ref="user_id"
          v-model="user_id"
          v-on:keyup.enter="login"
        />
        <input
          type="password"
          class="form-control"
          placeholder="비밀번호"
          ref="user_pw"
          v-model="user_pw"
          v-on:keyup.enter="login"
        />
      </div>
      <div class="btn_group">
        <button class="btn-l" @click="login">로그인</button>
      </div>
      <div class="flex between">
        <a href="/join">회원가입</a>
        <apan>비밀번호 찾기</apan>
      </div>
    </div>
  </div>
</template>

<!-- 
    script
-->
<script>
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";

export default {
  data() {
    // 현재 컴포넌트에서 사용할 데이터셋
    return {
      user_id: "",
      user_pw: "",
      inSignin: false
    };
  },
  methods: {
    login() {
      if (!this.user_id) {
        alert("이메일을 입력해주시기 바랍니다.");
        this.$refs.user_id.focus();
        return;
      } else if (!this.user_pw) {
        alert("패스워드를 입력해주시기 바랍니다.");
        this.$refs.user_pw.focus();
        return;
      }
      var auth = getAuth();
      signInWithEmailAndPassword(auth, this.user_id, this.user_pw)
        .then(user => {
          console.log("User", user);
          this.$router.replace("/");
        })
        .catch(error => {
          console.log(error);
          if (error && error.message) {
            console.log(error.code);
            if (error.code === "auth/invalid-email") {
              alert("올바른 이메일주소를 입력해주세요.");
              this.$refs.user_id.focus();
            } else if (error.code === "auth/user-not-found") {
              alert(
                "입력한 회원정보를 찾을 수 없습니다. \n이메일주소를 다시 확인해주세요"
              );
              this.$refs.user_id.focus();
            } else if (error.code === "auth/wrong-password") {
              alert(
                "비밀번호가 일치하지 않습니다. \n비밀번호를 다시 확인해주세요"
              );
              this.$refs.user_pw.focus();
            } else {
              alert(error.message);
            }
          }
        });
    },
    signout() {
      signOut()
        .then(function() {
          // sign-out successful
          this.$router.replace("/");
        })
        .catch(function(error) {
          // an error happened
          console.log(error);
        });
    }
  }
};
</script>

<!-- 
    scss 
-->
<style lang="scss">
.login {
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
