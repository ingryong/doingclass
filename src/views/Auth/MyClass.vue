<template>
  <div>
    <h3>나의 클래스</h3>
    <ul>
      <li v-for="list in ClassList" :key="list.id">
        <router-link :to="`/ocdetail/${list.id}`">
          <img :src="list.listimg" />
          <div
            class="list_profile"
            v-for="(profile, i) in list.creator_profile"
            :key="i"
          >
            <img :src="profile.img" />
            <span>{{ profile.cname }}</span>
          </div>
          <span class="ctg">{{ list.category1 }} | {{ list.category2 }} </span>
          <span class="tt">{{ list.title }}</span>
          <p style="padding-block-start:0px;">
            <span v-if="list.tag1 === '수강가능'" class="tag-open">{{
              list.tag1
            }}</span>
            <span v-else-if="list.tag1 === '준비중'" class="tag-ready">{{
              list.tag1
            }}</span>
            <span v-else-if="list.tag1 === '모집종료'" class="tag-close">{{
              list.tag1
            }}</span>
            <span v-if="list.tag2 === '1:1코칭'" class="tag-coaching">{{
              list.tag2
            }}</span>
            <span v-if="list.tag3 === '준비물'" class="tag-goods">{{
              list.tag3
            }}</span>
          </p>
        </router-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      db: this.$firebase.firestore(),
      storage: this.$firebase.storage(),
      ClassList: "",
      moneyClassList: "",
      careerClassList: ""
    };
  },
  async mounted() {
    await this.db
      .collection("onlineclass")
      .where("classopen", "==", true)
      .onSnapshot(querySnapshot => {
        let allDatas = [];
        let money_data = [];
        let career_data = [];

        querySnapshot.forEach(doc => {
          allDatas.push(doc.data());
          this.ClassList = allDatas;

          if (doc.data().category.c1 === "money") {
            money_data.push(doc.data());
            this.moneyClassList = money_data;
          } else if (doc.data().category.c1 === "career") {
            career_data.push(doc.data());
            this.careerClassList = career_data;
          }
        });
      });
  }
};
</script>
