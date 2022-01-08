<template>
  <header>
    <div id="creators-nav">
      <div class="logo">
        <span>DOING</span>
        <span>CREATOR CENTER</span>
      </div>
      <div class="profile">
        <span class="creator_header_menu">
          <router-link to="/"> 학습 페이지로 </router-link>
        </span>
        <span class="creator_header_menu" @click="drop_down_menu">
          <div class="profile_imgs">
            <a>
              <img
                v-if="$store.state.user.photoURL"
                :src="$store.state.user.photoURL"
              />
              <font-awesome-icon
                :icon="['fas', 'user']"
                v-if="!$store.state.user.photoURL"
              />
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
        </span>
        <!-- 닉네임 클릭 후 뜨는 메뉴 -->
        <div
          class="profile_menu"
          id="drop_down_window"
          v-show="drop_down === true"
        >
          <ul>
            <li>
              <router-link to="/">
                학습 페이지로
              </router-link>
            </li>
            <li>
              <router-link to="/myclass">
                내 클래스
              </router-link>
            </li>
            <li>
              <router-link to="/profile">
                프로필 관리
              </router-link>
            </li>
            <hr />
            <li>
              <a @click="signOut()">
                로그아웃
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { getAuth, signOut } from "firebase/auth";
const auth = getAuth();

export default {
  name: "App",
  data() {
    return {
      drop_down: false
    };
  },
  methods: {
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
#creators-nav {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 99;
  width: 100%;
  height: 70px;
  background: #fff;
  border-bottom: 1px solid $gray-1;

  .logo {
    display: inline-block;
    font-weight: bold;
    margin: auto 14px;
    span {
      padding: 6px 8px;
      background-color: $black;
      color: white;
      margin: 2px;
      font-size: 0.8rem;
    }
  }
  .profile {
    margin: 14px;
    display: flex;
    flex-direction: row;
    align-items: center;
    font-weight: normal;

    /* 프로필 클릭하면 나오는 메뉴 */
    #drop_down_window {
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

        a {
          width: 100%;
          font-size: 0.9rem;
          font-weight: normal;
          color: #666;
        }
      }
      li:hover {
        background-color: #eee;
        border-radius: 4px;
      }
    }

    .creator_header_menu {
      display: flex;
      align-items: center;
      margin-left: 10px;
      font-size: 0.9rem;
      color: #666;
      a {
        color: #666;
        font-size: 0.9rem;
        font-weight: normal;
      }
      .profile_imgs {
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
}
</style>
