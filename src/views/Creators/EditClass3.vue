<template>
  <div>
    <!-- 모달 -->
    <div>
      <div id="chap_modal" class="black-bg" v-if="modal === true">
        <div class="white-bg">
          <span @click="modal = false">닫기</span>
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
    <!-- 메인 컨텐츠 -->
    <div class="container">
      <div class="notice-card">
        <h3>3. 커리큘럼</h3>
        <p>
          클래스를 수강하려는 수강생들에게 클래스의 정보를 입력해주세요.<br />
          [저장하기]버튼을 누르면 모든 수정 사항은 즉시 반영되어 보여집니다.
        </p>
        {{ curriculum }}
      </div>

      <div class="input-group">
        <p
          style="margin:auto; color:#06f; cursor:pointer;"
          @click="modal = true"
        >
          커리큘럼 챕터 추가하기
        </p>
      </div>

      <!-- 소개 -->
      <div id="cur_area">
        <div class="input-group" v-for="cur in curriculum" :key="cur">
          <div class="cur_container">
            <h4>
              <input
                type="text"
                class="form-control m-1"
                style="display:inline; width:90%;"
                placeholder="챕터명을 입력해주세요"
                :value="cur.chapter_name"
              />
            </h4>
            <div class="cur_left">
              <img src="@/assets/imgs/PhotoPotrait.svg" />
            </div>
            <div class="cur_right">
              <input
                type="text"
                class="form-control m-1"
                placeholder="챕터명을 입력해주세요"
              />
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
      doc: "",
      cur_id: "",
      curriculum: "",
      img: "../../assets/imgs/PhotoPotrait.svg",
      modal: false
    };
  },
  mounted() {
    this.db
      .collection("onlineclass")
      .doc(this.url)
      .get()
      .then(result => {
        this.doc = result.data();
      });

    this.db
      .collection("curriculum")
      .doc()
      .get()
      .then(result => {
        this.curriculum = result.data();
      });
  },
  methods: {
    async chap_upload() {
      await this.db
        .collection("curriculum")
        .add({
          last_update: new Date(),
          chapter_name: document.getElementById("creat_chapter_name").value,
          class_doc_id: this.url
        })
        .then(async docRef => {
          await this.db
            .collection("curriculum")
            .doc(docRef.id)
            .update({ cur_id: docRef.id });
          this.cur_id = docRef.id;
          this.modal = false;
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
