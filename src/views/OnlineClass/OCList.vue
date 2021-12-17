<template>
  <div>
    <!-- 머니클래스 -->
    <div class="oc_oclist">
      <p class="listTitle">
        <span class="title">
          <font-awesome-icon :icon="['fas', 'coins']" style="color:#999;" />
          머니 클래스
        </span>
        <span class="sub_title">들으면 돈이 되는 클래스</span>
      </p>
      <!-- 해당 클래스에 등록된 클래스가 없을 경우 -->
      <div class="none_class" v-if="!moneyClassList">
        <h3>등록된 클래스가 없습니다.</h3>
      </div>
      <!-- 클래스 리스트 -->
      <ul>
        <li v-for="list in moneyClassList" :key="list.id">
          <router-link :to="`/ocdetail/${list.id}`">
            <img class="list_sumbnail" :src="list.thumbnail" />
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
    <!-- 커리어클래스 -->
    <div class="oc_oclist">
      <p class="listTitle">
        <span class="title">
          <font-awesome-icon :icon="['fas', 'briefcase']" style="color:#999;" />
          커리어 클래스
        </span>
        <span class="sub_title">각 분야별 전문가의 커리어 클래스</span>
      </p>
      <!-- 해당 클래스에 등록된 클래스가 없을 경우 -->
      <div class="none_class" v-if="!careerClassList">
        <h3>등록된 클래스가 없습니다.</h3>
      </div>
      <!-- 클래스 리스트 -->
      <ul>
        <li v-for="list in careerClassList" :key="list.id">
          <router-link :to="`/ocdetail/${list.id}`">
            <img class="list_sumbnail" :src="list.thumbnail" />
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
    <!-- 취미클래스 -->
    <div class="oc_oclist">
      <p class="listTitle">
        <span class="title">
          <font-awesome-icon :icon="['fas', 'palette']" style="color:#999;" />
          취미 클래스
        </span>
        <span class="sub_title">삶의 질을 높이는 취미 클래스</span>
      </p>
      <!-- 해당 클래스에 등록된 클래스가 없을 경우 -->
      <div class="none_class" v-if="!hobbyClassList">
        <h3>등록된 클래스가 없습니다.</h3>
      </div>
      <!-- 클래스 리스트 -->
      <ul>
        <li v-for="list in hobbyClassList" :key="list.id">
          <router-link :to="`/ocdetail/${list.id}`">
            <img class="list_sumbnail" :src="list.thumbnail" />
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
    <!-- 건강클래스 -->
    <div class="oc_oclist">
      <p class="listTitle">
        <span class="title">
          <font-awesome-icon :icon="['fas', 'running']" style="color:#999;" />
          건강 클래스
        </span>
        <span class="sub_title">튼튼한 내 몸을 위한 건강 클래스</span>
      </p>
      <!-- 해당 클래스에 등록된 클래스가 없을 경우 -->
      <div class="none_class" v-if="!healtyClassList">
        <h3>등록된 클래스가 없습니다.</h3>
      </div>
      <!-- 클래스 리스트 -->
      <ul>
        <li v-for="list in healtyClassList" :key="list.id">
          <router-link :to="`/ocdetail/${list.id}`">
            <img class="list_sumbnail" :src="list.thumbnail" />
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
      careerClassList: "",
      hobbyClassList: "",
      healtyClassList: ""
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
        let hobby_data = [];
        let healty_data = [];

        querySnapshot.forEach(doc => {
          allDatas.push(doc.data());
          this.openClassList = allDatas;

          if (doc.data().category.c1 === "money") {
            money_data.push(doc.data());
            this.moneyClassList = money_data;
          } else if (doc.data().category.c1 === "career") {
            career_data.push(doc.data());
            this.careerClassList = career_data;
          } else if (doc.data().category.c1 === "hobby") {
            hobby_data.push(doc.data());
            this.hobbyClassList = hobby_data;
          } else if (doc.data().category.c1 === "healty") {
            healty_data.push(doc.data());
            this.healtyClassList = healty_data;
          }
        });
      });
  }
};
</script>

<style lang="scss">
.oc_oclist {
  @include content-area;
  padding: 30px 10px;
  margin-bottom: 30px;

  .listTitle {
    .title {
      font-size: 1.5rem;
      font-weight: bold;
    }
    .sub_title {
      font-size: 0.9rem;
    }
  }
  .none_class {
    margin: auto;
    margin-top: 50px;
    font-size: 1.35rem;
    color: $gray-2;
    text-align: center;
  }

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
        width: 100%;
        height: 72%;
        border-radius: 6px;
        object-fit: cover;
        background: $gray-2;
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
      animation-name: scaleUp;
      animation-duration: 0.5s;
      animation-fill-mode: both;
    }
  }
}
</style>
