<template>
  <router-view />
</template>

<script>
import store from "./store";
import "@/plugins/firebase";

export default {
  name: "App",
  data() {
    return {
      store
    };
  },
  components: {}
};
</script>

<style lang="scss">
html {
  font-size: 16px;

  input:focus {
    outline: none;
  }

  textarea:focus {
    outline: none;
  }

  ul li {
    list-style: none;
  }
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: $main-txt;
}
</style>
