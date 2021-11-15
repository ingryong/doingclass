<template>
  <section>
    <!-- 상단 타이틀 배너 컨테이너 -->
    <header class="title_container">
      <div class="detail_title_banner">
        <div class="banner_left">
          <img :src="classDetails.header_img.header_img1" />
        </div>
        <div class="banner_right_top">
          <img :src="classDetails.header_img.header_img2" />
        </div>
        <div class="banner_right_bottom1">
          <img :src="classDetails.header_img.header_img3" />
        </div>
        <div class="banner_right_bottom2">
          <img :src="classDetails.header_img.header_img4" />
        </div>
      </div>
    </header>

    <article class="detail_container" style="padding:0px 8px;">
      <!-- 메인 컨텐츠 컨테이너 -->
      <div class="left_container">
        <p class="class_info">
          <strong>클래스 정보</strong><br />
          <span>
            <span class="values">클래스 분량</span>
            {{ this.chapNum }}개 챕터, {{ this.epiNum }}개 세부강의
          </span>
          <span>
            ·
            <span class="values">난이도 </span>
            <span v-if="classDetails.level === 'none'">상관없음</span>
            <span v-if="classDetails.level === 'basic'">초급</span>
            <span v-if="classDetails.level === 'middle'">중급</span>
            <span v-if="classDetails.level === 'high'">고급</span>
          </span>
        </p>
        <hr />
        <img class="detail_poster_img" :src="classDetails.poster_img" />

        <!-- description1 영역 -->
        <div class="description_container">
          <h4>1. {{ classDetails.class_dec.dec1.title }}</h4>
          <img
            v-if="classDetails.class_dec.dec1.img"
            :src="classDetails.class_dec.dec1.img"
          />
          <p
            class="detail_description"
            v-html="handleNewLine(classDetails.class_dec.dec1.dec)"
          ></p>
        </div>

        <!-- description2 영역 -->
        <div class="description_container">
          <h4>2. {{ classDetails.class_dec.dec2.title }}</h4>
          <img
            v-if="classDetails.class_dec.dec2.img"
            :src="classDetails.class_dec.dec2.img"
          />
          <p
            class="detail_description"
            v-html="handleNewLine(classDetails.class_dec.dec2.dec)"
          ></p>
        </div>

        <!-- description3 영역 -->
        <div class="description_container">
          <h4>3. {{ classDetails.class_dec.dec3.title }}</h4>
          <img
            v-if="classDetails.class_dec.dec3.img"
            :src="classDetails.class_dec.dec3.img"
          />
          <p
            class="detail_description"
            v-html="handleNewLine(classDetails.class_dec.dec3.dec)"
          ></p>
        </div>

        <!-- 강의 커리큘럼 -->
        <div class="description_container">
          <h4>4. 강의 커리큘럼</h4>
          <p style="margin-top:-20px;">
            강의를 수강하게 되면 배울 수 있는 커리큘럼 입니다.
          </p>
          <div
            class="cur_container"
            v-for="(cur, cur_num) in curriculum"
            :key="cur_num"
          >
            <p class="cur_title">#{{ cur.cur_id }} {{ cur.chapter_name }}</p>
            <ul style="display:flex;">
              <li>
                <img class="cur_img" :src="cur.chapter_img" />
              </li>
              <ul class="cur_study_container">
                <li v-for="(epi, epi_num) in episode" :key="epi_num">
                  <span
                    class="cur_study"
                    v-if="epi.curriculum_id === cur.curriculum_id"
                    >{{ epi.episode_name }}</span
                  >
                </li>
              </ul>
            </ul>
          </div>
        </div>
        <!-- 크리에이터 소개 -->
        <div class="description_container">
          <h4>크리에이터 소개</h4>
          <div class="creator_container" style="flex;">
            <img :src="classDetails.profile_img" />
            <div>
              <h3>
                안녕하세요,<br />크리에이터 "{{ classDetails.profile_name }}"
                입니다.
              </h3>
              <p v-html="handleNewLine(classDetails.profile_description)"></p>
            </div>
          </div>
        </div>

        <!-- 크리에이터의 한 마디
        <div
          class="description_container"
          v-if="class_detail.detail_lastmessage !== undefined"
        >
          <h4>| 크리에이터의 한 마디</h4>
          <p
            class="detail_description"
            v-html="class_detail.detail_lastmessage"
            style="text-align:center; line-height:1.5;"
          ></p>
          <div style="height:50px;"></div>
        </div> -->

        <h3>클래스 질의응답</h3>
        <div class="class_faq_board">
          <p>클래스 문의 작성</p>
          <div class="class_faq_write">
            <textarea
              id="create_qna_description"
              placeholder="클래스 문의 내용을 입력해주세요"
              @input="mixinAutoResize"
            ></textarea>
            <a @click="qna_upload()">
              <i class="fas fa-paper-plane"></i>
            </a>
          </div>
          <div
            class="class_faq_container"
            v-for="(qna, qna_num) in qna"
            :key="qna_num"
          >
            <div class="class_faq_top">
              <img :scr="qna.photoURL" />
              <div>
                <span>{{ qna.displayName }}</span
                ><span>{{ qna.create_date }}</span>
              </div>
            </div>
            <div
              class="class_faq_bottom"
              v-html="handleNewLine(qna.description)"
            ></div>
            <div class="class_faq_reply_container">
              <div class="class_faq_top">
                <img />
                <div><span>닉네임</span><span>작성일자</span></div>
              </div>
              <div class="class_faq_bottom" v-html="handleNewLine()"></div>
              <div class="class_faq_write_reply">
                <textarea
                  type="text"
                  placeholder="댓글을 입력해주세요"
                  @input="mixinAutoResize"
                />
                <i class="fas fa-paper-plane"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- 우측 플로팅 컨테이너 -->
      <aside class="right_container">
        <div id="side_content" class="float_window">
          <p class="window_category">
            <span
              >{{ classDetails.category.c1 }} ·
              {{ classDetails.category.c2 }}</span
            >
          </p>
          <p class="window_title">
            {{ classDetails.title }}
          </p>
          <p class="window_state">
            <span v-if="classDetails.classopen" class="tag-open"
              >수강 가능</span
            >
            <span v-else-if="!classDetails.classopen" class="tag-ready"
              >준비중</span
            >
          </p>
          <p class="detail_price">
            <span
              ><s>{{ (classDetails.price * 1.3) | comma }}원</s> →
              {{ classDetails.price | comma }}원</span
            ><br />
            <span
              ><strong>월 {{ (classDetails.price / 3) | comma }}원</strong>
              (3개월 할부)</span
            >
          </p>
          <p class="detail_learningdays">
            <span>수강기간</span>
            <span>구매 후 {{ classDetails.learningdays }}일간 무제한 수강</span>
          </p>
          <a class="btn-l btn-mint" style="border-radius:4px;" href="/"
            >클래스 신청하기</a
          >
        </div>
      </aside>
    </article>
  </section>
</template>

<script>
import dayjs from "dayjs";
export default {
  component: {
    dayjs
  },
  data() {
    return {
      db: this.$firebase.firestore(),
      storage: this.$firebase.storage(),
      user: this.$store.state.user,
      url: this.$route.params.id,
      classDetails: "",
      curriculum: "",
      episode: "",
      chapNum: 0,
      epiNum: 0,
      qna: "",
      reply: "",
      scrollPosition: null
    };
  },
  async mounted() {
    await this.db
      .collection("onlineclass")
      .doc(this.url)
      .onSnapshot(result => {
        this.classDetails = result.data();
      });

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
            this.chapNum += 1;
          } else if (result.data().type === "episode") {
            epi_data.push(result.data());
            this.epiNum += 1;
          }
          this.curriculum = chap_data;
          this.episode = epi_data;
        });
      });

    await this.db
      .collection("onlineclass")
      .doc(this.url)
      .collection("qna")
      .orderBy("create_date")
      .onSnapshot(querySnapshot => {
        const qna_data = [];
        const reply_data = [];
        querySnapshot.forEach(result => {
          // forEach를 사용하여 분리된 result.data()값을 받아오므로 배열로 된 변수 'doc_data'에 push하여 배열로 다시 묶어서 사용할 수 있게 함
          if (result.data().type === "qna") {
            qna_data.push(result.data());
          } else if (result.data().type === "reply") {
            reply_data.push(result.data());
          }
          this.qna = qna_data;
          this.reply = reply_data;
        });
      });

    // mounted -> 라이프사이클 상 DOM에 모든 컴포넌트를 불러온 후에 할 일
    // 스크롤이 발생할 때마다 methods의 updateScroll 이벤트를 불러온다.
    window.addEventListener("scroll", this.updateScroll);
  },
  filters: {
    comma: function(val) {
      var num = Number(val);
      return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
    }
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

          document.getElementById("create_qna_description").value = "";
        })
        .catch(error => {
          console.log("error updateing document:", error);
        });
    },
    /*
    ---------- 스크롤에 맞춰 고정되는 플로팅 바 ---------
    */
    updateScroll() {
      this.scrollPosition =
        window.scrollY || document.documentElement.scrollTop;

      if (this.scrollPosition > 500) {
        document.getElementById("side_content").style = "position : fixed;";
      } else {
        document.getElementById("side_content").style = "position : ";
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
.title_container {
  width: 100%;
  background: #222;

  .detail_title_banner {
    width: 100%;
    min-width: 1000px;
    max-width: 1920px;
    margin: auto;
    display: grid;
    grid-template-columns: 50% 25% 25%;
    grid-template-rows: 250px 250px;
    grid-template-areas:
      "left right right"
      "left right1 right2";

    img {
      width: 100%;
      height: 250px;
      object-fit: cover;
    }
    img:hover {
      animation-duration: 1s;
      animation-name: fadeOut;
      animation-fill-mode: both;
    }

    .banner_left {
      grid-area: left;
      img {
        height: 500px;
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
}
.detail_container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  min-width: 800px;
  max-width: 1150px;
  margin: auto;
  text-align: left;

  .left_container {
    max-width: 800px;

    .detail_poster_img {
      width: 100%;
    }

    .class_info {
      margin: 20px 0px;
      font-size: 0.9rem;
      line-height: 1.4rem;
      strong {
        font-size: 1rem;
      }
      .values {
        color: $gray-3;
      }
    }

    .description_container {
      margin-bottom: 100px;
      hr {
        margin-top: 50px;
      }
      .point {
        background-color: #fafafa;
        padding: 20px 20px;
      }
      h4 {
        font-size: 1.4rem;
        color: $dct-title;
      }
      img {
        width: 100%;
      }

      .cur_container {
        padding-bottom: 10px;

        .cur_title {
          font-size: 1.1rem;
          font-weight: bolder;
          color: $cur-title-text;
          margin-bottom: 0px;
        }
        .cur_img {
          object-fit: cover;
          width: 220px;
          height: 123.75px;
          border-radius: 4px;
          background-color: #ccc;
        }

        .cur_study_container {
          width: 100%;

          .cur_study {
            display: block;
            border: 1px solid $gray-2;
            padding: 10px 10px;
            margin: 0px 0px 5px 5px;
            border-radius: 4px;
            font-size: 0.9rem;
          }
        }
      }

      .creator_container {
        display: flex;
        padding-bottom: 30px;
        img {
          width: 230px;
          height: 230px;
          border-radius: 50%;
          margin-top: 0px;
          background-color: #ccc;
        }
        div {
          padding: 0px 14px;
          h3 {
            margin-top: 0px;
            font-size: 1.8rem;
          }
        }
      }

      .detail_description {
        padding: 0px 10px;
      }
    }
  }
  .right_container {
    width: 330px;

    .fixed {
      position: fixed;
    }

    .float_window {
      background-color: white;
      z-index: 100;
      border: 1px solid $gray-1;
      padding: 14px 14px;
      margin-top: 10px;
      font-size: 0.9rem;
      top: 120px;
      width: 300px;

      .window_category {
        font-size: 0.8rem;
        margin: 0;
        margin-bottom: 4px;
      }
      .window_title {
        font-size: 1.15rem;
        font-weight: bold;
        margin: 0;

        span {
          margin-left: 0;
          margin-right: 5px;
        }
      }
      .window_state {
        margin-top: 6px;
      }
      .detail_price {
        text-align-last: right;
        strong {
          font-size: 1.1rem;
        }
      }
      .detail_learningdays {
        font-size: 0.8rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
    }
  }
  .class_faq_board {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    margin-bottom: 50px;
    .class_faq_write {
      width: 100%;
      border: 1px solid #ccc;
      border-radius: 30px;
      margin-bottom: 50px;
      textarea {
        width: 88%;
        margin: 20px;
        margin-bottom: 0px;
        border: none;
      }
      svg {
        position: absolute;
        margin-top: 20px;
        color: $blue;
        font-size: 1.2rem;
      }
    }
    .class_faq_container {
      width: 100%;
      padding: 30px 10px;
      border-top: 1px solid #ccc;
      .class_faq_top {
        display: flex;
        flex-direction: row;
        img {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background-color: #ccc;
          margin-right: 10px;
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
        margin: 20px;
        margin-left: 0px;
      }
      .class_faq_reply_container {
        width: 100%;
        padding-left: 50px;

        .class_faq_write_reply {
          width: 100%;
          border: 1px solid #ccc;
          border-radius: 30px;
          textarea {
            width: 84%;
            margin: 16px 30px;
            margin-bottom: 0px;
            border: none;
          }
          svg {
            position: absolute;
            margin-top: 16px;
            color: $blue;
            font-size: 1.2rem;
          }
        }
      }
    }
  }
}
</style>
