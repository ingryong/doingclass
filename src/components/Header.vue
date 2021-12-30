<template>
  <header>
    <div id="nav">
      <div class="nav_top">
        <div class="nav_top1">
          <router-link to="/">
            <img class="nav_logo" src="@/assets/imgs/logo_color.png" />
          </router-link>
        </div>

        <!-- 서치바 -->
        <div class="nav_top2" style="display:none;">
          <input type="text" placeholder="배우고 싶은 것이 있나요?" /><i
            class="fas fa-search"
          ></i>
        </div>

        <!-- 로그인 전 -->
        <div class="nav_top3" v-if="$store.state.user === null">
          <router-link to="/login"> 로그인 </router-link>
          <router-link to="/join"> 회원가입 </router-link>
        </div>

        <!-- 로그인 후 -->
        <div
          class="nav_top3"
          v-if="$store.state.user !== null"
          @click="drop_down_menu"
        >
          <router-link to="/creators/myclass"> 크리에이터 센터 </router-link>
          <div class="profile_img_circle">
            <a>
              <img
                v-if="$store.state.user.photoURL"
                :src="$store.state.user.photoURL"
              />
              <a>
                <font-awesome-icon
                  v-if="!$store.state.user.photoURL"
                  :icon="['fas', 'user']"
                />
              </a>
            </a>
          </div>
          <a style="text-align:center;">
            {{ $store.state.user.displayName }}
            <font-awesome-icon
              :icon="['fas', 'caret-down']"
              v-show="drop_down === false"
            />
            <font-awesome-icon
              :icon="['fas', 'caret-up']"
              v-show="drop_down === true"
            />
          </a>

          <!-- 닉네임 클릭 후 뜨는 메뉴 -->
          <div class="profile_menu" id="drop_down_window">
            <ul>
              <li>
                <router-link to="/creators/myclass"
                  >크리에이터 센터</router-link
                >
              </li>
              <li>
                <router-link to="/myclass">
                  내 클래스
                </router-link>
              </li>
              <li>
                <router-link to="/profile">프로필 관리</router-link>
              </li>
              <hr />
              <li>
                <a @click="signOut()">로그아웃</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <!-- 하단메뉴 -->
      <div class="nav_btm">
        <div class="nav_btm1">
          <a @click="open_drawer">
            <font-awesome-icon :icon="['fas', 'bars']"></font-awesome-icon
          ></a>
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
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth();

export default {
  name: "App",
  data() {
    return {
      drawer: false,
      drop_down: false
    };
  },
  components: {
    MenuList
  },
  methods: {
    open_drawer() {
      document.getElementById("Drawer").style = "display: block;";
      document.getElementById("Drawer_Content").style = "display: block;";
    },
    drop_down_menu() {
      if (this.drop_down === false) {
        document.getElementById("drop_down_window").style = "display : block;";
        this.drop_down = true;
      } else if (this.drop_down === true) {
        document.getElementById("drop_down_window").style = "display : none;";
        this.drop_down = false;
      }
    },
    signOut() {
      signOut(auth)
        .then(() => {
          // sign-out successful
          this.$router.replace("/");
        })
        .catch(error => {
          // an error happened
          console.log(error);
        });
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
      max-width: 270px;
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
      a:nth-child(2) {
        margin-right: 10px;
      }
      .profile_img_circle {
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
          background-color: white;
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

  /* 프로필 클릭하면 나오는 메뉴 */
  .profile_menu {
    display: none;
    position: absolute;
    padding: 0px 10px;
    margin-left: 40px;
    top: 54px;
    width: 150px;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 10px;

    li {
      padding: 4px 0px;
      text-align: center;
    }
    li:hover {
      background-color: #eee;
      border-radius: 4px;
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

@media (max-width: 680px) {
  #nav {
    .nav_top {
      width: 100%;
      max-width: 100% !important;
      height: 70px;
      padding: 0px 10px;

      .nav_logo {
        height: 26px;
      }
    }
    .nav_btm {
      width: 100%;
      max-width: 100 !important;
      height: 30px;
      padding: 0px 14px;

      #nav_menu {
        margin-left: 0;
      }
    }

    /* 프로필 클릭하면 나오는 메뉴 */
    .profile_menu {
      right: 10px;
    }
  }
}
</style>
