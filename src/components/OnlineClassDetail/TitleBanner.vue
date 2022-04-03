<template>
  <header class="title_container">
    <div class="detail_title_banner" v-if="classDetails.header_img">
      <div class="banner_left">
        <img :src="classDetails.header_img.header_img1" />
      </div>
      <div class="banner_right_top">
        <img :src="classDetails.header_img.header_img2" />
      </div>
      <div class="banner_right_bottom1">
        <img :src="classDetails.header_img.header_img3" />
      </div>
      <div class="banner_right_bottom2">
        <img :src="classDetails.header_img.header_img4" />
      </div>
    </div>
  </header>
</template>

<script>
export default {
  props: {
    classDetails: Object
  }
};
</script>

<style lang="scss">
.title_container {
  width: 100%;
  background: #222;

  .detail_title_banner {
    width: 100%;
    max-width: 1920px;
    margin: auto;
    display: grid;
    grid-template-columns: 50% 25% 25%;
    grid-template-rows: 250px 250px;
    grid-template-areas:
      "left right right"
      "left right1 right2";

    img {
      width: 100%;
      height: 250px;
      object-fit: cover;
    }
    img:hover {
      animation-duration: 1s;
      animation-name: ImagefadeOut;
      animation-fill-mode: both;
    }

    .banner_left {
      grid-area: left;
      img {
        height: 500px;
      }
    }
    .banner_right_top {
      grid-area: right;
    }
    .banner_right_bottom1 {
      grid-area: right1;
    }
    .banner_right_bottom2 {
      grid-area: right2;
    }
  }
}
</style>
