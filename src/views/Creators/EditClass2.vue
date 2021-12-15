<template>
  <div>
    <!-- 메인 컨텐츠 -->
    <div class="create_container">
      <div class="notice_card">
        <h3>2. 클래스 소개</h3>
        <p>
          클래스를 수강하려는 수강생들에게 클래스의 정보를 입력해주세요.<br />
          [저장하기]버튼을 누르면 모든 수정 사항은 즉시 반영되어 보여집니다.
        </p>
      </div>

      <div class="input_group">
        <h4>헤더 이미지 업로드</h4>
        <p>
          소개페이지 헤더 부분에 보일 4개의 이미지입니다. <br />
          하단의 저장버튼을 누르셔야 정상적으로 저장됩니다.
        </p>

        <div class="header-img-upload">
          <div class="banner_left">
            <label for="header_img1">
              <p class="chap_img" v-if="!header_img1">
                헤더 이미지를<br />등록 해주세요.
              </p>
              <img class="chap_img" :src="header_img1" v-if="header_img1" />
            </label>
            <input
              class="img_upload"
              type="file"
              id="header_img1"
              accept="image/*"
              v-show="false"
              @change="imgUpload"
            />
          </div>
          <div class="banner_right_top">
            <label for="header_img2">
              <p class="chap_img" v-if="!header_img2">
                헤더 이미지를<br />등록 해주세요.
              </p>
              <img class="chap_img" :src="header_img2" v-if="header_img2" />
            </label>
            <input
              class="img_upload"
              type="file"
              id="header_img2"
              accept="image/*"
              v-show="false"
              @change="imgUpload"
            />
          </div>
          <div class="banner_right_bottom1">
            <label for="header_img3">
              <p class="chap_img" v-if="!header_img3">
                헤더 이미지를<br />등록 해주세요.
              </p>
              <img class="chap_img" :src="header_img3" v-if="header_img3" />
            </label>
            <input
              class="img_upload"
              type="file"
              id="header_img3"
              accept="image/*"
              v-show="false"
              @change="imgUpload"
            />
          </div>
          <div class="banner_right_bottom2">
            <label for="header_img4">
              <p class="chap_img" v-if="!header_img4">
                헤더 이미지를<br />등록 해주세요.
              </p>
              <img class="chap_img" :src="header_img4" v-if="header_img4" />
            </label>
            <input
              class="img_upload"
              type="file"
              id="header_img4"
              accept="image/*"
              v-show="false"
              @change="imgUpload"
            />
          </div>
        </div>
      </div>

      <div class="input_group">
        <h4>포스터 이미지 업로드</h4>
        <p>
          소개페이지 진입 후 가장 처음 보여질 클래스 소개 포스터
          이미지입니다.<br />
          하단의 저장버튼을 누르셔야 정상적으로 저장됩니다.
        </p>
        <div class="introduce-img-upload">
          <label for="poster_img">
            <p class="chap_img" v-if="!poster_img">
              해당 소개와 관련 이미지를<br />등록 해주세요.
            </p>
            <img class="chap_img" :src="poster_img" v-if="poster_img" />
          </label>
          <input
            class="img_upload"
            type="file"
            id="poster_img"
            accept="image/*"
            v-show="false"
            @change="imgUpload"
          />
        </div>
      </div>

      <!-- 소개1 -->
      <div class="input_group">
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
        <div class="introduce-img-upload">
          <label for="dec1">
            <p class="chap_img" v-if="!dec1_img">
              해당 소개와 관련 이미지를<br />등록 해주세요.
            </p>
            <img class="chap_img" :src="dec1_img" v-if="dec1_img" />
          </label>
          <input
            class="img_upload"
            type="file"
            id="dec1"
            accept="image/*"
            v-show="false"
            @change="imgUpload"
          />
        </div>

        <textarea
          name="dec"
          class="form-control-text-area m-1 width-100"
          id="dec1_dec"
          placeholder="내용을 입력해주세요"
          :value="doc.class_dec.dec1.dec"
          @input="mixinAutoResize"
          @change="autoSave()"
          rows="10"
        ></textarea>
      </div>

      <!-- 소개2 -->
      <div class="input_group">
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
        <div class="introduce-img-upload">
          <label for="dec2">
            <p class="chap_img" v-if="!dec2_img">
              해당 소개와 관련 이미지를<br />등록 해주세요.
            </p>
            <img class="chap_img" :src="dec2_img" v-if="dec2_img" />
          </label>
          <input
            class="img_upload"
            type="file"
            id="dec2"
            accept="image/*"
            v-show="false"
            @change="imgUpload"
          />
        </div>

        <textarea
          name="dec"
          class="form-control-text-area m-1 width-100"
          id="dec2_dec"
          placeholder="내용을 입력해주세요"
          :value="doc.class_dec.dec2.dec"
          @input="mixinAutoResize"
          rows="10"
        ></textarea>
      </div>

      <!-- 소개3 -->
      <div class="input_group">
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
        <div class="introduce-img-upload">
          <label for="dec3">
            <p class="chap_img" v-if="!dec3_img">
              해당 소개와 관련 이미지를<br />등록 해주세요.
            </p>
            <img class="chap_img" :src="dec3_img" v-if="dec3_img" />
          </label>
          <input
            class="img_upload"
            type="file"
            id="dec3"
            accept="image/*"
            v-show="false"
            @change="imgUpload"
          />
        </div>

        <textarea
          name="dec"
          class="form-control-text-area m-1 width-100"
          id="dec3_dec"
          placeholder="내용을 입력해주세요"
          :value="doc.class_dec.dec3.dec"
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
        저장하고 다음으로
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
      dec1_img: "",
      dec2_img: "",
      dec3_img: "",
      poster_img: "",
      header_img1: "",
      header_img2: "",
      header_img3: "",
      header_img4: ""
    };
  },
  mounted() {
    /*
    ---------- 커리큘럼 불러오기 ---------
    */
    this.db
      .collection("onlineclass")
      .doc(this.url)
      .onSnapshot(result => {
        this.doc = result.data();
        this.dec1_img = result.data().class_dec.dec1.img;
        this.dec2_img = result.data().class_dec.dec2.img;
        this.dec3_img = result.data().class_dec.dec3.img;
        this.poster_img = result.data().poster_img;
        this.header_img1 = result.data().header_img.header_img1;
        this.header_img2 = result.data().header_img.header_img2;
        this.header_img3 = result.data().header_img.header_img3;
        this.header_img4 = result.data().header_img.header_img4;
      });
  },
  methods: {
    /*
    ---------- 이미지 업로드 ---------
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
            if (event.target.id === "dec1") {
              // 소개이미지-1
              this.dec1_img = url;
            } else if (event.target.id === "dec2") {
              // 소개이미지-2
              this.dec2_img = url;
            } else if (event.target.id === "dec3") {
              // 소개이미지-3
              this.dec3_img = url;
            } else if (event.target.id === "poster_img") {
              // 포스터이미지
              this.poster_img = url;
            } else if (event.target.id === "header_img1") {
              // 포스터이미지
              this.header_img1 = url;
            } else if (event.target.id === "header_img2") {
              // 포스터이미지
              this.header_img2 = url;
            } else if (event.target.id === "header_img3") {
              // 포스터이미지
              this.header_img3 = url;
            } else if (event.target.id === "header_img4") {
              // 포스터이미지
              this.header_img4 = url;
            }
          });
        }
      );
    },
    /*
    ---------- 커리큘럼 내용 자동 업데이트 ---------
    */
    async autoSave() {
      await this.db
        .collection("onlineclass")
        .doc(this.url)
        .update({
          creator_uid: this.user.uid,
          creator_name: this.user.displayName,
          creator_email: this.user.email,
          last_update: new Date(),
          poster_img: this.poster_img,
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
          },
          header_img: {
            header_img1: this.header_img1,
            header_img2: this.header_img2,
            header_img3: this.header_img3,
            header_img4: this.header_img4
          }
        })
        .then(() => {})
        .catch(error => {
          console.log("error updateing document:", error);
        });
    },
    /*
    ---------- 커리큘럼 내용 업데이트 ---------
    */
    async upload() {
      await this.db
        .collection("onlineclass")
        .doc(this.url)
        .update({
          creator_uid: this.user.uid,
          creator_name: this.user.displayName,
          creator_email: this.user.email,
          last_update: new Date(),
          poster_img: this.poster_img,
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
          },
          header_img: {
            header_img1: this.header_img1,
            header_img2: this.header_img2,
            header_img3: this.header_img3,
            header_img4: this.header_img4
          }
        })
        .then(() => {
          alert("저장이 완료되었습니다.");
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
textarea {
  resize: none;
  height: auto;
}
.introduce-img-upload {
  width: 100%;
  label {
    margin: auto;
    cursor: pointer;
    p {
      padding: 10px;
      padding-top: 120px;
      width: 100%;
      height: 280px;
      text-align: center;
      margin: auto;
      box-sizing: border-box;
      background-color: #eee;
      border-radius: 4px;
      cursor: pointer;
    }
    img {
      display: block;
      margin: auto;
      width: 100%;
      object-fit: cover;
      border-radius: 4px;
    }
  }
}

.header-img-upload {
  width: 100%;
  margin: auto;
  display: grid;
  grid-template-columns: 50% 25% 25%;
  grid-template-areas:
    "left right right"
    "left right1 right2";
  label {
    width: 100%;
    cursor: pointer;
  }
  img {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
  p {
    background-color: #eee;
    width: 100%;
    height: 150px;
    box-sizing: border-box;
    margin: 0;
    text-align: center;
    padding-top: 60px;
    border: 1px dotted #ccc;
  }

  .banner_left {
    grid-area: left;
    img {
      height: 300px;
    }
    p {
      height: 300px;
      padding-top: 120px;
    }
  }
  .banner_right_top {
    grid-area: right;
  }
  .banner_right_bottom1 {
    grid-area: right1;
  }
  .banner_right_bottom2 {
    grid-area: right2;
  }
}
</style>
