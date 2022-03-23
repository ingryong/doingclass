<template>
  <div id="home-list02">
    <h1 class="fs-2">
      NEW & BEST
      <span class="fs-6">
        신규/베스트 VOD <font-awesome-icon :icon="['fas', 'ad']" />
      </span>
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
      <router-link to="/ocdetail/qztE9GeYMPUGsdZozlyn">
        <img src="@/assets/imgs/home-list01/001.png" alt="new&best 리스트" />
      </router-link>
      <router-link to="/ocdetail/QcYhm1CCWbDnAN2W9tOk">
        <img src="@/assets/imgs/home-list01/005.png" alt="new&best 리스트" />
      </router-link>
      <router-link to="/ocdetail/qoKWcOAJVyIRkHALUnXr">
        <img src="@/assets/imgs/home-list01/008.jpg" alt="new&best 리스트" />
      </router-link>
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
  width: 100%;
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
