<template>
  <div>
    <TitleBaner></TitleBaner>
    <div id="home-list02-bg">
      <HomeList02></HomeList02>
    </div>
    <div class="oc_oclist">
      <p class="listTitle">
        <span class="title">
          <i class="fas fa-book" style="color:#999;"></i> 온라인 클래스
        </span>
        <span class="sub_title">온라인 VOD 클래스</span>
      </p>
      <ul>
        <li v-for="list in openClassList" :key="list.id">
          <router-link :to="`/ocdetail/${list.id}`">
            <img class="list_sumbnail" :src="list.thumbnail" />
            <div class="list_profile">
              <img :src="list.profile_img" />
              <span>{{ list.profile_name }}</span>
            </div>
            <span class="ctg"
              >{{ list.category.c1 }} | {{ list.category.c2 }}
            </span>
            <span class="tt">{{ list.title }}</span>
            <p style="padding-block-start:0px;">
              <span v-if="list.classopen" class="tag-open">수강 가능</span>
              <span v-else-if="!list.classopen" class="tag-ready">준비중</span>
              <span v-if="list.onoff === 'online'" class="tag-coaching"
                >온라인 강의</span
              >
              <span v-if="list.onoff === 'offline'" class="tag-coaching"
                >오프라인 강의</span
              >
            </p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import HomeList02 from "@/components/Home/List02";
import TitleBaner from "@/components/Home/TitleBaner";
import OnlineClass from "@/assets/data/onlineclass";

export default {
  data() {
    return {
      db: this.$firebase.firestore(),
      storage: this.$firebase.storage(),
      OnlineClass: OnlineClass,
      openClassList: ""
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
  },
  components: { HomeList02, TitleBaner }
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
