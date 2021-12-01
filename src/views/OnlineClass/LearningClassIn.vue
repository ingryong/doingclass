<template>
  <div>
    <div class="blank-70"></div>

    <container class="learning_class_container">
      <section class="learning_class_left">
        <div
          class="cur_container"
          v-for="(cur, cur_num) in curriculum"
          :key="cur_num"
        >
          <p class="cur_title">#{{ cur.cur_id }} {{ cur.chapter_name }}</p>
          <ul style="display:flex;">
            <ul class="cur_study_container">
              <li v-for="(epi, epi_num) in episode" :key="epi_num">
                <a :href="`/learning/${epi.class_id}/${epi.episode_id}`">
                  <span
                    class="cur_study"
                    v-if="epi.curriculum_id === cur.curriculum_id"
                  >
                    {{ epi.episode_name }}
                    <i class="fas fa-play-circle" style="color:#13b896;"></i>
                  </span>
                </a>
              </li>
            </ul>
          </ul>
        </div>
      </section>
      <section class="learning_class_right">
        <h4>{{ learningEpisode.episode_name }}</h4>
        <iframe
          width="100%"
          height="282"
          :src="learningEpisode.video_url"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
        <p>
          {{ episode_description }}
        </p>
      </section>
    </container>
  </div>
</template>
<script>
import dayjs from "dayjs";
export default {
  component: {
    dayjs
  },
  data() {
    return {
      db: this.$firebase.firestore(),
      storage: this.$firebase.storage(),
      user: this.$store.state.user,
      url: this.$route.params.id,
      epi_url: this.$route.params.epiurl,
      learningEpisode: "",
      curriculum: "",
      episode: "",
      chapNum: 0,
      epiNum: 0,
      scrollPosition: null
    };
  },
  async mounted() {
    // learning_episode import
    await this.db
      .collection("onlineclass")
      .doc(this.url)
      .collection("curriculum")
      .doc(this.epi_url)
      .onSnapshot(result => {
        this.learningEpisode = result.data();
      });

    // curriculum & episode DB import
    await this.db
      .collection("onlineclass")
      .doc(this.url)
      .collection("curriculum")
      .orderBy("create_date")
      .onSnapshot(querySnapshot => {
        const chap_data = [];
        const epi_data = [];
        querySnapshot.forEach(result => {
          // forEach를 사용하여 분리된 result.data()값을 받아오므로 배열로 된 변수 'doc_data'에 push하여 배열로 다시 묶어서 사용할 수 있게 함
          if (result.data().type === "chapter") {
            chap_data.push(result.data());
            this.chapNum += 1;
          } else if (result.data().type === "episode") {
            epi_data.push(result.data());
            this.epiNum += 1;
          }
          this.curriculum = chap_data;
          this.episode = epi_data;
        });
      });

    await this.db
      .collection("users")
      .doc(this.user.uid)
      .collection("myclass")
      .doc(this.url)
      .update({ continue_study: this.epi_url });
  }
};
</script>
<style lang="scss">
.blank-70 {
  margin-top: 70px;
}

.learning_class_container {
  .learning_class_left {
    position: fixed;
    z-index: 99;
    width: 300px;
    height: 100%;
    padding: 10px;
    background-color: #eee;
  }
  .learning_class_right {
    margin-left: 330px;
  }
}
</style>
