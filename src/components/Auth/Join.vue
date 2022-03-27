<template>
  <div class="container py-5">
    <h1 class="text-center py-2">SignUp</h1>
    <div class="login_group">
      <div class="d-grid py-1">
        <input
          type="email"
          class="form-control py-2 px-3"
          placeholder="이메일"
          ref="user_id"
          v-model="user_id"
          v-on:keyup.enter="signup"
        />
        <input
          type="password"
          class="form-control py-2 px-3 mt-2"
          placeholder="비밀번호"
          ref="user_pw"
          v-model="user_pw"
        />
        <input
          type="password"
          class="form-control py-2 px-3 mt-2"
          placeholder="비밀번호 확인"
          ref="confirm"
          v-model="confirm"
          v-on:keyup.enter="signup"
        />
        <input
          id="input-name"
          type="text"
          class="form-control py-2 px-3 mt-2"
          placeholder="이름(닉네임)"
          ref="displayname"
          v-model="displayname"
          v-on:keyup.enter="signup"
        />
      </div>
      <div class="d-grid py-2">
        <button class="btn btn-lg btn-dark" @click="signup">회원가입</button>
      </div>
      <div class="flex between">
        <a href="/login">로그인</a>
        <span>아이디/비밀번호 찾기</span>
      </div>
    </div>
  </div>
</template>

<script>
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile
} from "firebase/auth";

export default {
  data() {
    // 현재 컴포넌트에서 사용할 데이터셋
    return {
      user_id: "",
      user_pw: "",
      confirm: "",
      displayname: ""
    };
  },
  methods: {
    signup() {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, this.user_id, this.user_pw)
        .then(userCredential => {
          // 회원가입 성공 시
          updateProfile(auth.currentUser, {
            displayName: this.displayname
          });
          const user = userCredential.user;
          console.log("User", user);
          alert("회원가입이 완료되었습니다.");
          this.$router.replace("/");
        })
        .catch(error => {
          // 회원가입 실패 시
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
          } else if (!this.displayname) {
            alert("이름(닉네임)을 입력해주세요.");
            this.$refs.displayname.focus();
            return;
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
.login_group {
  width: 340px;
  margin: auto;
}
</style>
