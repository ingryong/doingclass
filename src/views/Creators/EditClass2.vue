<template>
  <div>
    <!-- 메인 컨텐츠 -->
    <div class="container">
      <div class="notice-card">
        <h3>2. 클래스 소개</h3>
        <p>
          클래스를 수강하려는 수강생들에게 클래스의 정보를 입력해주세요.<br />
          [저장하기]버튼을 누르면 모든 수정 사항은 즉시 반영되어 보여집니다.
        </p>
      </div>

      <!-- 소개1 -->
      <div class="input-group">
        <h4>
          <input
            type="text"
            class="form-control m-1 width-100"
            id="dec1_title"
            placeholder="이런 걸 배울 거에요"
            value="이런 걸 배울 거에요"
            disabled
          />
        </h4>
        <textarea
          name="dec"
          class="form-control m-1 width-100"
          id="dec1_dec"
          placeholder="내용을 입력해주세요"
          :value="dec1.dec"
          @input="mixinAutoResize"
          rows="10"
        ></textarea>

        <p>소개 이미지 업로드</p>
        <div class="class_thumbnail">
          <img
            src="@/assets/imgs/PhotoPotrait.svg"
            v-if="dec1_img === ''"
            style="border:1px solid #eee;"
          />
          <img :src="dec1_img" v-if="dec1_img" />
        </div>
        <input
          class="form-control m-1"
          type="file"
          accept="image/*"
          @change="imgUpload"
          id="dec1"
        />
      </div>

      <!-- 소개2 -->
      <div class="input-group">
        <h4>
          <input
            type="text"
            class="form-control m-1 width-100"
            id="dec2_title"
            placeholder="이 클래스를 끝내면 무엇을 할 수 있나요?"
            value="이 클래스를 끝내면 무엇을 할 수 있나요?"
            disabled
          />
        </h4>
        <textarea
          name="dec"
          class="form-control m-1 width-100"
          id="dec2_dec"
          placeholder="내용을 입력해주세요"
          :value="dec2.dec"
          @input="mixinAutoResize"
          rows="10"
        ></textarea>

        <p>소개 이미지 업로드</p>
        <div class="class_thumbnail">
          <img
            src="@/assets/imgs/PhotoPotrait.svg"
            v-if="dec2_img === ''"
            style="border:1px solid #eee;"
          />
          <img :src="dec2_img" v-if="dec2_img" />
        </div>
        <input
          class="form-control m-1"
          type="file"
          accept="image/*"
          @change="imgUpload"
          id="dec2"
        />
      </div>

      <!-- 소개3 -->
      <div class="input-group">
        <h4>
          <input
            type="text"
            class="form-control m-1 width-100"
            id="dec3_title"
            placeholder="이런분들에게 이 클래스를 추천해요"
            value="이런분들에게 이 클래스를 추천해요"
            disabled
          />
        </h4>
        <textarea
          name="dec"
          class="form-control m-1 width-100"
          id="dec3_dec"
          placeholder="내용을 입력해주세요"
          :value="dec3.dec"
          @input="mixinAutoResize"
          rows="10"
        ></textarea>

        <p>소개 이미지 업로드</p>
        <div class="class_thumbnail">
          <img
            src="@/assets/imgs/PhotoPotrait.svg"
            v-if="dec3_img === ''"
            style="border:1px solid #eee;"
          />
          <img :src="dec3_img" v-if="dec3_img" />
        </div>
        <input
          class="form-control m-1"
          type="file"
          accept="image/*"
          @change="imgUpload"
          id="dec3"
        />
      </div>

      <router-link
        tag="button"
        class="btn-m btn-gray m-1"
        to="/creators/myclass"
      >
        돌아가기
      </router-link>
      <button class="btn-m btn-blue m-1" id="send" @click="upload()">
        저장하고 다음으로
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      db: this.$firebase.firestore(),
      storage: this.$firebase.storage(),
      user: this.$store.state.user,
      url: this.$route.params.id,
      doc: "",
      dec1: "",
      dec1_img: "",
      dec2: "",
      dec2_img: "",
      dec3: "",
      dec3_img: ""
    };
  },
  mounted() {
    this.db
      .collection("onlineclass")
      .doc(this.url)
      .get()
      .then(result => {
        this.doc = result.data();
        this.dec1 = result.data().class_dec.dec1;
        this.dec1_img = result.data().class_dec.dec1.img;
        this.dec2 = result.data().class_dec.dec2;
        this.dec2_img = result.data().class_dec.dec2.img;
        this.dec3 = result.data().class_dec.dec3;
        this.dec3_img = result.data().class_dec.dec3.img;
      });
  },
  methods: {
    imgUpload(event) {
      const {
        target: { files }
      } = event;
      const fileInfo = files[0];
      const storageRef = this.storage.ref();
      const updateUrl = storageRef.child("images/class/" + fileInfo.name);
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
            if (event.target.id === "dec1") {
              this.dec1_img = url;
            } else if (event.target.id === "dec2") {
              this.dec2_img = url;
            } else if (event.target.id === "dec3") {
              this.dec3_img = url;
            }
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
          class_dec: {
            dec1: {
              title: document.getElementById("dec1_title").value,
              dec: document.getElementById("dec1_dec").value,
              img: this.dec1_img
            },
            dec2: {
              title: document.getElementById("dec2_title").value,
              dec: document.getElementById("dec2_dec").value,
              img: this.dec2_img
            },
            dec3: {
              title: document.getElementById("dec3_title").value,
              dec: document.getElementById("dec3_dec").value,
              img: this.dec3_img
            }
          }
        })
        .then(() => {
          this.$router.push(`/creators/editclass3/${this.url}`);
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
#creators-left-side {
  position: fixed;
  top: 50px;
  left: 0px;
  z-index: 98;
  width: 220px;
  height: 100%;
  border-right: 1px solid $gray-1;
  box-sizing: border-box;
  padding: 10px;
  background-color: #fcfcfc;

  .backpage {
    display: block;
    padding-top: 10px;
    font-size: 0.875rem;
    font-weight: bold;
  }
  ul {
    padding: 10px;

    .step {
      height: 40px;
      align-items: center;
      align-content: center;
      line-height: 2rem;

      span {
        display: inline-block;
        width: 24px;
        height: 26px;
        border-radius: 4px;
        text-align: center;
        background: linear-gradient(145deg, #e6e6e6, #ffffff);
        box-shadow: 1px 1px 2px #e6e6e6, -1px -1px 2px #ffffff;
      }
    }
    .disable {
      color: $gray-3;
      cursor: default;
    }
  }
}
.container {
  .input-group {
    width: 80%;
    padding: 20px;
    box-sizing: border-box;
    margin: 30px 0;
    border: 1px solid $gray-1;
    border-radius: 5px;
  }
}
textarea {
  resize: none;
  height: auto;
}
</style>
