<template>
  <div>
    <div class="description_container" v-for="(desc, i) in class_dec" :key="i">
      <h4>{{ desc.title }}</h4>
      <img v-if="desc.img" :src="desc.img" />
      <p class="detail_description" v-html="handleNewLine(desc.dec)"></p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    class_dec: Object
  },
  methods: {
    /*
      textarea 자동 줄바꿈
    */
    handleNewLine(str) {
      return String(str).replace(/(?:\r\n|\r|\n)/g, "</br>");
    }
  }
};
</script>

<style lang="scss">
.description_container {
  .point {
    background-color: #fafafa;
    padding: 20px 20px;
  }
  .detail_description {
    padding: 20px 10px;
  }
}
</style>
