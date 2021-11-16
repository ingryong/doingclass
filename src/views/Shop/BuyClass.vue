<template>
  <div class="gray_body">
    <div class="buy_container">
      <div class="buy_item">
        <h3>주문 정보</h3>
        <p>클래스 이름</p>
        <img />
        <hr />
      </div>
      <div class="buy_item">
        <h3>결제 금액</h3>
        <p><span>상품 금액</span><span>000원</span></p>
        <p><span>상품 할인 금액</span><span>000원</span></p>
        <p><strong>최종가격</strong><span>000원</span></p>
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
        <div>
          <a>결제하기</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>

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
          height: 50px;
          line-height: 50px;
          text-align: center;
          background-color: #eee;
        }
      }
    }
  }
}
</style>
