<template>
  <div class="create_container">
    <div class="notice_card">
      <h3>나의 클래스 개설하기</h3>
      <p>
        클래스 개설하기에 앞서 만드시려는 클래스의 기본적인 정보를
        알려주세요.<br />
        [저장하기]버튼을 누르면 모든 수정 사항은 즉시 반영되어 보여집니다.
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
        maxlength="35"
      />
    </div>

    <div class="input_group">
      <h4>썸네일 이미지 업로드</h4>
      <p>
        썸네일 이미지는
        <strong>글자가 삽입되지 않은 4:3 비율의 이미지</strong>에 최적화되어
        있습니다. <br />비율에 맞게 이미지를 업로드 하셔야 정상적으로 보입니다.
      </p>
      <div class="class_thumbnail">
        <label for="image">
          <img src="@/assets/imgs/PhotoPotrait.svg" v-if="thumbnail === ''" />
        </label>
        <img :src="thumbnail" v-if="thumbnail" />
      </div>
      <input
        class="form-control m-1"
        type="file"
        accept="image/*"
        v-show="false"
        @change="imgUpload"
        id="image"
      />
    </div>

    <div class="input_group">
      <h4>클래스 타입</h4>
      <select id="classtype" name="classtype" class="form-control m-1">
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
      >
        <option value="" disabled selected hidden
          >1차 카테고리를 선택해주세요</option
        >
        <option value="money">머니 클래스</option>
        <option value="career">커리어 클래스</option>
        <option value="health">건강 클래스</option>
        <option value="hobby">취미 클래스</option>
      </select>
      <p>2차 카테고리</p>
      <input
        type="text"
        class="form-control m-1"
        id="classcategory2"
        placeholder="최대 6글자까지 입력 가능합니다. (예)DIY, 책읽기, 다이어트"
        maxlength="6"
      />
    </div>

    <div class="input_group onoff-group" id="onoff-group">
      <h4>온라인 / 오프라인</h4>
      <select id="onoff" name="onoff" class="form-control m-1">
        <option value="online">온라인만 진행</option>
      </select>
    </div>

    <div class="input_group">
      <h4>클래스 난이도</h4>
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

    <router-link tag="button" class="btn-m btn-gray m-1" to="/creators/myclass">
      돌아가기
    </router-link>
    <button class="btn-m btn-blue m-1" id="send" @click="upload()">
      클래스 기본정보 저장
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      db: this.$firebase.firestore(),
      storage: this.$firebase.storage(),
      user: this.$store.state.user,
      thumbnail: ""
    };
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
          });
        }
      );

      console.log(fileInfo);
      this.thumbnail = fileInfo;
    },
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
            c1: document.getElementById("classcategory1").value,
            c2: document.getElementById("classcategory2").value
          },
          type: document.getElementById("classtype").value,
          onoff: document.getElementById("onoff").value,
          level: document.getElementById("level").value,
          thumbnail: this.thumbnail,
          classopen: false,
          first_episode: "",
          users: 0,
          price: 0,
          class_dec: {
            dec1: {
              title: "",
              dec: "",
              img: ""
            },
            dec2: {
              title: "",
              dec: "",
              img: ""
            },
            dec3: {
              title: "",
              dec: "",
              img: ""
            }
          },
          header_img: {
            header_img1: "",
            header_img2: "",
            header_img3: "",
            header_img4: ""
          }
        })
        .then(async docRef => {
          await this.db
            .collection("onlineclass")
            .doc(docRef.id)
            .update({ id: docRef.id });
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
.create_container {
  max-width: 700px;
  padding: 10px;
  margin-left: 240px;
  margin-top: 70px;

  .notice_card {
    width: 100%;
    border: 1px solid #eee;
    box-sizing: border-box;
    padding: 15px;
  }

  .input_group {
    padding: 20px 0px;

    h4 {
      font-size: 1rem;
      margin: auto;
      text-align: left;
      padding-left: 10px;
      font-weight: normal;
      border-left: 3px solid $mint;
    }
    p {
      font-size: 0.85rem;
    }

    .class_thumbnail {
      margin: 10px;
      img {
        width: 240px;
        height: 180px;
        object-fit: fill;
        border-radius: 8px;
        background-color: $gray-3;
      }
    }

    .cur_header {
      display: flex;
      justify-content: space-between;
      h4 {
        margin-left: 4px;
      }
    }
    .cur_container {
      display: flex;
      .cur_left {
        margin-right: 10px;
        .check_img {
          p {
            padding: 10px;
            padding-top: 25px;
            width: 160px;
            height: 90px;
            font-size: 0.95rem;
            text-align: center;
            margin: 10px 4px;
            box-sizing: border-box;
            background-color: #eee;
            border-radius: 4px;
          }
          img {
            margin: 10px 4px;
            width: 160px;
            height: 90px;
            object-fit: cover;
            border-radius: 4px;
          }
        }
      }
      .cur_right {
        ul {
          li {
            a {
              line-height: 1.5rem;
            }
          }
        }
      }
    }
  }

  .form-control {
    display: block;
    width: 100%;
    min-height: 2rem;
    padding: 12px 6px;
    box-sizing: border-box;
    border: none;
    border-bottom: 1px solid #ccc;
    &-text-area {
      display: block;
      width: 100%;
      min-height: 2rem;
      padding: 12px 6px;
      box-sizing: border-box;
      border: 1px solid #ccc;
    }
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
  .imgs {
    width: 100px;
    height: auto;
  }
}
</style>
