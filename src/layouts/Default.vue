<template>
  <div>
    <Navbar />
    <div style="height:94px;"></div>
    <router-view :key="$route.fullPath" />
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar/Navbar.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "DefaultLayout",
  components: {
    Navbar,
    Footer
  }
};
</script>
