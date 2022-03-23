<template>
  <div>
    <Navbar />
    <div style="height:94px;"></div>
    <router-view :key="$route.fullPath" />
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
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
    Navbar,
    Footer
  }
};
</script>
