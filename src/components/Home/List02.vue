<template>
  <div id="home-list02">
    <h1 class="ListTitle">
      NEW & BEST <span class="sub_title">신규/베스트 VOD</span>
    </h1>
    <Carousel
      class="list-carousel-slide01"
      :margin="14"
      :dots="false"
      :loop="true"
      :autoplay="true"
      :items="3"
      :nav="false"
      :rewind="true"
    >
      <img src="@/assets/imgs/home-list01/003.png" />
      <img src="@/assets/imgs/home-list01/002.png" />
      <img src="@/assets/imgs/home-list01/001.png" />
      <img src="@/assets/imgs/home-list01/003.png" />
      <img src="@/assets/imgs/home-list01/002.png" />
      <img src="@/assets/imgs/home-list01/001.png" />
    </Carousel>
  </div>
</template>

<script>
import Carousel from "vue-owl-carousel";

export default { components: { Carousel } };
</script>

<style lang="scss">
#home-list02 {
  @include content-area2;
  padding: 50px 10px;
  text-align: left;
  overflow: hidden;
}

.list-carousel-slide01 {
  img {
    border-radius: 10px;
  }
}
</style>
