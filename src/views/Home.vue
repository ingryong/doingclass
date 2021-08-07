<template>
  <div>
    <TitleBaner></TitleBaner>
    <div id="home-list01">
      <h1 class="ListTitle">Let's do it! <span class="sub_title">바로 수강 가능한 클래스</span></h1>
      <HomeList01></HomeList01>
    </div>
    <div id="home-list-bg">
      <div id="home-list02">
        <h1 class="ListTitle">NEW & BEST <span class="sub_title">신규/베스트 VOD</span></h1>
        <HomeList01></HomeList01>
      </div>
    </div>
  </div>

</template>

<script>
import HomeList01 from '@/components/CardList/List01.vue'
import TitleBaner from '@/components/CardList/TitleBaner.vue'

export default { components: { HomeList01, TitleBaner } }
</script>

<style lang="scss">

#home-list01{
  width:1200px;
  margin:auto;
  padding: 50px 0px;
  text-align: left;
  overflow: hidden;

  .ListTitle{
    text-align: left;

    .sub_title{
        font-size:1.1rem;
        font-weight: 400;
      }
  }
}
#home-list-bg {
  background: $gray-1;

  #home-list02{
    width:1000px;
    margin:auto;
    padding: 50px 0px;
    text-align: left;
    overflow: hidden;

    .ListTitle{
      text-align: left;

      .sub_title{
          font-size:1.1rem;
          font-weight: 400;
        }
    }
  }
}

</style>
