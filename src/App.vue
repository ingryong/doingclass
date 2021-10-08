<template>
  <div id="app">
    <Drawer />
    <Header />
    <router-view />
    <Footer />
  </div>
</template>

<script>
import Header from "@/components/Header.vue";
import Drawer from "@/components/Drawer.vue";
import Footer from "@/components/Footer.vue";
import store from "./store";
import "@/firebase";

export default {
  name: "App",
  data() {
    return {
      store
    };
  },
  components: {
    Header,
    Drawer,
    Footer
  }
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
