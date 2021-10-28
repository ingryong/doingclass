<template>
  <div>
    <div class="container">
      <div class="notice-card">
        <h3>{{ curriculum.chapter_name }}</h3>
      </div>
      <div class="input-group">
        <h4>
          <input
            type="text"
            class="form-control m-1 width-100"
            id="create_episode_name"
            placeholder="세부강의의 제목을 입력해주세요"
            :value="episode_name"
          />
        </h4>
        <textarea
          name="dec"
          class="form-control m-1 width-100"
          id="create_episode_description"
          placeholder="강의 내용을 입력해주세요"
          :value="episode_description"
          @input="mixinAutoResize"
          rows="10"
        ></textarea>
        <!--
        ---------- 에디터 설정 ---------
        -->
        <div class="editor">
          <EditorMenuBar :editor="editor"> </EditorMenuBar>
          <editor-content :editor="editor" />
        </div>
      </div>
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
import { Editor, EditorContent, EditorMenuBar } from "tiptap";
import { Heading, Bold, Italic, Link, HardBreak } from "tiptap-extensions";

export default {
  components: {
    EditorMenuBar,
    EditorContent
  },
  data() {
    return {
      db: this.$firebase.firestore(),
      storage: this.$firebase.storage(),
      user: this.$store.state.user,
      url: this.$route.params.id,
      curriculum_id: this.$route.params.doc_id,
      curriculum: "",
      episode: "",
      episode_name: "",
      episode_description: "",
      img: "../../assets/imgs/PhotoPotrait.svg",
      chap_modal: false,
      episode_modal: false,
      editor: null
    };
  },
  async mounted() {
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

    this.editor = new Editor({
      content: "<p>This is just a boring paragraph</p>",
      extensions: [
        new Heading(),
        new Bold(),
        new Italic(),
        new Link(),
        new HardBreak()
      ]
    });
  },
  beforeDestroy() {
    this.editor.destroy();
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
          this.$router.push(`/creators/editclass3/${this.url}`);
        })
        .catch(error => {
          console.log("error updateing document:", error);
        });
    }
  }
};
</script>

<style lang="scss"></style>
