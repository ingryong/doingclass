<template>
  <div>
    <div class="oc_oclist">
      <h1 class="ListTitle">
        머니 클래스
        <p class="sub_title">들으면 돈이 되는 클래스</p>
      </h1>
      <ul>
        <li v-for="list in moneyClassList" :key="list.id">
          <router-link :to="`/ocdetail/${list.id}`">
            <img :src="list.thumbnail" />
            <div class="list_profile">
              <img :src="list.profile_img" />
              <span>{{ list.profile_name }}</span>
            </div>
            <span class="ctg"
              >{{ list.category.c1 }} | {{ list.category.c2 }}
            </span>
            <span class="tt">{{ list.title }}</span>
            <p style="padding-block-start:0px;">
              <span v-if="list.classopen" class="tag-open">수강 가능</span>
              <span v-else-if="!list.classopen" class="tag-ready">준비중</span>
              <span v-if="list.onoff === 'online'" class="tag-coaching"
                >온라인 강의</span
              >
              <span v-if="list.onoff === 'offline'" class="tag-coaching"
                >오프라인 강의</span
              >
            </p>
          </router-link>
        </li>
      </ul>
    </div>
    <div class="oc_oclist">
      <h1 class="ListTitle">
        커리어 클래스
        <p class="sub_title">각 분야별 전문가의 커리어 클래스</p>
      </h1>
      <ul>
        <li v-for="list in careerClassList" :key="list.id">
          <router-link :to="`/ocdetail/${list.id}`">
            <img :src="list.thumbnail" />
            <div class="list_profile">
              <img :src="list.profile_img" />
              <span>{{ list.profile_name }}</span>
            </div>
            <span class="ctg"
              >{{ list.category.c1 }} | {{ list.category.c2 }}
            </span>
            <span class="tt">{{ list.title }}</span>
            <p style="padding-block-start:0px;">
              <span v-if="list.classopen" class="tag-open">수강 가능</span>
              <span v-else-if="!list.classopen" class="tag-ready">준비중</span>
              <span v-if="list.onoff === 'online'" class="tag-coaching"
                >온라인 강의</span
              >
              <span v-if="list.onoff === 'offline'" class="tag-coaching"
                >오프라인 강의</span
              >
            </p>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      db: this.$firebase.firestore(),
      storage: this.$firebase.storage(),
      openClassList: "",
      moneyClassList: "",
      careerClassList: ""
    };
  },
  async mounted() {
    await this.db
      .collection("onlineclass")
      .where("classopen", "==", true)
      .onSnapshot(querySnapshot => {
        let allDatas = [];
        let money_data = [];
        let career_data = [];

        querySnapshot.forEach(doc => {
          allDatas.push(doc.data());
          this.openClassList = allDatas;

          if (doc.data().category.c1 === "money") {
            money_data.push(doc.data());
            this.moneyClassList = money_data;
          } else if (doc.data().category.c1 === "career") {
            career_data.push(doc.data());
            this.careerClassList = career_data;
          }
        });
      });
  }
};
</script>

<style lang="scss">
.oc_oclist {
  @include content-area;
  padding: 50px 10px;
  margin-bottom: 30px;
  ul {
    @include content-area;
    padding-left: 0px;
    padding-right: 0px;
    display: grid;
    grid: ". . . .";
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 10px;

    li {
      .list_profile {
        position: relative;
        margin-top: -60px;
        margin-bottom: 4px;
        display: flex;
        flex-direction: row;
        padding: 8px;
        background: black;
        background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9));
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;

        img {
          background: linear-gradient(#ccc, #aaa);
          width: 35px;
          height: 35px;
          object-fit: cover;
          object-position: top;
          border-radius: 50px;
          border: 2px solid #fff;
        }
        span {
          color: #fff;
          font-size: 0.8rem;
          font-weight: bold;
          align-items: center;
          margin: auto 0;
          padding-left: 4px;
        }
      }
      a {
        color: #222;
      }

      img {
        width: 288px;
        height: 217px;
        border-radius: 6px;
        object-fit: cover;
      }
      span {
        display: block;
        text-align: left;
      }
      p {
        display: flex;
        margin: 0px;
        padding-bottom: 10px;
      }
      .ctg {
        font-size: 0.7rem;
        margin: 0px 5px;
      }
      .tt {
        font-size: 0.95rem;
        margin: 0px 5px;
      }
    }
    li:hover {
      transform: scale(1.01);
    }
  }
}
</style>
