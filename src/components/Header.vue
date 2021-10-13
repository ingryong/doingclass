<template>
  <header>
    <div id="nav">
      <div class="nav_top">
        <div class="nav_top1">
          <router-link to="/"
            ><img class="nav_logo" src="@/assets/imgs/logo_color.png"
          /></router-link>
        </div>

        <!-- 서치바 -->
        <div class="nav_top2">
          <input type="text" placeholder="배우고 싶은 것이 있나요?" /><i
            class="fas fa-search"
          ></i>
        </div>

        <!-- 로그인 / 로그아웃 -->
        <div class="nav_top3" v-if="$store.state.user === null">
          <router-link to="/login"> 로그인 </router-link>
          <router-link to="/join"> 회원가입 </router-link>
        </div>
        <div class="nav_top3" v-if="$store.state.user !== null">
          <router-link to="/creators/myclass">크리에이터 센터</router-link>
          <div>
            <img
              v-if="$store.state.user.phothURL"
              :src="$store.state.user.phothURL"
            />
            <a><i v-if="!$store.state.user.phothURL" class="fas fa-user"/></a>
          </div>
          <router-link to="/profile">
            {{ $store.state.user.displayName }}
          </router-link>
        </div>
      </div>

      <!-- 하단메뉴 -->
      <div class="nav_btm">
        <div class="nav_btm1">
          <a @click="open_drawer"><i class="fas fa-bars"></i></a>
        </div>
        <div class="nav_btm2">
          <MenuList />
        </div>
      </div>
    </div>
    <div class="top_blank" style="width:100%; height:110px;"></div>
  </header>
</template>

<script>
import MenuList from "@/components/MenuList.vue";

export default {
  name: "App",
  data() {
    return {
      drawer: false
    };
  },
  components: {
    MenuList
  },
  methods: {
    open_drawer() {
      document.getElementById("Drawer").style = "display: block;";
      document.getElementById("Drawer_Content").style = "display: block;";
    }
  }
};
</script>

<style lang="scss">
#nav {
  position: fixed;
  z-index: 99;
  width: 100%;
  height: 110px;
  background: #fff;
  font-weight: bold;
  box-shadow: 0 0 4px $black;

  /* 네비게이션 첫번째 줄 */
  .nav_top {
    display: flex;
    max-width: 1200px;
    margin: auto;
    justify-content: space-between;
    align-items: center;
    height: 70px;
    padding: 0px 14px;

    .nav_top2 {
      min-width: 280px;
      height: 26px;
      border-bottom: 1px solid $gray-2;

      input {
        width: 250px;
        border: none;
      }
    }

    .nav_top3 {
      max-width: 240px;
      display: flex;
      align-items: center;
      a {
        font-size: 0.9rem;
        font-weight: 400;
        color: $gray-4;
      }
      a:first-child {
        margin-right: 10px;
      }
      div {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 6px;
        background-color: $gray-4;
        img {
          width: 30px;
          height: 30px;
          object-fit: cover;
          object-position: center;
          border: 0px;
        }
        a {
          svg {
            padding-top: 2px;
            padding-left: 2.5px;
            font-size: 1.8rem;
            color: white;
            text-align: center;
          }
        }
      }
    }
  }

  /* 네비게이션 두번째 줄 */
  .nav_btm {
    display: flex;
    align-items: center;
    max-width: 1200px;
    margin: auto;
    height: 30px;
    padding: 0px 14px;

    .nav_btm1 {
      a {
        font-size: 1.2rem;
        margin-right: 10px;
      }
    }
  }
}
</style>
