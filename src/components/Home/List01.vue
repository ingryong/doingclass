<template>
<div id="home-list02">
  <h1 class="ListTitle">Let's do it! <span class="sub_title">바로 수강 가능한 클래스</span></h1>
  <Carousel class="list-carousel-slide01" :margin=14 :dots="false" :loop="true" :autoplay="true" :items=3 :nav="false" :rewind="true">
    <a><img src="@/assets/imgs/home-list01/001.png"></a>
    <a><img src="@/assets/imgs/home-list01/002.png"></a>
    <a><img src="@/assets/imgs/home-list01/003.png"></a>
    <a><img src="@/assets/imgs/home-list01/004.png"></a>
    <a><img src="@/assets/imgs/home-list01/005.png"></a>
    <a><img src="@/assets/imgs/home-list01/006.png"></a>
    <a><img src="@/assets/imgs/home-list01/007.png"></a>
    <a><img src="@/assets/imgs/home-list01/008.jpg"></a>
    <a><img src="@/assets/imgs/home-list01/009.jpg"></a>
  </Carousel>
</div>
</template>

<script>
import Carousel from 'vue-owl-carousel'

export default { components: { Carousel } }
</script>

<style lang="scss">
#home-list02{
  @include content-area2;
  padding: 50px 10px;
  text-align: left;
  overflow: hidden;

  .list-carousel-slide01{
    img{
        border-radius: 10px;
    }
  }
}
</style>
