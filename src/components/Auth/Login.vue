<template>
  <div class="container py-5">
    <div class="card p-4 border-0">
      <h1 class="text-center py-2">Login</h1>
      <p style="text-align:center;">
        테스트 계정외의<br />
        정상적인 회원가입 절차를 통해서도<br />서비스를 이용 가능합니다.<br /><br />테스트계정
        : test@gmail.com / 123123
      </p>
      <div class="login_group">
        <div class="d-grid py-1">
          <input
            type="text"
            class="form-control py-2 px-3"
            placeholder="이메일"
            ref="user_id"
            v-model="user_id"
            v-on:keyup.enter="login"
          />
          <input
            type="password"
            class="form-control py-2 px-3 mt-2"
            placeholder="비밀번호"
            ref="user_pw"
            v-model="user_pw"
            v-on:keyup.enter="login"
          />
        </div>
        <div class="d-grid py-2">
          <button class="btn btn-lg btn-dark" @click="login">로그인</button>
        </div>
        <div class="flex between">
          <a href="/join">회원가입</a>
          <span>비밀번호 찾기</span>
        </div>
      </div>
    </div>
  </div>
</template>

<!-- 
    script
-->
<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    // 현재 컴포넌트에서 사용할 데이터셋
    return {
      user_id: "",
      user_pw: ""
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
      const auth = getAuth();
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
    }
  }
};
</script>

<style lang="scss">
.login_group {
  width: 340px;
  margin: auto;
}
</style>
