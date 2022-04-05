<template>
  <nav class="navbar navbar-light bg-light fixed-top w-100">
    <!-- nav 상단 -->
    <div class="container-fluid">
      <!-- 로고이미지 -->
      <router-link class="navbar-brand" to="/">
        <img
          height="28"
          src="@/assets/imgs/logo_color.png"
          alt="Doingclass_logo"
        />
      </router-link>

      <!-- 로그인 전 -->
      <div class="nav_auth" v-if="user === null">
        <router-link class="nav-item" to="/login"> 로그인 </router-link>
        <router-link class="nav-item" to="/join"> 회원가입 </router-link>
      </div>

      <!-- 로그인 후 -->
      <div class="nav_auth" v-if="user !== null">
        <router-link to="/creators/myclass" v-if="windowWidth > 500">
          크리에이터 센터
        </router-link>
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

    <!-- nav 하단 -->
    <div class="container-fluid justify-content-start align-middle">
      <!-- 사이드바 -->
      <button
        class="navbar-toggler border-0"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div
        class="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasNavbar"
        aria-labelledby="offcanvasNavbarLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Doing Class</h5>
          <button
            type="button"
            class="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <ul class="navbar-nav justify-content-end flex-grow-1 pe-3">
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/">
                <font-awesome-icon
                  :icon="['fas', 'house']"
                  style="color:#999;"
                />
                Home
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/oclist">
                <font-awesome-icon
                  :icon="['fas', 'book']"
                  style="color:#999;"
                />
                온라인 클래스
              </router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/myclass">
                <font-awesome-icon
                  :icon="['fas', 'circle-play']"
                  style="color:#999;"
                />
                내 클래스
              </router-link>
            </li>
            <hr />
            <li class="nav-item">
              <router-link
                class="nav-link active"
                aria-current="page"
                to="/creators/myclass"
              >
                크리에이터 센터 이동하기 >
              </router-link>
            </li>
          </ul>
          <form class="d-flex">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button class="btn btn-outline-success" type="submit">
              Search
            </button>
          </form>
        </div>
      </div>
      <MenuList class="align-middle overflow-auto nav-menu" width="300" />
    </div>
  </nav>
</template>

<script>
import MenuList from "@/components/Navbar/MenuList.vue";
import { mapActions, mapState } from "vuex";
export default {
  name: "Navbar",
  data() {
    return {
      windowWidth: window.innerWidth
    };
  },
  components: {
    MenuList
  },
  computed: {
    ...mapState(["user"])
  },
  updated() {
    window.addEventListener("resize", this.setWidth);
  },
  destroyed() {
    // 반응형 너비 관련 코드
    window.removeEventListener("resize", this.setWidth);
  },
  methods: {
    ...mapActions(["signOut"]),
    // width 크기 실시간 구하기
    setWidth() {
      this.windowWidth = window.innerWidth;
    }
  }
};
</script>

<style lang="scss">
nav {
  background: white;
  .nav_auth {
    display: flex;
    align-items: center;
    a {
      font-size: 0.9rem;
      font-weight: 400;
      color: $gray-4;
    }
    span {
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
          padding-left: 1px;
          font-size: 1.9rem;
          color: white;
          text-align: center;
          border: none;
        }
      }
    }
    .dropdown-menu {
      margin-top: 12px;
      border-radius: 10px;
      text-align: center;
      right: 0;
    }
  }
  #nav_menu {
    a {
      color: #2c3e50;
    }
    a:hover {
      color: #000;
    }
  }
}
</style>
