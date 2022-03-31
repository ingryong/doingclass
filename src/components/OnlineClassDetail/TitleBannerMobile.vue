<template>
  <header class="title_container_mobile">
    <Carousel
      :dots="false"
      :loop="true"
      :autoplay="true"
      :items="1"
      :nav="false"
      :rewind="true"
    >
      <img :src="classDetails.header_img.header_img1" />
      <img :src="classDetails.header_img.header_img2" />
      <img :src="classDetails.header_img.header_img3" />
      <img :src="classDetails.header_img.header_img4" />
    </Carousel>
  </header>
</template>

<script>
import Carousel from "vue-owl-carousel";
export default {
  components: {
    Carousel
  },
  props: {
    classDetails: Object
  }
};
</script>

<style lang="scss">
.title_container_mobile {
  width: 100%;
  background: #222;

  img {
    width: 100%;
    height: 400px;
    object-fit: cover;
  }
  img:hover {
    animation-duration: 1s;
    animation-name: ImagefadeOut;
    animation-fill-mode: both;
  }
}
</style>
