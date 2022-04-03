<template>
  <section>
    <!-- 상단 타이틀 배너 컨테이너 -->
    <TitleBanner :classDetails="classDetails" v-if="windowWidth >= 900">
    </TitleBanner>
    <TitleBannerMobile :classDetails="classDetails" v-if="windowWidth < 900">
    </TitleBannerMobile>
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

        <!-- description 영역 -->
        <ClassDesc :class_dec="classDetails.class_dec"></ClassDesc>

        <!-- 강의 커리큘럼 -->
        <div class="description_container">
          <h4>강의 커리큘럼</h4>
          <p>
            강의를 수강하게 되면 배울 수 있는 커리큘럼 입니다.
          </p>
          <div
            class="cur_container"
            v-for="(cur, cur_num) in curriculum"
            :key="cur_num"
          >
            <p class="cur_title">#{{ cur.cur_id }} {{ cur.chapter_name }}</p>
            <div class="mb-4 d-flex">
              <div class="col-3">
                <img class="cur_img" :src="cur.chapter_img" />
              </div>
              <ul class="cur_study_container">
                <li v-for="(epi, epi_num) in episode" :key="epi_num">
                  <span
                    class="cur_study"
                    v-if="epi.curriculum_id === cur.curriculum_id"
                    >{{ epi.episode_name }}</span
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 크리에이터 소개 -->
        <div class="description_container">
          <h4>크리에이터 소개</h4>
          <div class="creator_container" v-if="windowWidth < 600">
            <img class="col-4 d-block m-auto" :src="classDetails.profile_img" />
            <div class="mt-2">
              <h3>
                안녕하세요,<br />크리에이터 "{{ classDetails.profile_name }}"
                입니다.
              </h3>
              <p v-html="handleNewLine(classDetails.profile_description)"></p>
            </div>
          </div>
          <div class="creator_container d-flex" v-else-if="windowWidth >= 600">
            <img class="col-4" :src="classDetails.profile_img" />
            <div>
              <h3>
                안녕하세요,<br />크리에이터 "{{ classDetails.profile_name }}"
                입니다.
              </h3>
              <p v-html="handleNewLine(classDetails.profile_description)"></p>
            </div>
          </div>
        </div>
        <!-- 댓글 작성하기 -->
        <DetailReply :url="url"></DetailReply>
      </div>

      <!-- 우측 플로팅 컨테이너 -->
      <FloatWindow
        :classDetails="classDetails"
        :scrollPosition="scrollPosition"
        v-if="windowWidth >= 900"
      ></FloatWindow>
    </article>
    <BottomShop
      :classDetails="classDetails"
      v-if="windowWidth < 900"
    ></BottomShop>
  </section>
</template>

<script>
import FloatWindow from "@/components/OnlineClassDetail/FloatWindow";
import DetailReply from "@/components/OnlineClassDetail/DetailReply";
import TitleBanner from "@/components/OnlineClassDetail/TitleBanner";
import ClassDesc from "@/components/OnlineClassDetail/ClassDescription";
import BottomShop from "@/components/OnlineClassDetail/BottomShop";
import TitleBannerMobile from "@/components/OnlineClassDetail/TitleBannerMobile";
import { mapState } from "vuex";
export default {
  components: {
    FloatWindow,
    DetailReply,
    TitleBanner,
    ClassDesc,
    BottomShop,
    TitleBannerMobile
  },
  data() {
    return {
      db: this.$firebase.firestore(),
      storage: this.$firebase.storage(),
      url: this.$route.params.id,
      classDetails: {},
      curriculum: "",
      episode: "",
      chapNum: 0,
      epiNum: 0,
      scrollPosition: null,
      windowWidth: window.innerWidth
    };
  },
  created() {
    this.db
      .collection("onlineclass")
      .doc(this.url)
      .onSnapshot(result => {
        this.classDetails = result.data();
      });

    this.db
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

    // mounted -> 라이프사이클 상 DOM에 모든 컴포넌트를 불러온 후에 할 일
    window.addEventListener("scroll", this.setScroll);
    window.addEventListener("resize", this.setWidth);
  },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    /*
      textarea 자동 줄바꿈
    */
    handleNewLine(str) {
      return String(str).replace(/(?:\r\n|\r|\n)/g, "</br>");
    },
    // scroll 높이 실시간 구하기
    setScroll() {
      this.scrollPosition =
        window.scrollY || document.documentElement.scrollTop;
    },
    // width 크기 실시간 구하기
    setWidth() {
      this.windowWidth = window.innerWidth;
    }
  },
  destroyed() {
    // 스크롤과 리사이즈 이벤트를 페이지를 벗어나면서 종료한다.
    window.removeEventListener("scroll", this.setScroll);
    window.removeEventListener("resize", this.setWidth);
  }
};
</script>

<style lang="scss">
section {
  background-color: white;
}
.detail_container {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  max-width: 1150px;
  margin: auto;
  text-align: left;

  .left_container {
    max-width: 800px;

    .detail_poster_img {
      width: 100%;
      padding-bottom: 50px;
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
      margin-bottom: 80px;
      hr {
        margin-top: 50px;
      }
      .point {
        background-color: #fafafa;
        padding: 20px 20px;
      }
      h4 {
        padding: 10px 0px;
        font-size: 1.4rem;
        color: $dct-title;
        font-weight: bold;
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
          max-width: 220px;
          max-height: 300px;
          overflow: auto;
          border-radius: 4px;
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
        padding-bottom: 30px;
        img {
          width: 230px;
          height: 230px;
          border-radius: 50%;
          margin-top: 0px;
          background-color: #ccc;
          object-fit: cover;
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
        padding: 20px 10px;
      }
    }
  }
}
</style>
