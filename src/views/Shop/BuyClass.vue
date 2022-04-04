<template>
  <div class="gray_body">
    <div class="buy_container">
      <div class="buy_item">
        <h4>주문 정보</h4>
        <p>{{ classDetails.title }}</p>
        <img :src="classDetails.thumbnail" style="width:250px;" />
        <hr />
      </div>
      <div class="buy_item">
        <h4>결제 금액</h4>
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
        <h4>결제 방식</h4>
        <div
          id="buy-btn-group"
          class="btn-group d-flex flex-wrap"
          role="group"
          aria-label="cash type"
        >
          <input
            type="radio"
            class="btn-check"
            name="buytype-group"
            id="btn-card"
            autocomplete="off"
            value="btn-card"
            checked
          />
          <label class="btn btn-outline-dark" for="btn-card">
            카드결제
          </label>

          <input
            type="radio"
            class="btn-check"
            name="buytype-group"
            id="btn-bank"
            value="btn-bank"
            autocomplete="off"
          />
          <label class="btn btn-outline-dark" for="btn-bank">
            무통장 입금
          </label>

          <input
            type="radio"
            class="btn-check"
            name="buytype-group"
            id="btn-npay"
            value="btn-npay"
            autocomplete="off"
          />
          <label class="btn btn-outline-dark" for="btn-npay">
            네이버 페이
          </label>

          <input
            type="radio"
            class="btn-check"
            name="buytype-group"
            id="btn-kpay"
            value="btn-kpay"
            autocomplete="off"
          />
          <label class="btn btn-outline-dark" for="btn-kpay">
            카카오 페이
          </label>

          <input
            type="radio"
            class="btn-check"
            name="buytype-group"
            id="btn-toss"
            value="btn-toss"
            autocomplete="off"
          />
          <label class="btn btn-outline-dark" for="btn-toss">
            toss
          </label>

          <input
            type="radio"
            class="btn-check"
            name="buytype-group"
            id="btn-paypal"
            value="btn-paypal"
            autocomplete="off"
          />
          <label class="btn btn-outline-dark" for="btn-paypal">
            paypal
          </label>
        </div>
        <div class="mt-5" v-if="learning_data === ''">
          <a class="btn d-block w-100 btn-primary py-3" @click="buy_class()">
            결제하기
          </a>
        </div>
        <div class="mt-5" v-if="learning_data === true">
          <button class="btn btn-dark d-block w-100 py-3">
            수강중인 클래스 입니다.
          </button>
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
      classDetails: "",
      users_num: 0,
      learning_data: "",
      buytype: ""
    };
  },
  created() {
    /*
      클래스 정보 가져오기
    */
    this.db
      .collection("onlineclass")
      .doc(this.url)
      .onSnapshot(result => {
        this.classDetails = result.data();
        this.users_num = result.data().users;
      });

    /*
      유저의 해당 클래스 정보 가져오기
      */
    this.db
      .collection("users")
      .doc(this.user.uid)
      .collection("myclass")
      .doc(this.url)
      .onSnapshot(result => {
        this.learning_data = result.data().learning;
      });
  },
  methods: {
    /*
    ---------- 결제하기 ---------
    */
    buy_class() {
      let checkType = document.getElementsByName("buytype-group");

      checkType.forEach(result => {
        if (result.checked) {
          return (this.buytype = result.value);
        }
      });

      this.db
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
          c2: this.classDetails.category.c2,
          but_type: this.buytype
        })
        .then(() => {
          this.db
            .collection("onlineclass")
            .doc(this.url)
            .update({ users: this.users_num + 1 });
          alert("구매가 완료되었습니다. 홈으로 이동합니다.");
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

    #buy-btn-group {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(3, 1fr);
      column-gap: 4px;
      row-gap: 4px;
      label {
        width: 46%;
        padding: 10px 0px;
      }
    }

    .buy_price {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }
  }
}
</style>
