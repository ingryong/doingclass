<template>
  <div>
    <div id="learning-nav">
      <div class="logo">
        <span>Doing Class</span>
      </div>
      <div class="profile">
        <router-link to="/myclass">
          <span><i class="fas fa-book"></i> 내 클래스</span>
        </router-link>
        <div>
          <img
            v-if="$store.state.user.photoURL"
            :src="$store.state.user.photoURL"
          />
          <router-link to="/profile">
            <i v-if="!$store.state.user.photoURL" class="fas fa-user" />
          </router-link>
        </div>
        <router-link to="/profile">
          {{ $store.state.user.displayName }}
        </router-link>
      </div>
    </div>
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
export default {
  name: "Creators"
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
