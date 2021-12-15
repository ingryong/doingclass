<template>
  <div>
    <!-- 메인 컨텐츠 -->
    <div class="create_container">
      <div class="notice_card">
        <h3>1. 나의 클래스 만들기</h3>
        <p>
          클래스 개설하기에 앞서 만드시려는 클래스의 기본적인 정보를
          알려주세요.<br />
          썸네일 이미지를 제외한 다른 입력은 [저장하고 다음으로] 버튼을 클릭해야
          반영 됩니다.
        </p>
      </div>

      <div class="input_group">
        <h4>클래스명</h4>
        <p>클래스명은 <strong>최대 35자</strong>까지 작성 가능합니다.</p>
        <input
          type="text"
          class="form-control m-1"
          id="title"
          placeholder="두잉클래스와 함께하는 영어 기초 다지기"
          :value="doc.title"
          maxlength="35"
        />
      </div>

      <div class="input_group">
        <h4>썸네일 이미지 업로드</h4>
        <p style="text-align:center;">
          썸네일 이미지는
          <strong>글자가 삽입되지 않은 4:3 비율의 이미지</strong>에 최적화되어
          있습니다. <br />비율에 맞게 이미지를 업로드 하셔야 정상적으로
          보입니다.
        </p>
        <div class="thumb_img_upload">
          <label for="image">
            <p class="thumb_img" v-if="!doc.thumbnail">
              썸네일 이미지를<br />등록 해주세요.
            </p>
            <img class="thumb_img" :src="doc.thumbnail" v-if="doc.thumbnail" />
          </label>
          <input
            class="thumb_upload"
            type="file"
            id="image"
            accept="image/*"
            v-show="false"
            @change="imgUpload"
          />
        </div>
      </div>

      <div class="input_group">
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

      <div class="input_group">
        <h4>클래스 카테고리</h4>
        <p>1차 카테고리</p>
        <select
          id="classcategory1"
          name="classcategory1"
          class="form-control m-1"
          :value="doc.category.c1"
        >
          <option value="" disabled selected hidden>
            1차 카테고리를 선택해주세요
          </option>
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
          placeholder="최대 6글자까지 입력 가능합니다 (예)DIY, 책읽기, 다이어트"
          :value="doc.category.c2"
          maxlength="6"
        />
      </div>

      <div class="input_group onoff-group" id="onoff-group">
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

      <div class="input_group">
        <h4>클래스 난이도</h4>
        <select
          id="level"
          name="level"
          class="form-control m-1"
          :value="doc.level"
        >
          <option value="none">
            상관없음 (해당 강의와 관련된 지식이 전혀 없어도 수강 가능)
          </option>
          <option value="basic">
            초급 (해당 강의와 관련된 기초적인 지식이 있어야 수강 가능)
          </option>
          <option value="middle">
            중급 (해당 강의와 관련된 실무에 활용할 정도의 지식이 있어야 수강
            가능)
          </option>
          <option value="high">
            고급 (해당 강의와 관련된 상당한 지식이 있어야 수강 가능)
          </option>
        </select>
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
      url: this.$route.params.id
    };
  },
  mounted() {
    this.db
      .collection("onlineclass")
      .doc(this.url)
      .get()
      .then(result => {
        this.doc = result.data();
      });
  },
  methods: {
    imgUpload() {
      const fileInfo = document.querySelector("#image").files[0];
      const storageRef = this.storage.ref();
      const updateUrl = storageRef.child("images/thumbnail/" + fileInfo.name);
      const uploadImg = updateUrl.put(fileInfo);

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

            this.db
              .collection("onlineclass")
              .doc(this.url)
              .update({
                thumbnail: url
              })
              .then(() => {})
              .catch(error => {
                console.log("error updateing document:", error);
              });
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
          classopen: false,
          price: 0
        })
        .then(() => {
          this.$router.push(`/creators/editclass2/${this.url}`);
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
.thumb_img_upload {
  width: 100%;
  label {
    margin: auto;
    cursor: pointer;
    p {
      padding: 10px;
      padding-top: 95px;
      width: 320px;
      height: 240px;
      text-align: center;
      margin: auto;
      box-sizing: border-box;
      background-image: url(~@/assets/imgs/PhotoPotrait.svg);
      background-size: contain;
      background-color: #eee;
      border-radius: 4px;
      cursor: pointer;
    }
    img {
      display: block;
      margin: auto;
      width: 320px;
      height: 240px;
      object-fit: cover;
      border-radius: 4px;
    }
  }
}
</style>
