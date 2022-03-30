<template>
  <div>
    <h3>클래스 문의</h3>
    <div class="class_faq_board">
      <div class="card card-body mb-4">
        <p>클래스 문의 작성</p>
        <div class="w-100">
          <textarea
            id="create_qna_description"
            class="form-control"
            style="resize: none;"
            @input="mixinAutoResize"
          >
          </textarea>
          <button class="btn btn-success my-2 float-end" @click="qna_upload()">
            작성하기
          </button>
        </div>
      </div>
      <!-- FaQ 리스트 보기 -->
      <div
        class="class_faq_container card card-body"
        v-for="(qna, qna_num) in qna"
        :key="qna_num"
      >
        <div class="class_faq_top">
          <a class="faq_writer_img" v-show="qna.photoURL === null">
            <font-awesome-icon :icon="['fas', 'user']" />
          </a>
          <a class="faq_writer_img" v-show="qna.photoURL === !null">
            <img :scr="qna.photoURL" />
          </a>
          <div>
            <span>{{ qna.displayName }}</span>
            <span style="color:#999; font-size:0.9rem;">{{
              qna.create_date
            }}</span>
          </div>
        </div>
        <div
          class="class_faq_bottom"
          v-html="handleNewLine(qna.description)"
          style="padding:10px;"
        ></div>
        <div class="w-100" v-if="user.uid === qna.userUid">
          <button class="btn btn-sm btn-secondary">
            수정
          </button>
          <button
            class="btn btn-sm btn-danger mx-2"
            :id="`${qna.qna_id}`"
            @click="qna_delete"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import { mapState } from "vuex";
export default {
  component: {
    dayjs
  },
  props: {
    url: String
  },
  data() {
    return {
      db: this.$firebase.firestore(),
      qna: ""
    };
  },
  created() {
    this.db
      .collection("onlineclass")
      .doc(this.url)
      .collection("qna")
      .orderBy("create_date")
      .onSnapshot(querySnapshot => {
        const qna_data = [];
        querySnapshot.forEach(result => {
          // forEach를 사용하여 분리된 result.data()값을 받아오므로 배열로 된 변수 'doc_data'에 push하여 배열로 다시 묶어서 사용할 수 있게 함
          if (result.data().type === "qna") {
            qna_data.push(result.data());
          }
          this.qna = qna_data;
        });
      });
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    /*
    ---------- qna 추가하기 ---------
    */
    async qna_upload() {
      await this.db
        .collection("onlineclass")
        .doc(this.url)
        .collection("qna")
        .add({
          create_date: dayjs().format("YYYY.MM.DD HH:mm:ss"),
          update_date: "",
          description: document.getElementById("create_qna_description").value,
          photoURL: this.user.photoURL,
          userUid: this.user.uid,
          displayName: this.user.displayName,
          type: "qna"
        })
        .then(async docRef => {
          await this.db
            .collection("onlineclass")
            .doc(this.url)
            .collection("qna")
            .doc(docRef.id)
            .update({ qna_id: docRef.id });
        })
        .catch(error => {
          console.log("error updateing document:", error);
        });
    },
    /*
    ---------- qna 삭제하기 ---------
    */
    qna_delete(e) {
      if (confirm("해당 댓글을 삭제하시겠습니까?") === true) {
        this.db
          .collection("onlineclass")
          .doc(this.url)
          .collection("qna")
          .doc(e.target.id)
          .delete()
          .then()
          .catch(err => console.log(err));
      }
    },
    /*
      textarea 자동 줄바꿈
    */
    handleNewLine(str) {
      return String(str).replace(/(?:\r\n|\r|\n)/g, "</br>");
    },

    // textarea 자동 높이 조절
    mixinAutoResize(event) {
      event.target.style.height = "auto";
      event.target.style.height = `${event.target.scrollHeight}px`;
    }
  }
};
</script>

<style lang="scss">
/*-- Reply --*/
.class_faq_board {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  margin-bottom: 30px;

  .class_faq_container {
    width: 100%;
    padding: 20px;
    margin-bottom: 20px;
    .class_faq_top {
      display: flex;
      flex-direction: row;
      .faq_writer_img {
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background-color: #ccc;
        margin-right: 10px;
        overflow: hidden;
        img {
          width: 44px;
          height: 44px;
        }
        svg {
          padding-left: 4px;
          padding-top: 4px;
          font-size: 40px;
          color: white;
        }
      }
      div {
        display: flex;
        flex-direction: column;
        margin-top: 4px;
        span {
          margin-right: 10px;
        }
      }
    }
    .class_faq_bottom {
      width: 100%;
      margin: 10px;
      margin-left: 0px;
    }
  }
}
</style>
