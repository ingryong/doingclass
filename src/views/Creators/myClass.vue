<template>
  <div class="container">
    <div class="class-group">
      <h4>개설한 클래스</h4>
      <router-link to="/creators/createclass">+ 새로운 클래스</router-link>
      <hr />
      <div id="class-view">
        <div class="class-list" v-for="list in classinfo" :key="list.id">
          <div class="class_thumbnail">
            <img
              src="@/assets/imgs/PhotoPotrait.svg"
              v-if="list.thumbnail === ''"
            />
            <img :src="list.thumbnail" v-if="list.thumbnail" />
          </div>
          <div class="class_info">
            <ul>
              <li>
                <span>{{ list.type }}</span> ·
                <span>{{ list.category.c1 }}</span> ·
                <span>{{ list.category.c2 }}</span>
              </li>
              <li class="title">{{ list.title }}</li>
              <li v-if="list.classopen">
                <span class="tag-open" style="margin:0;">클래스 오픈</span
                ><br /><br />클래스가 오픈중입니다.
              </li>
              <li v-if="!list.classopen">
                <span class="tag-ready" style="margin:0;">오픈 준비중</span
                ><br /><br />아직 클래스가 오픈되지 않았습니다.<br />추가 클래스
                정보를 입력하고 클래스를 오픈하세요!
              </li>
            </ul>
            <router-link
              class="btn-l btn-gray"
              :to="`/creators/editclass1/${list.id}`"
              style="text-align:center; color:#000; border-radius:4px;"
              >클래스 관리</router-link
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: this.$store.state.user,
      db: this.$firebase.firestore(),
      classinfo: "",
      doc: ""
    };
  },
  async mounted() {
    await this.db
      .collection("onlineclass")
      .where("creator_uid", "==", this.user.uid)
      .get()
      .then(result => {
        let allDatas = [];
        result.forEach(doc => {
          allDatas.push(doc.data());
          this.classinfo = allDatas;
          this.doc = doc;
        });
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

  .class-group {
    width: 100%;
    border: 1px solid #eee;
    border-radius: 10px;
    box-sizing: border-box;

    h4 {
      box-sizing: border-box;
      padding: 20px;
      border: none;
      display: inline-block;
    }

    hr {
      background-color: #eee;
      height: 1px;
      border: none;
      margin-top: 0;
    }

    a {
      display: inline-block;
      font-size: 0.9rem;
      font-weight: bold;
      color: $gray-3;
      text-align: right;
    }

    .class-list {
      display: flex;
      flex-direction: row;

      .class_thumbnail {
        margin: 10px;
        width: 240px;
        img {
          width: 240px;
          height: 181px;
          border-radius: 4px;
        }
      }
      .class_info {
        margin: 0px 10px 10px auto;
        width: 400px;
        .title {
          font-weight: bold;
          font-size: 1.15rem;
        }
      }
    }
  }
}
</style>
