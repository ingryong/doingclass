<template>
  <div>
    <!-- 
    ---------- 챕터 생성 모달창 ----------
    -->
    <div>
      <div id="chap_modal" class="black-bg" v-if="chap_modal === true">
        <div class="white-bg">
          <span @click="chap_modal = false">닫기</span>
          <h4>새로운 챕터명 입력</h4>
          <input
            id="creat_chapter_name"
            type="text"
            style="display:inline; width:90%;"
            placeholder="챕터명을 입력해주세요"
          />
          <button class="btn-m btn-blue" @click="chap_upload()">
            생성하기
          </button>
        </div>
      </div>
    </div>

    <!-- 
    ---------- 메인 컨텐츠 ----------
    -->
    <div class="container">
      <div class="notice-card">
        <h3>3. 커리큘럼</h3>
        <p>
          클래스를 수강하려는 수강생들에게 클래스의 정보를 입력해주세요.<br />
          [저장하기]버튼을 누르면 모든 수정 사항은 즉시 반영되어 보여집니다.
        </p>
      </div>

      <div class="input-group">
        <p
          style="margin:auto; color:#06f; cursor:pointer;"
          @click="chap_modal = true"
        >
          커리큘럼 챕터 추가하기
        </p>
      </div>

      <!-- 
      ---------- 소개부분 ----------
      -->
      <div id="cur_area" v-for="(cur, cur_num) in curriculum" :key="cur_num">
        <div class="input-group">
          <h4>{{ cur.chapter_name }}</h4>
          <div class="cur_container">
            <div class="cur_left">
              <label for="input-file">
                <p class="chap_img" v-if="!cur.chapter_img">
                  챕터 이미지<br />등록
                </p>
                <img
                  class="chap_img"
                  :src="cur.chapter_img"
                  v-if="cur.chapter_img"
                />
              </label>
              <input
                class="img_upload"
                type="file"
                id="input-file"
                accept="image/*"
                v-show="false"
                :name="cur.curriculum_id"
                @change="imgUpload($event, cur.curriculum_id)"
              />
            </div>
            <div class="cur_right">
              <ul>
                <li v-for="(epi, epi_num) in episode" :key="epi_num">
                  <router-link
                    v-if="epi.curriculum_id === cur.curriculum_id"
                    :to="
                      `/creators/editclass3/${url}/${epi.curriculum_id}/${epi.episode_id}`
                    "
                  >
                    {{ epi.episode_name }} <i class="far fa-edit"></i>
                  </router-link>
                </li>
              </ul>
              <router-link
                :to="`/creators/editclass3/${url}/${cur.curriculum_id}`"
              >
                + 세부강의 추가
              </router-link>
            </div>
          </div>
        </div>
      </div>
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
      curriculum: "",
      cur_id: "",
      img: "../../assets/imgs/PhotoPotrait.svg",
      chapter_img: "",
      episode: "",
      chap_modal: false,
      episode_modal: false,
      chapid: ""
    };
  },
  async mounted() {
    /*
    ---------- 챕터 불러오기 ---------
    */
    await this.db
      .collection("onlineclass")
      .doc(this.url)
      .collection("curriculum")
      .orderBy("create_date")
      .onSnapshot(querySnapshot => {
        const chap_data = [];
        const epi_data = [];
        querySnapshot.forEach(result => {
          // forEach를 사용하여 분리된 result.data()값을 받아오므로 배열로 된 변수 'doc_data'에 push하여 배열로 다시 묶어서 사용할 수 있게 함
          if (result.data().type === "chapter") {
            chap_data.push(result.data());
          } else if (result.data().type === "episode") {
            epi_data.push(result.data());
          }
          this.curriculum = chap_data;
          this.episode = epi_data;
        });
      });
  },
  methods: {
    /*
    ---------- 챕터 추가하기 ---------
    */
    async chap_upload() {
      await this.db
        .collection("onlineclass")
        .doc(this.url)
        .collection("curriculum")
        .add({
          create_date: new Date(),
          chapter_name: document.getElementById("creat_chapter_name").value,
          class_id: this.url,
          type: "chapter"
        })
        .then(async docRef => {
          await this.db
            .collection("onlineclass")
            .doc(this.url)
            .collection("curriculum")
            .doc(docRef.id)
            .update({ curriculum_id: docRef.id });
          this.chap_modal = false;
        })
        .catch(error => {
          console.log("error updateing document:", error);
        });
    },
    /*
    ---------- 이미지 추가하기 ---------
    */
    async imgUpload(event, cur_id) {
      console.log(cur_id);
      const fileInfo = document.querySelector(".img_upload").files[0];
      const storageRef = this.storage.ref();
      const updateUrl = storageRef.child("images/class/" + fileInfo.name);
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
              .doc(cur_id)
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
    }
  }
};
</script>

<style lang="scss">
.black-bg {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 200;
  padding: 20px;

  .white-bg {
    margin: auto;
    margin-top: 100px;
    width: 60%;
    background-color: white;
    border-radius: 8px;
    padding: 20px;
    span {
      display: block;
      text-align: right;
      cursor: pointer;
    }
    input {
      height: 20px;
      padding: 10px;
    }
  }
}

.cur_container {
  display: flex;
  .cur_left {
    margin-right: 10px;
    label {
      p {
        padding: 10px;
        padding-top: 40px;
        width: 120px;
        height: 120px;
        text-align: center;
        margin: 10px 4px;
        box-sizing: border-box;
        background-image: url(~@/assets/imgs/PhotoPotrait.svg);
        background-size: contain;
        background-color: #eee;
        border-radius: 4px;
        cursor: pointer;
      }
      img {
        margin: 10px 4px;
        width: 120px;
        height: 120px;
        object-fit: cover;
        border-radius: 4px;
      }
    }
  }
  .cur_right {
    ul {
      li {
        a {
          line-height: 1.5rem;
        }
      }
    }
  }
}
</style>
