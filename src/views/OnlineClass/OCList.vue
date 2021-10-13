<template>
  <div class="about">
    <h1>This is an OCList page</h1>
    <router-link class="btn" :to="'/creators/createclass'"
      >클래스 생성하기</router-link
    >
  </div>
</template>

<script>
export default {
  methods: {
    createClass() {
      location.href = "/createclass";
    }
  }
};
</script>
