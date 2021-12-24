<template>
  <header>
    <div id="creators-nav">
      <div class="logo">
        <span>DOING</span>
        <span>CREATOR CENTER</span>
      </div>
      <div class="profile">
        <span class="creator_header_menu">
          <router-link to="/"> 학습페이지로 </router-link>
        </span>
        <span class="creator_header_menu">
          <div>
            <router-link to="/profile">
              <img
                v-if="$store.state.user.photoURL"
                :src="$store.state.user.photoURL"
              />
              <font-awesome-icon
                :icon="['fas', 'user']"
                v-if="!$store.state.user.photoURL"
              />
            </router-link>
          </div>
          <router-link to="/profile">
            {{ $store.state.user.displayName }}
          </router-link>
        </span>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "App",
  methods: {
    open_drawer() {
      document.getElementById("Drawer").style = "display: block;";
      document.getElementById("Drawer_Content").style = "display: block;";
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
