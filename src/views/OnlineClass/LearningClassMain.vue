<template>
  <div>
    <div class="blank-70"></div>
    <container class="learning_container">
      <section class="learning_main_left">
        <span>카테고리1 </span> | <span>카테고리2 </span>
        <h1>{{ classDetails.title }}</h1>
        <span><i class="fas fa-heart" style="color:red;"></i> 123</span> |
        <span><i class="fas fa-users"></i>123명 수강중</span>
        <img
          :src="classDetails.thumbnail"
          style="display:block; width:600px; height:450px; background-color:#ccc;"
        />
        <p>학습페이지 메인 공지사항</p>
        <div class="learning_main_curriculum">
          <h3>학습하기</h3>
          <div
            class="cur_container"
            v-for="(cur, cur_num) in curriculum"
            :key="cur_num"
          >
            <p class="cur_title">#{{ cur.cur_id }} {{ cur.chapter_name }}</p>
            <ul style="display:flex;">
              <li>
                <img class="cur_img" :src="cur.chapter_img" />
              </li>
              <ul class="cur_study_container">
                <li v-for="(epi, epi_num) in episode" :key="epi_num">
                  <router-link :to="`/learning/${epi.episode_id}`">
                    <span
                      class="cur_study"
                      v-if="epi.curriculum_id === cur.curriculum_id"
                      >{{ epi.episode_name }}
                      <i class="fas fa-play-circle" style="color:#13b896;"></i
                    ></span>
                  </router-link>
                </li>
              </ul>
            </ul>
          </div>
        </div>
      </section>
      <section class="learning_main_right">
        <div class="learning_side_window">
          <router-link :to="`/learningclass/`">계속 수강하기</router-link>
          <span>평생 수강 가능</span>
        </div>
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
      classDetails: "",
      curriculum: "",
      episode: "",
      chapNum: 0,
      epiNum: 0,
      scrollPosition: null
    };
  },
  async mounted() {
    await this.db
      .collection("onlineclass")
      .doc(this.url)
      .onSnapshot(result => {
        this.classDetails = result.data();
      });

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
  }
};
</script>
<style lang="scss">
.blank-70 {
  margin-top: 70px;
}

.learning_container {
  display: flex;
  justify-content: space-between;
  width: 940px;
  box-sizing: border-box;
  padding: 10px;
  margin: auto;
  margin-top: 10px;

  .learning_main_left {
    width: 600px;

    .cur_container {
      padding-bottom: 10px;

      .cur_title {
        font-size: 1.1rem;
        font-weight: bolder;
        color: $cur-title-text;
        margin-bottom: 0px;
      }
      .cur_img {
        object-fit: cover;
        width: 160px;
        height: 90px;
        border-radius: 4px;
        background-color: #ccc;
      }

      .cur_study_container {
        width: 100%;

        .cur_study {
          display: block;
          border: 1px solid $gray-2;
          padding: 10px 10px;
          margin: 0px 0px 5px 5px;
          border-radius: 4px;
          font-size: 0.9rem;
        }
      }
    }
  }

  .learning_main_right {
    width: 300px;
    .learning_side_window {
      margin-top: 105px;
      border: 1px solid #f1f1f1;
      border-radius: 4px;
      background-color: #f1f1f1;
      padding: 20px;
      a {
        display: block;
        width: 260px;
        padding: 20px 80px;
        border-radius: 4px;
        box-sizing: border-box;
        background-color: $mint;
        color: white;
        text-align: center;
      }
    }
  }
}
</style>
