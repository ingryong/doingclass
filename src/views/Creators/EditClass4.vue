<template>
  <div>
    <!-- 메인 컨텐츠 -->
    <div class="create_container">
      <div class="notice_card">
        <h3>4. 크리에이터 소개</h3>
        <p>
          클래스를 수강하려는 수강생들에게 클래스의 정보를 입력해주세요.<br />
          [저장하기]버튼을 누르면 모든 수정 사항은 즉시 반영되어 보여집니다.
        </p>
      </div>

      <!-- 소개1 -->
      <div class="input_group">
        <h4>
          클래스 전용 프로필 네임
        </h4>
        <input
          type="text"
          class="form-control m-1 width-100"
          id="profile_name"
          placeholder="클래스에 사용할 프로필 네임"
          :value="doc.profile_name"
        />
        <h4>
          프로필 이미지 업로드
        </h4>
        <div class="profile-img-upload">
          <label for="input-file">
            <p class="chap_img" v-if="!profile_img">
              프로필 사진을<br />등록 해주세요.
            </p>
            <img class="chap_img" :src="profile_img" v-if="profile_img" />
          </label>
          <input
            class="img_upload"
            type="file"
            id="input-file"
            accept="image/*"
            v-show="false"
            @change="imgUpload"
          />
        </div>
        <h4>
          프로필 내용
        </h4>
        <textarea
          name="dec"
          class="form-control m-1 width-100"
          id="profile_description"
          placeholder="프로필 내용을 입력해주세요"
          :value="doc.profile_description"
          @input="mixinAutoResize"
          rows="10"
        ></textarea>
      </div>
      <router-link
        tag="button"
        class="btn-m btn-gray m-1"
        to="/creators/myclass"
      >
        돌아가기
      </router-link>
      <button class="btn-m btn-blue m-1" id="send" @click="upload()">
        저장하기
      </button>
    </div>
  </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
  data() {
    return {
      db: this.$firebase.firestore(),
      storage: this.$firebase.storage(),
      user: this.$store.state.user,
      url: this.$route.params.id,
      doc: "",
      profile_img: ""
    };
  },
  mounted() {
    this.db
      .collection("onlineclass")
      .doc(this.url)
      .get()
      .then(result => {
        this.doc = result.data();
        this.profile_img = result.data().profile_img;
      });
  },
  methods: {
    /*
    ---------- 프로필 추가하기 ---------
    */
    imgUpload(event) {
      const {
        target: { files }
      } = event;
      const fileInfo = files[0];
      const storageRef = this.storage.ref();
      const updateUrl = storageRef.child(
        "images/class/" + this.url + "/" + uuidv4()
      );
      const uploadImg = updateUrl.put(fileInfo);

      uploadImg.on(
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
            this.profile_img = url;
          });
        }
      );
    },
    async upload() {
      await this.db
        .collection("onlineclass")
        .doc(this.url)
        .update({
          creator_uid: this.user.uid,
          creator_name: this.user.displayName,
          creator_email: this.user.email,
          last_update: new Date(),
          profile_name: document.getElementById("profile_name").value,
          profile_description: document.getElementById("profile_description")
            .value,
          profile_img: this.profile_img
        })
        .then(() => {
          alert("저장되었습니다.");
        })
        .catch(error => {
          console.log("error updateing document:", error);
        });
    },
    mixinAutoResize(event) {
      // textarea 자동 높이 조절
      event.target.style.height = "auto";
      event.target.style.height = `${event.target.scrollHeight}px`;
    }
  }
};
</script>
<style lang="scss">
.profile-img-upload {
  width: 100%;
  label {
    margin: auto;
    p {
      padding: 10px;
      padding-top: 110px;
      width: 280px;
      height: 280px;
      text-align: center;
      margin: auto;
      box-sizing: border-box;
      background-image: url(~@/assets/imgs/PhotoPotrait.svg);
      background-size: contain;
      background-color: #eee;
      border-radius: 4px;
      cursor: pointer;
    }
    img {
      display: block;
      margin: auto;
      width: 280px;
      height: 280px;
      object-fit: cover;
      border-radius: 4px;
    }
  }
}
</style>
