<template>
  <div class="profile-container" v-if="profile.user !== null">
    <h1>{{ profile.displayName }}님의 Profile</h1>
    <div class="profile_group f-column m-auto">
      <div class="profile-img">
        <img
          v-if="$store.state.user.phothURL"
          :src="$store.state.user.phothURL"
        />
        <a><i v-if="!$store.state.user.phothURL" class="fas fa-user"/></a>
      </div>
      <input
        id="profile_email"
        type="text"
        class="form-control"
        ref="useremail"
        v-model="profile.email"
        disabled
      />
      <input
        id="profile_name"
        type="text"
        class="form-control"
        placeholder="이름"
        ref="username"
        v-model="profile.displayName"
        value=""
      />
      <button class="btn-l btn-red" @click="signOut">logout</button>
    </div>
  </div>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth();

export default {
  data() {
    // 현재 컴포넌트에서 사용할 데이터셋
    return {
      profile: this.$store.state.user,
      username: "",
      userpw: ""
    };
  },
  methods: {
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

    .profile-img {
      margin: auto;
      width: 180px;
      height: 180px;
      border-radius: 50%;
      background-color: $gray-4;
      img {
        width: 60px;
        height: 60px;
        object-fit: cover;
        object-position: center;
        border: 0px;
      }
      a {
        svg {
          margin-top: 20px;
          font-size: 10rem;
          color: white;
          text-align: center;
        }
      }
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
