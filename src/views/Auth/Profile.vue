<template>
  <div class="profile-container">
    <h1>내 정보</h1>
    <div class="profile_group f-column m-auto">
      <input
        id="profile_email"
        type="text"
        class="form-control"
        placeholder="profile.email"
        ref="useremail"
        v-model="useremail"
        disabled
      />
      <input
        id="profile_name"
        type="text"
        class="form-control"
        placeholder="이름"
        ref="username"
        v-model="username"
        value="2"
      />
      <button class="btn-l btn-red" @click="signOut">logout</button>
    </div>
  </div>
</template>

<script>
import { getAuth, updateProfile, signOut } from "firebase/auth";
const auth = getAuth();
const user = auth.currentUser;

if (user !== null) {
  user.providerData.forEach(profile => {
    profile.email;
    profile.displayName;
  });
}
export default {
  data() {
    // 현재 컴포넌트에서 사용할 데이터셋
    return {
      useremail: "",
      username: "",
      userpw: ""
    };
  },
  methods: {
    profileUpdate() {
      updateProfile(auth.currentUser, {
        displayName: "",
        photoURL: "https://example.com/jane-q-user/profile.jpg"
      })
        .then(() => {
          // Profile updated!
          // ...
        })
        .catch(error => {
          // An error occurred
          console.log(error);
        });
    },
    signOut() {
      signOut(auth)
        .then(() => {
          // sign-out successful
          this.$router.replace("/");
        })
        .catch(error => {
          // an error happened
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss">
.profile-container {
  padding: 40px 0px;
  padding-bottom: 100px;

  h1 {
    font-size: 3rem;
  }

  .profile_group {
    width: 340px;
    margin: auto;

    input {
      margin-top: 10px;
      line-height: 1.6;
      padding: 8px 20px;
      border: 1px solid $gray-1;
      border-radius: 0px;
      font-size: 1rem;
    }
  }
  button {
    margin-top: 20px;
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
</style>
