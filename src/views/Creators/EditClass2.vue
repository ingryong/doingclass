<template>
  <div>
    <!-- 왼쪽 사이드바 -->
    <div id="creators-left-side">
      <router-link class="backpage" :to="`/creators/myclass`"
        ><i class="fas fa-arrow-left"></i> 이전으로 돌아가기</router-link
      >
      <h5>클래스 생성</h5>
      <ul>
        <li class="step">
          <router-link :to="`/creators/editclass1/${url}`">
            <span>1</span> 클래스 기본정보
          </router-link>
        </li>
        <li class="step">
          <router-link :to="`/creators/editclass2/${url}`">
            <span>2</span> 클래스 소개
          </router-link>
        </li>
        <li class="step"><span>3</span> 커리큘럼</li>
        <li class="step"><span>4</span> 크리에이터 소개</li>
      </ul>
    </div>

    <!-- 메인 컨텐츠 -->
    <div class="container">
      <div class="notice-card">
        <h3>클래스 소개</h3>
        <p>
          클래스를 수강하려는 수강생들에게 클래스의 정보를 입력해주세요.<br />
          [저장하기]버튼을 누르면 모든 수정 사항은 즉시 반영되어 보여집니다.
        </p>
      </div>
      <h3>2단계 클래스 소개</h3>
      <div class="input-group">
        <h4>클래스명</h4>
        <input
          type="text"
          class="form-control m-1"
          id="title"
          placeholder="두잉클래스와 함께하는 영어 기초 다지기"
          :value="doc.title"
        />
      </div>

      <div class="input-group">
        <h4>클래스 타입</h4>
        <select
          id="classtype"
          name="classtype"
          class="form-control m-1"
          :value="doc.type"
        >
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
          :value="doc.category.c1"
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
          :value="doc.category.c2"
        />
      </div>

      <div class="input-group onoff-group" id="onoff-group">
        <h4>온라인 / 오프라인</h4>
        <select
          id="onoff"
          name="onoff"
          class="form-control m-1"
          :value="doc.onoff"
        >
          <option value="online">온라인만 진행</option>
        </select>
      </div>

      <div class="input-group">
        <h4>클래스 난이도</h4>
        <select
          id="level"
          name="level"
          class="form-control m-1"
          :value="doc.level"
        >
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

      <div class="input-group">
        <h4>썸네일 이미지 업로드</h4>
        <p>
          썸네일 이미지는 4:3 비율에 최적화되어 있습니다.
          <br />비율에 맞게 이미지를 업로드 하셔야 정상적으로 보입니다.
        </p>
        <div class="class_thumbnail">
          <img
            src="@/assets/imgs/PhotoPotrait.svg"
            v-if="doc.thumbnail === ''"
            style="border:1px solid #eee;"
          />
          <img :src="thumbnail" v-if="doc.thumbnail" />
        </div>
        <input
          class="form-control m-1"
          type="file"
          accept="image/*"
          @change="imgUpload"
          id="image"
        />
      </div>
      <router-link
        tag="button"
        class="btn-m btn-gray m-1"
        to="/creators/myclass"
      >
        돌아가기
      </router-link>
      <button class="btn-m btn-blue m-1" id="send" @click="upload()">
        저장하고 다음으로
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
      doc: "",
      url: this.$route.params.id,
      thumbnail: ""
    };
  },
  mounted() {
    this.db
      .collection("onlineclass")
      .doc(this.url)
      .get()
      .then(result => {
        console.log(result.data());
        this.doc = result.data();
        this.thumbnail = result.data().thumbnail;
      });
  },
  methods: {
    imgUpload() {
      let fileInfo = document.querySelector("#image").files[0];
      let storageRef = this.storage.ref();
      let updateUrl = storageRef.child("images/thumbnail/" + fileInfo.name);
      let uploadImg = updateUrl.put(fileInfo);

      uploadImg.on(
        "state_change",
        // 변화시 동작하는 함수
        null,
        //에러시 동작하는 함수
        error => {
          console.log("실패 이유는", error);
        },
        // 성공시 동작하는 함수
        () => {
          uploadImg.snapshot.ref.getDownloadURL().then(url => {
            this.thumbnail = url;
          });
        }
      );
    },
    async upload() {
      await this.db
        .collection("onlineclass")
        .doc(this.url)
        .update({
          creator_uid: this.user.uid,
          creator_name: this.user.displayName,
          creator_email: this.user.email,
          last_update: new Date(),
          title: document.getElementById("title").value,
          category: {
            c1: document.getElementById("classcategory1").value,
            c2: document.getElementById("classcategory2").value
          },
          type: document.getElementById("classtype").value,
          onoff: document.getElementById("onoff").value,
          level: document.getElementById("level").value,
          thumbnail: this.thumbnail,
          classopen: false,
          price: 0
        })
        .then(() => {
          this.$router.push("/creators/myclass");
        })
        .catch(error => {
          console.log("error updateing document:", error);
        });
    }
  }
};
</script>

<style lang="scss">
#creators-left-side {
  position: fixed;
  top: 50px;
  left: 0px;
  z-index: 98;
  width: 220px;
  height: 100%;
  border-right: 1px solid $gray-1;
  box-sizing: border-box;
  padding: 10px;
  background-color: #fcfcfc;

  .backpage {
    display: block;
    padding-top: 10px;
    font-size: 0.875rem;
    font-weight: bold;
  }
  ul {
    padding: 10px;

    .step {
      height: 40px;
      align-items: center;
      align-content: center;
      line-height: 2rem;

      span {
        display: inline-block;
        width: 24px;
        height: 26px;
        border-radius: 4px;
        text-align: center;
        background: linear-gradient(145deg, #e6e6e6, #ffffff);
        box-shadow: 1px 1px 2px #e6e6e6, -1px -1px 2px #ffffff;
      }
    }
    .disable {
      color: $gray-3;
      cursor: default;
    }
  }
}
</style>
