<template>
  <div class="container">
    <h3>나의 클래스 만들기</h3>
    <div class="input-group">
      <h4>클래스명</h4>
      <input
        type="text"
        class="form-control m-1"
        id="title"
        placeholder="두잉클래스와 함께하는 영어 기초 다지기"
      />
    </div>

    <div class="input-group">
      <h4>클래스 타입</h4>
      <select id="classtype" name="classtype" class="form-control m-1">
        <option value="onlineclass">온라인클래스(VOD)</option>
      </select>
    </div>
    <div class="input-group onoff-group" id="onoff-group">
      <h4>온라인 / 오프라인</h4>
      <select id="onoff" name="onoff" class="form-control m-1">
        <option value="online">온라인만 진행</option>
      </select>
    </div>

    <div class="input-group">
      <h4>강의의 난이도는 얼마나 높은가요?</h4>
      <select id="level" name="level" class="form-control m-1">
        <option value="none"
          >상관없음 (해당 강의와 관련된 지식이 전혀 없어도 수강 가능)</option
        >
        <option value="basic"
          >초급 (해당 강의와 관련된 기초적인 지식이 있어야 수강 가능)</option
        >
        <option value="middle"
          >중급 (해당 강의와 관련된 실무에 활용할 정도의 지식이 있어야 수강
          가능)</option
        >
        <option value="basic"
          >고급 (해당 강의와 관련된 상당한 지식이 있어야 수강 가능)</option
        >
      </select>
    </div>

    <textarea
      class="form-control m-1"
      id="content"
      placeholder="내용을 입력하세요"
      @input="mixinAutoResize"
    ></textarea>
    <input
      type="text"
      class="form-control m-1"
      id="price"
      placeholder="price"
    />
    <input class="form-control m-1" type="file" id="image" />
    <button class="btn-m btn-blue m-1" id="send" @click="upload()">
      올리기
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      db: this.$firebase.firestore(),
      storage: this.$firebase.storage()
    };
  },
  methods: {
    upload() {
      this.db
        .collection("onlineclass")
        .add({
          title: document.getElementById("title").value,

          type: document.getElementById("classtype").value,
          onoff: document.getElementById("onoff").value,
          level: document.getElementById("level").value
        })
        .then(() => {
          document.getElementById("title").value = "";
        });
    },
    mixinAutoResize(event) {
      // textarea 자동 높이 조절
      event.target.style.height = "auto";
      event.target.style.height = `${event.target.scrollHeight}px`;
    }
  },
  mounted() {
    this.$nextTick(() => {
      // textarea 자동 높이 조절
      this.$el.setAttribute("style", "height", `${this.$el.scrollHeight}px`);
    });
  }
};
</script>

<style lang="scss">
.container {
  max-width: 900px;
  padding: 10px;
  margin: auto;
  margin-top: 20px;

  h4 {
    font-size: 1.5rem;
    margin: auto;
    text-align: left;
    margin-left: 4%;
    padding-left: 10px;
    border-left: 4px solid $cur-title-text;
  }

  .form-control {
    display: block;
    width: 90%;
    min-height: 2rem;
    margin: auto;
    padding: 4px;
  }

  .m-1 {
    margin: 10px auto 20px auto;
  }
}
</style>
