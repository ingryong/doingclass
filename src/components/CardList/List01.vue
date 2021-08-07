<template>
      <Carousel class="list-carousel-slide01" :margin=14 :dots="false" :loof="true" :autoplay="true" :items=3 :nav="false" :rewind="true">
        <img src="@/assets/imgs/home-list01/003.jpg">
        <img src="@/assets/imgs/home-list01/002.jpg">
        <img src="@/assets/imgs/home-list01/001.jpg">
        <img src="@/assets/imgs/home-list01/003.jpg">
        <img src="@/assets/imgs/home-list01/002.jpg">
        <img src="@/assets/imgs/home-list01/001.jpg">
      </Carousel>
</template>

<script>
import Carousel from 'vue-owl-carousel'

export default { components: { Carousel } }
</script>

<style lang="scss">
.list-carousel-slide01{
img{
    width:390px;
    border-radius: 10px;
}
}
</style>
