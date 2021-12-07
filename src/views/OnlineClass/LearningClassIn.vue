<template>
  <div>
    <div class="blank-70"></div>

    <div class="learning_sidse_arrow">
      <i class="fas fa-caret-square-left"></i>
    </div>

    <container class="learning_class_container">
      <!-- 학습 리스트 섹션 -->
      <section class="learning_class_left">
        <div class="left_container">
          {{ curriculum.title }}
        </div>
        <div
          class="cur_container"
          v-for="(cur, cur_num) in curriculum"
          :key="cur_num"
        >
          <p class="cur_title">#{{ cur.cur_id }} {{ cur.chapter_name }}</p>
          <ul style="display:flex;">
            <ul class="cur_study_container">
              <li v-for="(epi, epi_num) in episode" :key="epi_num">
                <router-link
                  :to="`/learning/${epi.class_id}/${epi.episode_id}`"
                >
                  <span
                    class="cur_study"
                    v-if="epi.curriculum_id === cur.curriculum_id"
                  >
                    <span
                      class="cur_point"
                      v-if="
                        epi.curriculum_id === cur.curriculum_id &&
                          epi.episode_id === epi_url
                      "
                    ></span>
                    <span>{{ epi.episode_name }}</span>
                  </span>
                </router-link>
              </li>
            </ul>
          </ul>
        </div>
      </section>

      <!-- 학습 섹션 -->
      <section class="learning_class_right">
        <h4>{{ learningEpisode.episode_name }}</h4>
        <div class="iframe_box">
          <iframe
            class="video_iframe"
            width="100%"
            height="56.25%"
            :src="learningEpisode.video_url"
            title="video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <p
          v-html="handleNewLine(learningEpisode.episode_description)"
          v-if="learningEpisode.episode_description"
        ></p>
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
  },
  methods: {
    /* 
      textarea 자동 줄바꿈
    */
    handleNewLine(str) {
      return String(str).replace(/(?:\r\n|\r|\n)/g, "</br>");
    }
  }
};
</script>

<style lang="scss">
.blank-70 {
  margin-top: 70px;
}

.learning_sidse_arrow {
  position: fixed;
  z-index: 99;
  top: 80px;
  left: 330px;
  svg {
    font-size: 3rem;
    color: $gray-2;
  }
}

.learning_class_container {
  .learning_class_left {
    position: fixed;
    z-index: 99;
    width: 300px;
    height: 90%;
    top: 70;
    left: 0;
    padding: 10px;
    overflow-y: scroll;
    background-color: #eee;

    .cur_title {
      color: $mint;
      font-weight: bold;
      font-size: 0.95rem;
    }

    .cur_study_container {
      width: 100%;

      li {
        margin: 14px 0px;
      }
      .cur_study {
        width: 100%;
        display: flex;
        align-items: center;

        .cur_point {
          margin-right: 10px;
          width: 4px;
          height: 30px;
          background-color: $mint;
        }

        svg {
          font-size: 2rem;
        }
      }
    }
  }

  .learning_class_right {
    margin-left: 390px;
    max-width: 600px;

    h4 {
      padding-top: 30px;
      font-size: 1.3rem;
    }

    p {
      margin: 20px 0px;
    }

    .iframe_box {
      position: relative;
      width: 100%;
      padding-bottom: 56.25%;

      .video_iframe {
        position: absolute;
        width: 100%;
        height: 100%;
      }
    }
  }
}
</style>
