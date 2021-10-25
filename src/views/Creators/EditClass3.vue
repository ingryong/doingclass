<template>
  <div>
    <!-- 챕터생성 모달 -->
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

    <!-- 세부강의 생성 모달 -->
    <div>
      <div id="chap_modal" class="black-bg" v-if="episode_modal === true">
        <div class="white-bg">
          <span @click="episode_modal = false">닫기</span>
          <h4>세부강의명 입력</h4>
          <input
            id="create_episode_name"
            type="text"
            style="display:inline; width:90%;"
            placeholder="세부강의명을 입력해주세요"
          />
          <button class="btn-m btn-blue" @click="episode_upload()">
            생성하기
          </button>
        </div>
      </div>
    </div>

    <!-- 메인 컨텐츠 -->
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

      <!-- 소개 -->
      <div id="cur_area">
        <div
          class="input-group"
          v-for="(cur, cur_num) in curriculum"
          :key="cur_num"
        >
          <div class="cur_container">
            <h4>
              #{{ cur_num + 1 }} {{ cur.chapter_name }}
              <input
                id="docname"
                type="text"
                style="display:none;"
                :value="cur.cur_id"
                disabled
              />
            </h4>
            <div class="cur_left">
              <img src="@/assets/imgs/PhotoPotrait.svg" />
            </div>
            <div class="cur_right">
              <ul>
                <li v-for="epi in episode" :key="epi">
                  {{ epi.episode_name }}
                </li>
              </ul>
              <button class="btn-m btn-blue" @click="episode_modal = true">
                세부강의 추가
              </button>
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
      cur_id: "",
      curriculum: "",
      img: "../../assets/imgs/PhotoPotrait.svg",
      episode: "",
      episode_id: "",
      chap_modal: false,
      episode_modal: false
    };
  },
  async mounted() {
    // 커리큘럼 챕터 불러오기
    await this.db
      .collection("curriculum")
      .orderBy("create_date")
      .where("class_doc_id", "==", this.url)
      .get()
      .then(querySnapshot => {
        const doc_data = [];
        querySnapshot.forEach(result => {
          // forEach를 사용하여 분리된 result.data()값을 받아오므로 배열로 된 변수 'doc_data'에 push하여 배열로 다시 묶어서 사용할 수 있게 함
          doc_data.push(result.data());
          this.curriculum = doc_data;
          this.cur_id = result.id;
        });
      });
    // 세부강의 불러오기
    this.db
      .collection("curriculum")
      .where("class_doc_id", "==", this.url)
      .collection("episodes")
      .get()
      .then(querySnapshot => {
        const episode_data = [];
        querySnapshot.forEach(result => {
          // forEach를 사용하여 분리된 result.data()값을 받아오므로 배열로 된 변수 'doc_data'에 push하여 배열로 다시 묶어서 사용할 수 있게 함
          episode_data.push(result.data());
          this.episode = episode_data;
          this.episode_id = result.id;
          console.log(result.data());
        });
      });
  },
  methods: {
    // 커리큘럽 챕터 추가하기
    async chap_upload() {
      await this.db
        .collection("curriculum")
        .add({
          create_date: new Date(),
          chapter_name: document.getElementById("creat_chapter_name").value,
          class_doc_id: this.url
        })
        .then(async docRef => {
          await this.db
            .collection("curriculum")
            .doc(docRef.id)
            .update({ cur_id: docRef.id });
          this.cur_id = docRef.id;
          this.chap_modal = false;
          location.reload();
        })
        .catch(error => {
          console.log("error updateing document:", error);
        });
    },

    // 세부강의 추가하기
    async episode_upload() {
      await this.db
        .collection("curriculum")
        .doc(document.getElementById("docname").value)
        .collection("episodes")
        .add({
          create_date: new Date(),
          episode_name: document.getElementById("create_episode_name").value,
          class_doc_id: document.getElementById("docname").value
        })
        .then(async docRef => {
          await this.db
            .collection("curriculum")
            .doc(document.getElementById("docname").value)
            .collection("episodes")
            .doc(docRef.id)
            .update({ episode_id: docRef.id });
          this.episode_id = docRef.id;
          this.episode_modal = false;
          location.reload();
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
</style>
