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
          <div class="input_border_box">
            <input
              id="creat_chapter_name"
              type="text"
              maxlength="35"
              placeholder="챕터명을 입력해주세요(최대 35자)"
            />
            <button class="btn-m btn-blue" @click="chap_upload()">
              생성하기
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- 
    ---------- 메인 컨텐츠 ----------
    -->
    <div class="create_container">
      <div class="notice_card">
        <h3>3. 커리큘럼</h3>
        <p>
          클래스를 수강하려는 수강생들에게 클래스의 정보를 입력해주세요.<br />
          [저장하기]버튼을 누르면 모든 수정 사항은 즉시 반영되어 보여집니다.
        </p>
      </div>

      <div class="input_group">
        <p
          style="margin:auto; color:#06f; cursor:pointer;"
          @click="chap_modal = true"
        >
          +커리큘럼 챕터 추가하기
        </p>
      </div>

      <!-- 
      ---------- 소개부분 ----------
      -->
      <div id="cur_area" v-for="(cur, cur_num) in curriculum" :key="cur_num">
        <div class="input_group">
          <div class="cur_header">
            <h4>{{ cur.chapter_name }}</h4>
            <router-link :to="`/creators/editchap/${url}/${cur.curriculum_id}`">
              <font-awesome-icon :icon="['fas', 'cog']" />
            </router-link>
          </div>
          <div class="cur_container">
            <div class="cur_left">
              <div class="check_img">
                <p class="chap_img" v-if="!cur.chapter_img">
                  <router-link
                    :to="`/creators/editchap/${url}/${cur.curriculum_id}`"
                  >
                    챕터 이미지를<br />등록 해주세요.
                  </router-link>
                </p>
                <img
                  class="chap_img"
                  :src="cur.chapter_img"
                  v-if="cur.chapter_img"
                />
              </div>
            </div>
            <div class="cur_right">
              <ul>
                <li v-for="(epi, epi_num) in episode" :key="epi_num">
                  <router-link
                    v-if="epi.curriculum_id === cur.curriculum_id"
                    :to="
                      `/creators/editepi/${url}/${epi.curriculum_id}/${epi.episode_id}`
                    "
                  >
                    {{ epi.episode_name }}
                    <font-awesome-icon :icon="['fas', 'edit']" />
                  </router-link>
                </li>
              </ul>
              <router-link
                :to="`/creators/createepi/${url}/${cur.curriculum_id}`"
              >
                + 세부강의 추가
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <div class="input_group">
        <p
          style="margin:auto; color:#06f; cursor:pointer; text-align:center; border:1px solid #eee; padding:20px 0px; border-radius:4px;"
          @click="chap_modal = true"
        >
          +커리큘럼 챕터 추가하기
        </p>
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
  async created() {
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

    h4 {
      margin-top: 0px;
    }
    span {
      display: inline-block;
      float: right;
      text-align: right;
      cursor: pointer;
      font-size: 0.85rem;
    }
    input {
      height: 20px;
      padding: 10px;
    }
  }
}
#cur_area {
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 0px 20px;
  margin-bottom: 10px;
}
.input_border_box {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  border: 1px solid #eee;
  border-radius: 4px;
  box-sizing: border-box;

  input {
    display: block;
    width: 64%;
    border: none;
  }
  button {
    display: block;
    width: 29%;
    float: right;
    background: none;
  }
  button:hover {
    background: $blue;
    color: white;
  }
}
</style>
