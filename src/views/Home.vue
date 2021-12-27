<template>
  <div>
    <TitleBaner></TitleBaner>
    <div id="home-list02-bg">
      <HomeList02></HomeList02>
    </div>
    <HomeOCList
      v-bind:openClassList="openClassList"
      v-show="pageWidth > 800"
    ></HomeOCList>
    <HomeOCListMoible
      v-bind:openClassList="openClassList"
      v-show="pageWidth < 800"
    ></HomeOCListMoible>
  </div>
</template>

<script>
import HomeList02 from "@/components/Home/List02";
import TitleBaner from "@/components/Home/TitleBaner";
import HomeOCList from "@/components/Home/OCList";
import HomeOCListMoible from "@/components/Home/OCListMobile";
import OnlineClass from "@/assets/data/onlineclass";

export default {
  data() {
    return {
      db: this.$firebase.firestore(),
      storage: this.$firebase.storage(),
      OnlineClass: OnlineClass,
      openClassList: "",
      pageWidth: ""
    };
  },
  async mounted() {
    await this.db
      .collection("onlineclass")
      .where("classopen", "==", true)
      .onSnapshot(querySnapshot => {
        let allDatas = [];

        querySnapshot.forEach(doc => {
          allDatas.push(doc.data());
          this.openClassList = allDatas;
        });
      });

    this.pageWidth = window.innerWidth;
  },
  components: { HomeList02, TitleBaner, HomeOCList, HomeOCListMoible }
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
