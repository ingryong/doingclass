<template>
  <nav class="navbar navbar-light bg-light fixed-top">
    <div class="container-fluid">
      <!-- nav 좌측 로고이미지 -->
      <div class="navbar-brand brand-border">
        <span>DOING</span>
        <span>CREATOR CENTER</span>
      </div>
      <!-- nav 우측 유저&학습페이지 이동 -->
      <div class="nav_auth">
        <router-link to="/"> 학습 페이지로 </router-link>
        <div class="profile_img_circle">
          <a>
            <img v-if="user.photoURL" :src="user.photoURL" />
            <a>
              <font-awesome-icon
                v-if="!user.photoURL"
                :icon="['fas', 'user']"
              />
            </a>
          </a>
        </div>
        <span class="dropdown" style="text-align:center;">
          <a
            class=" dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            {{ user.displayName }}
          </a>
          <ul
            class="dropdown-menu"
            aria-labelledby="navbarDropdown"
            style="left:unset; margin-top: 12px;"
          >
            <li>
              <router-link class="dropdown-item" to="/creators/myclass">
                크리에이터 센터
              </router-link>
            </li>
            <li>
              <router-link class="dropdown-item" to="/myclass">
                내 클래스
              </router-link>
            </li>
            <li>
              <router-link class="dropdown-item" to="/profile">
                프로필관리
              </router-link>
            </li>
            <li><hr class="dropdown-divider" /></li>
            <li><a class="dropdown-item" @click="signOut()">로그아웃</a></li>
          </ul>
        </span>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "App",
  computed: {
    ...mapState(["user"])
  },
  methods: {
    ...mapActions(["signOut"])
  }
};
</script>

<style lang="scss">
nav {
  .brand-border {
    display: inline-block;
    font-weight: bold;
    margin: auto 14px;
    margin-bottom: 2px;
    span {
      padding: 6px 8px;
      background-color: $black;
      color: white;
      margin: 2px;
      font-size: 0.8rem;
    }
  }
}
</style>
