<template>
  <div>
    <div class="blank-70"></div>
    <container class="learning_container">
      <section class="learning_main_left">
        <span>카테고리1 </span> | <span>카테고리2 </span>
        <h1>learningClass입니다.</h1>
        <span><i class="fas fa-heart" style="color:red;"></i> 123</span> |
        <span><i class="fas fa-users"></i>123명 수강중</span>
        <img
          scr=""
          style="display:block; width:600px; height:450px; background-color:#ccc;"
        />
        <p>학습페이지 메인 공지사항</p>
        <div class="learning_main_curriculum"></div>
      </section>
      <section class="learning_main_right">
        <div class="learning_side_window">
          <router-link :to="`/learningclass/`">계속 수강하기</router-link>
          <span>평생 수강 가능</span>
        </div>
      </section>
    </container>
  </div>
</template>
<script></script>
<style lang="scss">
.blank-70 {
  margin-top: 70px;
}
.learning_container {
  display: flex;
  justify-content: space-between;
  width: 940px;
  box-sizing: border-box;
  padding: 10px;
  margin: auto;
  margin-top: 10px;
  .learning_main_left {
    width: 600px;
  }
  .learning_main_right {
    width: 300px;
    .learning_side_window {
      margin-top: 105px;
      border: 1px solid #f1f1f1;
      border-radius: 4px;
      background-color: #f1f1f1;
      padding: 20px;
      a {
        display: block;
        width: 260px;
        padding: 20px 80px;
        border-radius: 4px;
        box-sizing: border-box;
        background-color: $mint;
        color: white;
        text-align: center;
      }
    }
  }
}
</style>
