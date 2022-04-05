<template>
  <div>
    <TitleBaner></TitleBaner>
    <div id="home-list02-bg">
      <NewBest v-if="pageWidth >= 680"></NewBest>
      <NewBestMobile v-if="pageWidth < 680"></NewBestMobile>
    </div>
    <HomeOCList :openClassList="openClassList" v-if="pageWidth >= 680">
    </HomeOCList>
    <HomeOCListMoible :openClassList="openClassList" v-if="pageWidth < 680">
    </HomeOCListMoible>
  </div>
</template>

<script>
import NewBest from "@/components/Home/New&Best";
import NewBestMobile from "@/components/Home/New&Best_M";
import TitleBaner from "@/components/Home/TitleBaner";
import HomeOCList from "@/components/Home/OCList";
import HomeOCListMoible from "@/components/Home/OCListMobile";

export default {
  components: {
    NewBest,
    TitleBaner,
    HomeOCList,
    HomeOCListMoible,
    NewBestMobile
  },
  data() {
    return {
      db: this.$firebase.firestore(),
      openClassList: "",
      pageWidth: window.innerWidth
    };
  },
  created() {
    this.db
      .collection("onlineclass")
      .where("classopen", "==", true)
      .onSnapshot(querySnapshot => {
        let allDatas = [];

        querySnapshot.forEach(doc => {
          allDatas.push(doc.data());
          this.openClassList = allDatas;
        });
      });
    // 구성 요소 생성시 Vue 메서드가 등록되고 브라우저 창의 크기가 조정되면 myEventHandler가 트리거되며 구성 요소가 삭제되면 메모리가 확보됩니다
    window.addEventListener("resize", this.myEventHandler);
  },
  destroyed() {
    // 반응형 너비 관련 코드
    window.removeEventListener("resize", this.myEventHandler);
  },
  methods: {
    myEventHandler() {
      // 반응형 너비 관련 코드
      this.pageWidth = window.innerWidth;
    }
  }
};
</script>

<style lang="scss">
#home-list01-bg {
  background: white;
  padding-bottom: 50px;
}
#home-list02-bg {
  background: $gray-1;
  padding-bottom: 50px;
}
</style>
