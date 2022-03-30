<template>
  <aside class="right_container">
    <div id="side_content" class="float_window">
      <p class="window_category">
        <span>
          {{ classDetails.category.c1 }} · {{ classDetails.category.c2 }}
        </span>
      </p>
      <p class="window_title">
        {{ classDetails.title }}
      </p>
      <p class="window_state">
        <span v-if="classDetails.classopen" class="tag-open">수강 가능</span>
        <span v-else-if="!classDetails.classopen" class="tag-ready">
          준비중
        </span>
      </p>
      <p class="detail_price">
        <span>
          <s>{{ (classDetails.price * 1.3) | comma }}원</s> →
          {{ classDetails.price | comma }}원
        </span>
        <br />
        <span
          ><strong>월 {{ (classDetails.price / 3) | comma }}원</strong> (3개월
          할부)</span
        >
      </p>
      <p class="detail_learningdays">
        <span>수강기간</span>
        <span>구매 후 {{ classDetails.learningdays }}일간 무제한 수강</span>
      </p>
      <router-link
        class="btn-l btn-mint"
        style="border-radius:4px;"
        :to="`/shopping/${classDetails.id}`"
        >클래스 신청하기
      </router-link>
    </div>
  </aside>
</template>

<script>
export default {
  props: {
    classDetails: Object,
    scrollPosition: Number
  },
  filters: {
    comma: function(val) {
      var num = Number(val);
      return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, "$1,");
    }
  },
  created() {
    window.addEventListener("scroll", this.updateScroll);
  },
  methods: {
    /*
    ---------- 스크롤에 맞춰 고정되는 플로팅 바 ---------
    */
    updateScroll() {
      if (this.scrollPosition >= 500) {
        document.getElementById("side_content").style = "position : fixed;";
      } else {
        document.getElementById("side_content").style = "position : ";
      }
    }
  },
  destroyed() {
    // 스크롤과 리사이즈 이벤트를 페이지를 벗어나면서 종료한다.
    window.removeEventListener("scroll", this.updateScroll);
  }
};
</script>

<style lang="scss">
.right_container {
  width: 330px;

  .fixed {
    position: fixed;
  }

  .float_window {
    background-color: #fff;
    z-index: 100;
    border: 1px solid $gray-3;
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
</style>
