<template>
  <div class="myclass_container">
    <div class="creators-left-side">
      <h5>클래스 관리</h5>
      <ul>
        <li>
          <router-link to="/creators/myclass">개설한 클래스 관리</router-link>
        </li>
      </ul>
    </div>
    <div class="card-body class_group">
      <div class="d-flex justify-content-between">
        <h4 class="p-2">개설한 클래스 관리</h4>
        <router-link class="p-2" to="/creators/createclass">
          + 새로운 클래스
        </router-link>
      </div>
      <!-- 개설된 클래스가 없을 경우 -->
      <div class="none_class" v-if="!classinfo">
        <h3>개설한 클래스가 없습니다.</h3>
      </div>
      <!-- 개설한 클래스 리스트 -->
      <div id="class_view">
        <div
          class="d-flex p-2 my-2 flex-row w-100 card-body border-0"
          style="height:200px;"
          v-for="list in classinfo"
          :key="list.id"
        >
          <div class="class_thumbnail me-2">
            <img
              src="@/assets/imgs/PhotoPotrait.svg"
              v-if="list.thumbnail === ''"
            />
            <img :src="list.thumbnail" v-if="list.thumbnail" />
          </div>
          <div
            class="class_info w-100 px-2 d-flex flex-column justify-content-between"
          >
            <ul>
              <li class="class-title">{{ list.title }}</li>
              <li class="class-category">
                <span class="badge bg-secondary">{{ list.type }}</span> ·
                <span class="badge bg-secondary">{{ list.category.c1 }}</span> ·
                <span class="badge bg-secondary">{{ list.category.c2 }}</span>
              </li>
              <li v-if="list.classopen">
                <span class="badge bg-info" style="margin:0;">
                  클래스 오픈
                </span>
              </li>
              <li v-if="!list.classopen">
                <span class="badge bg-secondary py-2" style="margin:0;">
                  오픈 준비중
                </span>
                <br />
                아직 클래스가 오픈되지 않았습니다. <br />
                추가 클래스 정보를 입력하고 클래스를 오픈하세요!
              </li>
            </ul>
            <router-link
              class="btn btn-outline-dark w-100 py-2"
              :to="`/creators/editclass1/${list.id}`"
              >클래스 관리 <font-awesome-icon :icon="['fas', 'cog']" />
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      classinfo: "",
      doc: "",
      db: this.$firebase.firestore()
    };
  },
  computed: {
    ...mapState(["user"])
  },
  mounted() {
    this.db
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
.myclass_container {
  max-width: 1000px;
  min-width: 800px;
  margin-top: 70px;

  .creators-left-side {
    position: fixed;
    z-index: 98;
    top: 57px;
    min-width: 240px;
    height: 100%;
    border-right: 1px solid $gray-1;
    box-sizing: border-box;
    padding: 10px;
    padding-top: 30px;
    background-color: #fcfcfc;

    ul {
      padding: 10px;
    }
  }
  .class_group {
    margin-left: 250px;
    margin-top: 10px;
    padding: 20px;
    border: 1px solid #eee;
    border-radius: 10px;

    .none_class {
      margin: 40px;
      text-align: center;
      color: $gray-2;
    }

    .class_thumbnail {
      margin: auto;
      max-width: 240px;
      img {
        max-width: 240px;
        max-height: 181px;
        border-radius: 4px;
      }
    }
    .class_info {
      .class-category {
        font-size: 0.75rem;
      }
      .class-title {
        font-weight: bold;
        font-size: 1.15rem;
      }
    }
  }
}
</style>
