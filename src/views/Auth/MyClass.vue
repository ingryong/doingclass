<template>
  <div>
    <div class="oc_oclist" v-if="!MyClass">
      <p class="listTitle">
        <span class="title">
          <i class="fas fa-book" style="color:#999;"></i> 내 클래스
        </span>
        <span> 현재 수강중인 나의 클래스 </span>
      </p>
      <h2 style="width:100%; margin-top:50px; color:#aaa; text-align:center;">
        수강중인 클래스가 없습니다.
      </h2>
    </div>
    <div class="oc_oclist" v-if="MyClass">
      <p class="listTitle">
        <span class="title">
          <i class="fas fa-book" style="color:#999;"></i> 내 클래스
        </span>
        <span> 현재 수강중인 나의 클래스 </span>
      </p>
      <ul>
        <li v-for="list in MyClass" :key="list.id">
          <router-link :to="`/learningclass/${list.class_id}`">
            <img class="list_sumbnail" :src="list.class_thumbnail" />
            <span class="ctg">{{ list.c1 }} | {{ list.c2 }} </span>
            <span class="tt">{{ list.class_name }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      db: this.$firebase.firestore(),
      user: this.$store.state.user,
      storage: this.$firebase.storage(),
      MyClass: ""
    };
  },
  async mounted() {
    await this.db
      .collection("users")
      .doc(this.user.uid)
      .collection("myclass")
      .where("learning", "==", true)
      .onSnapshot(querySnapshot => {
        let learningData = [];

        querySnapshot.forEach(doc => {
          learningData.push(doc.data());
          this.MyClass = learningData;
          console.log(this.MyClass);
        });
      });
  }
};
</script>
