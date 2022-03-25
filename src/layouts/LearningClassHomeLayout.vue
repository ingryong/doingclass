<template>
  <div>
    <div id="learning-nav">
      <div class="logo">
        <router-link to="/"><span>Doing Class</span></router-link>
      </div>
      <div class="profile" @click="drop_down_menu">
        <router-link to="/myclass">
          <span
            ><font-awesome-icon :icon="['fas', 'book']"></font-awesome-icon> 내
            클래스</span
          >
        </router-link>
        <div class="profile_imgs">
          <img
            v-if="$store.state.user.photoURL"
            :src="$store.state.user.photoURL"
          />
          <a>
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
        <!-- 닉네임 클릭 후 뜨는 메뉴 -->
        <div class="profile_menu" id="drop_down_window">
          <ul>
            <li>
              <router-link to="/creators/myclass">
                크리에이터 센터
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
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Creators",
  data() {
    return {
      drop_down: false
    };
  },
  methods: {
    ...mapActions(["signOut"]),
    drop_down_menu() {
      if (this.drop_down === false) {
        document.getElementById("drop_down_window").style = "display : block;";
        this.drop_down = true;
      } else if (this.drop_down === true) {
        document.getElementById("drop_down_window").style = "display : none;";
        this.drop_down = false;
      }
    }
  }
};
</script>

<style lang="scss">
#learning-nav {
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
  font-weight: bold;
  border-bottom: 1px solid $gray-1;

  .logo {
    display: inline-block;
    margin: auto 14px;
    cursor: pointer;

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
    font-size: 0.9rem;
    color: #666;

    /* 프로필 클릭하면 나오는 메뉴 */
    .profile_menu {
      display: none;
      position: absolute;
      padding: 0px 10px;
      margin-left: 22px;
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
        }
      }
      li:hover {
        background-color: #eee;
        border-radius: 4px;
      }
    }

    span {
      color: #666;
      margin-right: 10px;
    }
    a {
      color: #666;
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
        color: #666;
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
  ul {
    padding: 10px;
  }
}
</style>
