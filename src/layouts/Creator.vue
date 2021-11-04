<template>
  <div>
    <div id="creators-nav">
      <div class="logo">
        <span>DOING</span>
        <span>CREATOR CENTER</span>
      </div>
      <div class="profile">
        <div>
          <img
            v-if="$store.state.user.photoURL"
            :src="$store.state.user.photoURL"
          />
          <a><i v-if="!$store.state.user.photoURL" class="fas fa-user"/></a>
        </div>
        <router-link to="/profile">
          {{ $store.state.user.displayName }}
        </router-link>
      </div>
    </div>
    <div id="creators-left-side">
      <ul>
        <li>크리에이터 정보</li>
      </ul>
      <h5>클래스 관리</h5>
      <ul>
        <li>
          <router-link to="/creators/myclass">내 클래스</router-link>
        </li>
      </ul>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Creators"
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
  height: 50px;
  background: #fff;
  font-weight: bold;
  border-bottom: 1px solid $gray-1;

  .logo {
    display: inline-block;
    margin: 14px;
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
