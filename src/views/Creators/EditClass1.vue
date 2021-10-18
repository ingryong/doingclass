<template>
  <div>
    <!-- 왼쪽 사이드바 -->
    <div id="creators-left-side">
      <h5>클래스 생성</h5>
      <ul>
        <li class="step">
          <router-link :to="`/creators/editclass1/${url}`">
            <span>1</span> 클래스 기본정보
          </router-link>
        </li>
        <li class="step"><span>2</span> 클래스 소개</li>
        <li class="step"><span>3</span> 커리큘럼</li>
        <li class="step"><span>4</span> 크리에이터 소개</li>
      </ul>
    </div>

    <!-- 메인 컨텐츠 -->
    <div class="container">
      <h3>{{ doc.title }}</h3>
      <h3>dddd</h3>
      <h3>sfasdfasdfas</h3>
      <h3>dddd</h3>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      db: this.$firebase.firestore(),
      storage: this.$firebase.storage(),
      doc: "",
      url: this.$route.params.id
    };
  },
  mounted() {
    this.db
      .collection("onlineclass")
      .doc(this.url)
      .get()
      .then(result => {
        console.log(result.data());
        this.doc = result.data();
      });
  }
};
</script>

<style lang="scss">
#creators-left-side {
  position: fixed;
  top: 50px;
  left: 0px;
  z-index: 98;
  width: 220px;
  height: 100%;
  border-right: 1px solid $gray-1;
  box-sizing: border-box;
  padding: 10px;
  background-color: #fcfcfc;
  ul {
    padding: 10px;

    .step {
      height: 40px;
      align-items: center;
      align-content: center;
      line-height: 2rem;

      span {
        display: inline-block;
        width: 24px;
        height: 26px;
        border-radius: 4px;
        text-align: center;
        background: linear-gradient(145deg, #e6e6e6, #ffffff);
        box-shadow: 1px 1px 2px #e6e6e6, -1px -1px 2px #ffffff;
      }
    }
    .disable {
      color: $gray-3;
      cursor: default;
    }
  }
}
</style>
