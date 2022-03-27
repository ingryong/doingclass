<template>
  <div class="container py-5">
    <h1 class="text-center py-2">{{ user.displayName }}님의 Profile</h1>
    <div class="profile_group f-column">
      <label for="profile-img" class="profile-img">
        <img v-show="user.photoURL" :src="user.photoURL" />
        <font-awesome-icon :icon="['fas', 'user']" v-show="!user.photoURL" />
      </label>
      <input
        class="img_upload"
        type="file"
        id="profile-img"
        accept="image/*"
        v-show="false"
        @change="imgUpload"
      />
      <a style="text-align:center;" v-show="user.photoURL" @click="imgDelete">
        <i class="fa-solid fa-circle-user"></i> 기본 이미지로
      </a>
      <input
        id="profile_email"
        type="text"
        class="form-control"
        ref="useremail"
        v-model="user.email"
        disabled
      />
      <input
        id="profile_name"
        type="text"
        class="form-control"
        placeholder="이름"
        ref="username"
        v-model="user.displayName"
        value=""
        maxlength="8"
      />
      <button class="btn btn-lg btn-outline-primary mt-2" @click="saveProfile">
        내 정보 수정하기
      </button>
      <button class="btn btn-lg btn-outline-danger mt-2" @click="signOut">
        logout
      </button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    // 현재 컴포넌트에서 사용할 데이터셋
    return {
      username: ""
    };
  },
  computed: {
    ...mapState(["storage", "user"])
  },
  methods: {
    ...mapActions(["signOut"]),
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
            this.user
              .updateProfile({
                photoURL: url
              })
              .then(() => {})
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
      this.user
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
      this.user
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
.profile_group {
  width: 340px;
  margin: auto;

  input {
    margin-top: 10px;
    padding: 10px 20px;
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
</style>
