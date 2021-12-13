<template>
  <div>
    <CreatorHeader></CreatorHeader>
    <div id="creators-left-side">
      <h5>클래스 관리</h5>
      <ul>
        <li>
          <router-link to="/creators/myclass">개설한 클래스 관리</router-link>
        </li>
      </ul>
    </div>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import CreatorHeader from "@/components/CreatorHeader.vue";

export default {
  name: "Creators",
  components: {
    CreatorHeader
  }
};
</script>

<style lang="scss">
#creators-left-side {
  position: fixed;
  top: 50px;
  left: 0px;
  z-index: 98;
  width: 220px;
  height: 100%;
  border-right: 1px solid $gray-1;
  box-sizing: border-box;
  padding: 10px;
  background-color: #fcfcfc;
  ul {
    padding: 10px;
  }
}
</style>
