<template>
  <div>
    <!-- 머니클래스 -->
    <MoneyList :moneyClassList="moneyClassList"></MoneyList>
    <!-- 커리어클래스 -->
    <CareerList :careerClassList="careerClassList"></CareerList>
    <!-- 취미클래스 -->
    <HobbyList :hobbyClassList="hobbyClassList"></HobbyList>
    <!-- 건강클래스 -->
    <HealthList :healthClassList="healthClassList"></HealthList>
  </div>
</template>

<script>
import MoneyList from "@/components/OnlineClass/MoneyList";
import CareerList from "@/components/OnlineClass/careerList";
import HobbyList from "@/components/OnlineClass/HobbyList";
import HealthList from "@/components/OnlineClass/HealthList";

export default {
  components: {
    MoneyList,
    CareerList,
    HobbyList,
    HealthList
  },
  data() {
    return {
      db: this.$firebase.firestore(),
      storage: this.$firebase.storage(),
      openClassList: [],
      moneyClassList: [],
      careerClassList: [],
      hobbyClassList: [],
      healthClassList: []
    };
  },
  created() {
    this.db
      .collection("onlineclass")
      .where("classopen", "==", true)
      .onSnapshot(querySnapshot => {
        let allDatas = [];
        let money_data = [];
        let career_data = [];
        let hobby_data = [];
        let health_data = [];

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
          } else if (doc.data().category.c1 === "health") {
            health_data.push(doc.data());
            this.healthClassList = health_data;
          }
        });
      });
  }
};
</script>

<style lang="scss">
.oc_oclist {
  max-width: 1200px;
  min-width: 800px;
  margin: auto;
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
        margin-top: -50px;
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

@media (max-width: 680px) {
  .oc_oclist {
    width: 100%;
    max-width: 100%;
    min-width: 100%;

    ul {
      width: 100%;
      max-width: 100%;
      min-width: 100%;
      grid: ". .";
      grid-template-columns: 1fr 1fr;
      margin: auto;
    }
  }
}
</style>
