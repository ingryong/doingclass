<template>
  <div>
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
import store from "../store";
import "@/plugins/firebase";

export default {
  name: "DefaultLayout",
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
