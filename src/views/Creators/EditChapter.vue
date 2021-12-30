<template>
  <div>
    <!-- 
    ---------- 강의 내용 입력 ----------
    -->
    <div class="create_container">
      <div class="notice_card">
        <h3>챕터 수정</h3>
      </div>
      <div class="input_group">
        <p>챕터 제목</p>
        <h4>
          <input
            type="text"
            class="form-control m-1 width-100"
            id="update_chapter_name"
            maxlength="35"
            placeholder="세부강의의 제목을 입력해주세요(최대 35자)"
            :value="chapter.chapter_name"
          />
        </h4>
        <div class="chap_img_upload">
          <p>챕터 이미지</p>
          <p style="text-align:center;">
            챕터 이미지는 16:9 비율에 최적화되어 있습니다.<br />360x180의
            사이즈가 가장 적합합니다.
          </p>
          <label for="input-file">
            <p class="chap_img" v-if="!chapter.chapter_img">
              챕터 이미지를<br />등록 해주세요.
            </p>
            <img
              class="chap_img"
              :src="chapter.chapter_img"
              v-if="chapter.chapter_img"
            />
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
      </div>

      <!-- 
    ---------- 돌아가기/저장하기/삭제하기 버튼 ----------
    -->
      <router-link
        tag="button"
        class="btn-m btn-gray m-1"
        :to="`/creators/editclass3/${this.url}`"
      >
        돌아가기
      </router-link>
      <button class="btn-m btn-blue m-1" id="send" @click="chapter_upload()">
        챕터 저장하기
      </button>
      <button
        class="btn-m btn-red m-1"
        id="delete_chap"
        @click="chapter_delete()"
      >
        챕터 삭제하기
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
      cur_id: this.$route.params.cur_id,
      chapter: "",
      img: "../../assets/imgs/PhotoPotrait.svg"
    };
  },
  async mounted() {
    /*
    ---------- 챕터(type:"chapter")불러오기 ---------
    */
    await this.db
      .collection("onlineclass")
      .doc(this.url)
      .collection("curriculum")
      .doc(this.cur_id)
      .onSnapshot(result => {
        this.chapter = result.data();
      });
  },
  methods: {
    /*
    ---------- 세부강의 업데이트 하기 ---------
    */
    async chapter_upload() {
      await this.db
        .collection("onlineclass")
        .doc(this.url)
        .collection("curriculum")
        .doc(this.cur_id)
        .update({
          update_date: new Date(),
          chapter_name: document.getElementById("update_chapter_name").value
        })
        .then(() => {
          this.$router.push(`/creators/editclass3/${this.url}`);
        })
        .catch(error => {
          console.log("error updateing document:", error);
        });
    },
    /*
    ---------- 이미지 추가하기 ---------
    */
    async imgUpload() {
      const fileInfo = document.querySelector(".img_upload").files[0];
      const storageRef = this.storage.ref();
      const updateUrl = storageRef.child(
        "images/class/" + this.url + "/" + uuidv4()
      );
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
            this.chapter_img = url;

            this.db
              .collection("onlineclass")
              .doc(this.url)
              .collection("curriculum")
              .doc(this.cur_id)
              .update({
                chapter_img: url
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
    ---------- 챕터 삭제하기 ---------
    */
    async chapter_delete() {
      if (
        confirm("정말 삭제하시겠습니까? 챕터 안의 강의도 함께 삭제됩니다.") ===
        true
      ) {
        await this.db
          .collection("onlineclass")
          .doc(this.url)
          .collection("curriculum")
          .doc(this.cur_id)
          .delete()
          .then(() => {
            alert("삭제되었습니다.");
            this.$router.push(`/creators/editclass3/${this.url}`);
          });
      } else {
        return false;
      }
    }
  }
};
</script>

<style lang="scss">
.chap_img_upload {
  width: 100%;
  label {
    margin: auto;
    p {
      padding: 10px;
      padding-top: 75px;
      width: 320px;
      height: 180px;
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
      width: 320px;
      height: 180px;
      object-fit: cover;
      border-radius: 4px;
    }
  }
}
#delete_chap {
  float: right;
}
</style>
