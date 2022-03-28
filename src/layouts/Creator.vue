<template>
  <div>
    <CreatorNavbar></CreatorNavbar>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import CreatorNavbar from "@/components/Navbar/CreatorNavbar.vue";

export default {
  name: "Creators",
  components: {
    CreatorNavbar
  }
};
</script>

<style lang="scss"></style>
