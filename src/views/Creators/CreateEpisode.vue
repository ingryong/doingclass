<template>
  <div>
    <!-- 
    ---------- 챕터 모달창 ----------
    -->
    <div>
      <div id="viedo_modal" class="black-bg" v-show="video_modal">
        <div class="white-bg">
          <span @click="video_modal = false">닫기</span>
          <h3>강의영상 URL 입력</h3>
          <input
            id="video_url"
            type="text"
            style="display:inline; width:90%;"
            placeholder="강의영상의 url을 입력해주세요"
            :value="video_url"
          />
          <button class="btn-m btn-blue" @click="video_upload()">
            영상 추가
          </button>
        </div>
      </div>
    </div>

    <!-- 
    ---------- 강의 내용 입력 ----------
    -->
    <div class="create_container">
      <div class="notice_card">
        <h3>{{ class_info.title }}</h3>
        <h4>{{ curriculum.chapter_name }}</h4>
      </div>
      <div class="input_group">
        <p>세부 강의 제목 입력</p>
        <h4>
          <input
            type="text"
            class="form-control m-1 width-100"
            id="create_episode_name"
            maxlength="40"
            placeholder="세부강의의 제목을 입력해주세요(최대 40자)"
          />
        </h4>

        <div class="video_area">
          <div
            class="video_upload_button"
            @click="video_modal = true"
            style="border:1px solid #ccc; text-align:center; border-radius:4px; padding:20px; cursor:pointer; margin-bottom:10px;"
          >
            강의 영상 URL 올리기
          </div>
          <div class="iframe_box" v-show="video_url">
            <iframe
              class="video_iframe"
              width="100%"
              height="282"
              :src="video_url"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div>
        <textarea
          name="dec"
          class="form-control m-1 width-100"
          id="create_episode_description"
          placeholder="강의 내용을 입력해주세요"
          @input="mixinAutoResize"
          rows="10"
        ></textarea>
      </div>

      <!-- 
    ---------- 돌아가기/저장하기 버튼 ----------
    -->
      <router-link
        tag="button"
        class="btn-m btn-gray m-1"
        :to="`/creators/editclass3/${this.url}`"
      >
        돌아가기
      </router-link>
      <button class="btn-m btn-blue m-1" id="send" @click="episode_upload()">
        강의 저장하기
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      db: this.$firebase.firestore(),
      storage: this.$firebase.storage(),
      user: this.$store.state.user,
      url: this.$route.params.id,
      curriculum_id: this.$route.params.doc_id,
      class_info: "",
      curriculum: "",
      episode: "",
      episode_name: "",
      episode_description: "",
      video_url: "",
      img: "../../assets/imgs/PhotoPotrait.svg",
      video_modal: false
    };
  },
  async created() {
    /*
    ---------- 클래스정보 불러오기 ---------
    */
    await this.db
      .collection("onlineclass")
      .doc(this.url)
      .get()
      .then(result => {
        this.class_info = result.data();
      });
    /*
    ---------- 챕터(type:"chapter")/세부강의(type:"episode") 불러오기 ---------
    */
    await this.db
      .collection("onlineclass")
      .doc(this.url)
      .collection("curriculum")
      .doc(this.curriculum_id)
      .get()
      .then(result => {
        this.curriculum = result.data();
      });
  },
  methods: {
    /*
    ---------- textarea 자동 높이 조절 ---------
    */
    mixinAutoResize(event) {
      event.target.style.height = "auto";
      event.target.style.height = `${event.target.scrollHeight}px`;
    },

    /*
    ---------- youtube / vimeo의 영상을 embed와 일반 url 구분하여 제대로 넣어줌 ---------
    */
    video_upload() {
      let input_url = document.getElementById("video_url").value;

      if (input_url.includes("youtube.com/embed")) {
        this.video_url = document.getElementById("video_url").value;
        this.video_modal = false;
      } else if (input_url.includes("youtu.be")) {
        this.video_url = input_url.replace("youtu.be", "www.youtube.com/embed");
        this.video_modal = false;
      } else if (input_url.includes("youtube.com/watch")) {
        const url_adress = input_url.substring(32, 43);
        this.video_url = `https://www.youtube.com/embed/${url_adress}`;
        this.video_modal = false;
      } else if (input_url.includes("vimeo.com")) {
        this.video_url = input_url.replace(
          "vimeo.com",
          "player.vimeo.com/video"
        );
        this.video_modal = false;
      } else if (input_url.includes("player.vimeo.com/video")) {
        this.video_url = document.getElementById("video_url").value;
        this.video_modal = false;
      } else {
        this.video_url = "";
        this.video_modal = false;
      }
    },

    /*
    ---------- 세부강의 추가하기 ---------
    */
    async episode_upload() {
      await this.db
        .collection("onlineclass")
        .doc(this.url)
        .collection("curriculum")
        .add({
          create_date: new Date(),
          episode_name: document.getElementById("create_episode_name").value,
          video_url: this.video_url,
          episode_description: document.getElementById(
            "create_episode_description"
          ).value,
          class_id: this.url,
          curriculum_id: this.curriculum_id,
          type: "episode"
        })
        .then(async docRef => {
          await this.db
            .collection("onlineclass")
            .doc(this.url)
            .collection("curriculum")
            .doc(docRef.id)
            .update({ episode_id: docRef.id });

          if (this.class_info.first_episode === "") {
            await this.db
              .collection("onlineclass")
              .doc(this.url)
              .update({
                first_episode: docRef.id
              });
          }
          this.$router.push(`/creators/editclass3/${this.url}`);
        })
        .catch(error => {
          console.log("error updateing document:", error);
        });
    }
  }
};
</script>

<style lang="scss">
.video_area {
  .video_upload_button {
    border: 1px solid #ccc;
    text-align: center;
    border-radius: 4px;
    padding: 20px;
    cursor: pointer;
    margin-bottom: 10px;
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
</style>
