<template>
  <div class="profile-container">
    <h1>{{ profile.displayName }}님의 Profile</h1>
    <div class="profile_group f-column m-auto">
      <label for="profile-img" class="profile-img">
        <img
          v-show="$store.state.user.photoURL"
          :src="$store.state.user.photoURL"
        />
        <font-awesome-icon
          :icon="['fas', 'user']"
          v-show="!$store.state.user.photoURL"
        />
      </label>
      <input
        class="img_upload"
        type="file"
        id="profile-img"
        accept="image/*"
        v-show="false"
        @change="imgUpload"
      />
      <a v-show="$store.state.user.photoURL" @click="imgDelete"
        >기본 이미지로</a
      >
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
        maxlength="8"
      />
      <button class="btn-l btn-blue" @click="saveProfile">
        내 정보 수정하기
      </button>
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
      storage: this.$firebase.storage(),
      profile: "",
      username: "",
      userpw: "",
      userphonenumber: ""
    };
  },
  async created() {
    this.profile = await this.$store.state.user;
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
    },
    /*
    ---------- 이미지 추가하기 ---------
    */
    async imgUpload() {
      const fileInfo = document.querySelector(".img_upload").files[0];
      const storageRef = this.storage.ref();
      const updateUrl = storageRef.child("images/photoURL/" + fileInfo.name);
      const uploadImg = updateUrl.put(fileInfo);
      await uploadImg.on(
        "state_change",
        // 변화시 동작하는 함수
        null,
        //에러시 동작하는 함수
        error => {
          console.log("실패 이유는", error);
        },
        // 성공시 동작하는 함수
        () => {
          uploadImg.snapshot.ref.getDownloadURL().then(url => {
            this.profile
              .updateProfile({
                photoURL: url
              })
              .then(() => {
                this.$router.push(`/profile`);
              })
              .catch(error => {
                console.log("error updateing document:", error);
              });
          });
        }
      );
    },
    /*
    ---------- 이미지 삭제하기 ---------
    */
    imgDelete() {
      this.profile
        .updateProfile({
          photoURL: ""
        })
        .then(() => {})
        .catch(error => {
          console.log("error updateing document:", error);
        });
    },
    /*
    ---------- 프로필 수정하기 ---------
    */
    saveProfile() {
      this.profile
        .updateProfile({
          displayName: document.getElementById("profile_name").value
        })
        .then(() => {})
        .catch(error => {
          console.log("error updateing document:", error);
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
    text-align: center;
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
      cursor: pointer;
      overflow: hidden;
      img {
        width: 180px;
        height: 180px;
        object-fit: cover;
        object-position: center;
        border: 0px;
        border-radius: 50%;
        background-color: white;
      }
      svg {
        margin-top: 20px;
        margin-left: 20px;
        font-size: 10rem;
        color: white;
        text-align: center;
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
