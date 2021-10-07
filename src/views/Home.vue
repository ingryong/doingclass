<template>
  <div>
    <TitleBaner></TitleBaner>
    <div id="home-list01-bg">
      <HomeList01></HomeList01>
    </div>
    <div id="home-list02-bg">
      <HomeList02></HomeList02>
    </div>
    <div id="home-oclist-bg">
      <OCList></OCList>
    </div>
  </div>
</template>

<script>
import HomeList01 from "@/components/Home/List01";
import HomeList02 from "@/components/Home/List02";
import TitleBaner from "@/components/Home/TitleBaner";
import OCList from "@/components/Home/OCList";
import OnlineClass from "@/assets/data/onlineclass";

export default {
  data() {
    return {
      OnlineClass: OnlineClass
    };
  },
  components: { HomeList01, HomeList02, TitleBaner, OCList }
};
</script>

<style lang="scss">
#home-list01-bg {
  background: white;
  padding-bottom: 50px;
}
.ListTitle {
  text-align: left;

  .sub_title {
    font-size: 1.1rem;
    font-weight: 400;
  }
}
#home-list02-bg {
  background: $gray-1;
  padding-bottom: 50px;
}
</style>
