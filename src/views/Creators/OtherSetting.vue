<template>
  <div>
    <!-- 메인 컨텐츠 -->
    <div class="container">
      <div class="notice-card">
        <h3>추가 설정 관리</h3>
        <p>
          해당 클래스의 추가적인 설정을 관리합니다.
        </p>
      </div>

      <!-- 소개1 -->
      <div class="input-group">
        <h4>
          클래스 오픈 설정
        </h4>
        <div class="setting_content">
          <input id="cb1" class="tgl tgl-light" type="checkbox" />
          클래스 on/off
          <label for="cb1" class="tgl-btn"></label>
        </div>
      </div>
      <router-link
        tag="button"
        class="btn-m btn-gray m-1"
        to="/creators/myclass"
      >
        돌아가기
      </router-link>
      <button class="btn-m btn-blue m-1" id="send" @click="upload()">
        설정 저장하기
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
      doc: ""
    };
  },
  mounted() {
    this.db
      .collection("onlineclass")
      .doc(this.url)
      .onSnapshot(result => {
        this.doc = result.data();
        if (result.data().classopen === true) {
          document.getElementById("cb1").checked = true;
        }
      });
  },
  methods: {
    async upload() {
      await this.db
        .collection("onlineclass")
        .doc(this.url)
        .update({
          last_update: new Date(),
          classopen: document.getElementById("cb1").checked
        })
        .then(() => {
          alert("설정이 저장되었습니다.");
        })
        .catch(error => {
          console.log("error updateing document:", error);
        });
    },
    mixinAutoResize(event) {
      // textarea 자동 높이 조절
      event.target.style.height = "auto";
      event.target.style.height = `${event.target.scrollHeight}px`;
    }
  }
};
</script>
<style lang="scss">
.setting_content {
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.tgl {
  display: none;

  // add default box-sizing for this scope
  &,
  &:after,
  &:before,
  & *,
  & *:after,
  & *:before,
  & + .tgl-btn {
    box-sizing: border-box;
    &::selection {
      background: none;
    }
  }

  + .tgl-btn {
    outline: 0;
    display: block;
    width: 4em;
    height: 2em;
    position: relative;
    cursor: pointer;
    user-select: none;
    &:after,
    &:before {
      position: relative;
      display: block;
      content: "";
      width: 50%;
      height: 100%;
    }

    &:after {
      left: 0;
    }

    &:before {
      display: none;
    }
  }

  &:checked + .tgl-btn:after {
    left: 50%;
  }
}

// themes
.tgl-light {
  + .tgl-btn {
    background: #fccc;
    border-radius: 2em;
    padding: 2px;
    transition: all 0.4s ease;
    &:after {
      border-radius: 50%;
      background: #fff;
      transition: all 0.2s ease;
    }
  }

  &:checked + .tgl-btn {
    background: #9fd6ae;
  }
}
</style>
