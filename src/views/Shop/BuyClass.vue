<template>
  <div class="gray_body">
    <div class="buy_container">
      <div class="buy_item">
        <h3>주문 정보</h3>
        <p>{{ classDetails.title }}</p>
        <img :src="classDetails.thumbnail" style="width:250px;" />
        <hr />
      </div>
      <div class="buy_item">
        <h3>결제 금액</h3>
        <p class="buy_price">
          <span>상품 금액</span
          ><span>{{ classDetails.price + classDetails.price * 0.3 }}원</span>
        </p>
        <p class="buy_price">
          <span>상품 할인 금액</span>
          <span> {{ classDetails.price * 0.3 }}원 </span>
        </p>
        <p class="buy_price">
          <strong>최종가격</strong>
          <span>
            <strong> {{ classDetails.price }}원 </strong>
          </span>
        </p>
        <hr />
      </div>
      <div class="buy_item">
        <h3>결제 방식</h3>
        <div class="buy_type_grid">
          <div>카드결제</div>
          <div>무통장 입금</div>
          <div>네이버 페이</div>
          <div>카카오 페이</div>
          <div>toss</div>
          <div>paypal</div>
        </div>
        <div style="margin-top:30px;">
          <a class="btn btn-l btn-blue" @click="buy_class()">결제하기</a>
        </div>
      </div>
    </div>
  </div>
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
      user: this.$store.state.user,
      url: this.$route.params.id,
      classDetails: ""
    };
  },
  async mounted() {
    await this.db
      .collection("onlineclass")
      .doc(this.url)
      .onSnapshot(result => {
        this.classDetails = result.data();
      });
  },
  methods: {
    /*
    ---------- 결제하기 ---------
    */
    async buy_class() {
      await this.db
        .collection("users")
        .doc(this.user.uid)
        .collection("myclass")
        .doc(this.url)
        .set({
          buy_day: dayjs().format("YYYY.MM.DD HH:mm:ss"),
          class_name: this.classDetails.title,
          class_thumbnail: this.classDetails.thumbnail,
          class_id: this.url,
          learning: true,
          c1: this.classDetails.category.c1,
          c2: this.classDetails.category.c2
        })
        .then(() => {
          this.$router.push(`/`);
        })
        .catch(error => {
          console.log("error updateing document:", error);
        });
    }
  }
};
</script>

<style lang="scss">
.gray_body {
  width: 100%;
  margin: 0;
  padding: 10px;
  background-color: #eee;
  .buy_container {
    max-width: 550px;
    margin: 50px auto;
    background-color: white;
    box-sizing: border-box;
    padding: 14px;

    .buy_item {
      .buy_type_grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-template-rows: repeat(3, 1fr);
        column-gap: 4px;
        row-gap: 4px;
        div {
          cursor: pointer;
          height: 50px;
          line-height: 50px;
          text-align: center;
          background-color: #eee;
        }
      }

      .buy_price {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
    }
  }
}
</style>
