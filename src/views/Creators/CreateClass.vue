<template>
  <div class="container">
    <div class="notice-card">
      <h3>나의 클래스 만들기</h3>
      <p>
        클래스 개설하기에 앞서 만드시려는 클래스의 기본적인 정보를
        알려주세요.<br />
        [저장하기]버튼을 누르면 모든 수정 사항은 즉시 반영되어 보여집니다.
      </p>
    </div>
    <h3>1단계</h3>
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

    <div class="input-group">
      <h4>클래스 카테고리</h4>
      <p>1차 카테고리</p>
      <select
        id="classcategory1"
        name="classcategory1"
        class="form-control m-1"
      >
        <option value="" disabled selected hidden
          >1차 카테고리를 선택해주세요</option
        >
        <option value="money">머니 클래스</option>
        <option value="career">커리어 클래스</option>
        <option value="healty">건강 클래스</option>
        <option value="hobby">취미 클래스</option>
      </select>
      <p>2차 카테고리</p>
      <input
        type="text"
        class="form-control m-1"
        id="classcategory2"
        placeholder="짧은 낱말로 2차 카테고리를 입력해주세요 (예)DIY, 책읽기, 다이어트"
      />
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
    <router-link tag="button" class="btn-m btn-gray m-1" to="/creators/myclass">
      돌아가기
    </router-link>
    <button class="btn-m btn-blue m-1" id="send" @click="upload()">
      클래스 생성하기
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      db: this.$firebase.firestore(),
      storage: this.$firebase.storage(),
      user: this.$store.state.user
    };
  },
  methods: {
    async upload() {
      await this.db
        .collection("onlineclass")
        .add({
          creator_uid: this.user.uid,
          creator_name: this.user.displayName,
          creator_email: this.user.email,
          last_update: new Date(),
          title: document.getElementById("title").value,
          category: {
            cagerory1: document.getElementById("classcategory1").value,
            category2: document.getElementById("classcategory2").value
          },
          type: document.getElementById("classtype").value,
          onoff: document.getElementById("onoff").value,
          level: document.getElementById("level").value
        })
        .then(() => {
          this.$router.push("/creators/myclass");
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
  max-width: 700px;
  padding: 10px;
  margin-left: 240px;
  margin-top: 60px;

  .notice-card {
    width: 80%;
    border: 1px solid #eee;
    box-sizing: border-box;
    padding: 15px;
  }

  h4 {
    font-size: 1.25rem;
    margin: auto;
    text-align: left;
    padding-left: 10px;
    font-weight: normal;
    border-left: 4px solid $cur-title-text;
  }

  .form-control {
    display: block;
    width: 80%;
    min-height: 2rem;
    padding: 12px 6px;
    box-sizing: border-box;
  }
  a:hover {
    cursor: pointer;
  }
  select {
    height: 44px;
  }

  .m-1 {
    margin: 10px 10px 20px 0px;
  }
}
</style>
