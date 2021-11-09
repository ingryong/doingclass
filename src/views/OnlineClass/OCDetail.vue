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
            클래스 유형 <span class="values">{{ classDetails.type }}</span>
          </span>
        </p>
        <hr />
        <img class="detail_poster_img" :src="classDetails.poster_img" />
        <hr />

        <!-- description1 영역 -->
        <div>
          <div class="description_container">
            <h4>| {{ classDetails.class_dec.dec1.title }}</h4>
            <p
              class="detail_description"
              v-html="classDetails.class_dec.dec1.dec"
            ></p>
            <img :src="classDetails.class_dec.dec1.img" />
            <hr />
          </div>
        </div>

        <!-- description2 영역 -->
        <div>
          <div class="description_container">
            <h4>| {{ classDetails.class_dec.dec2.title }}</h4>
            <p
              class="detail_description"
              v-html="classDetails.class_dec.dec2.dec"
            ></p>
            <img :src="classDetails.class_dec.dec2.img" />
            <hr />
          </div>
        </div>

        <!-- description3 영역 -->
        <div>
          <div class="description_container">
            <h4>| {{ classDetails.class_dec.dec3.title }}</h4>
            <p
              class="detail_description"
              v-html="classDetails.class_dec.dec3.dec"
            ></p>
            <img :src="classDetails.class_dec.dec3.img" />
            <hr />
          </div>
        </div>

        <!-- 강의 커리큘럼 -->
        <div class="description_container">
          <h4>| 강의 커리큘럼</h4>
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
          <hr />
        </div>
        <!-- 크리에이터 소개 -->
        <div class="description_container">
          <h4>| 크리에이터 소개</h4>
          <div class="creator_container" style="flex;">
            <img :src="classDetails.profile_img" />
            <div>
              <h3>{{ classDetails.profile_name }}</h3>
              <p v-html="classDetails.profile_description"></p>
            </div>
          </div>
          <hr />
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
      </div>

      <!-- 우측 플로팅 컨테이너 -->
      <aside class="right_container">
        <div id="side_content" class="float_window">
          <p class="window_category">
            <span
              >{{ classDetails.category.c1 }} |
              {{ classDetails.category.c2 }}</span
            >
          </p>
          <p class="window_title">
            {{ classDetails.title }}<br />
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
          <a class="btn_lg btn_black" href="/">클래스 신청하기</a>
        </div>
      </aside>
    </article>
  </section>
</template>

<script>
export default {
  data() {
    return {
      db: this.$firebase.firestore(),
      storage: this.$firebase.storage(),
      url: this.$route.params.id,
      classDetails: "",
      curriculum: "",
      episode: "",
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
          } else if (result.data().type === "episode") {
            epi_data.push(result.data());
          }
          this.curriculum = chap_data;
          this.episode = epi_data;
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
    updateScroll() {
      this.scrollPosition =
        window.scrollY || document.documentElement.scrollTop;

      if (this.scrollPosition > 500) {
        document.getElementById("side_content").style = "position : fixed;";
      } else {
        document.getElementById("side_content").style = "position : ";
      }
    }
  }
};
</script>

<style lang="scss">
.btn_lg {
  display: block;
  padding: 14px 10px;
  text-align: center;
  align-items: center;
  border: 1px solid black;
}
.btn_black {
  background-color: black;
  border-color: black;
  color: white;
}
.btn_black:hover {
  background-color: white;
  color: black;
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}

.title_container {
  width: 100%;
  background: #222;

  .detail_title_banner {
    width: 100%;
    min-width: 1200px;
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
      font-size: 0.9rem;
      strong {
        font-size: 1rem;
      }
      .values {
        color: $gray-3;
      }
    }
    .cur_title {
      font-size: 1.1rem;
      font-weight: bolder;
      color: $cur-title-text;
      margin-bottom: 0px;
    }
    .cur_img {
      object-fit: cover;
      width: 200px;
      height: 110px;
      border-radius: 4px;
    }

    .description_container {
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
      .cur_container {
        padding-bottom: 10px;

        .cur_study_container {
          width: 100%;

          .cur_study {
            display: block;
            border: 1px solid $gray-2;
            padding: 6px 10px;
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
          width: 38%;
          margin-top: 0px;
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
      }
      .window_title {
        font-size: 1.1rem;
        font-weight: bold;
        margin: 0;

        span {
          margin-left: 0;
          margin-right: 5px;
        }
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
}
</style>
