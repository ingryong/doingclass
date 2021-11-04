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
      <h5>클래스 생성</h5>
      <ul>
        <li class="step">
          <router-link to="/creators/createclass"
            ><span>1</span> 클래스 기본정보</router-link
          >
        </li>
        <li class="step disable"><span>2</span> 클래스 소개</li>
        <li class="step disable"><span>3</span> 커리큘럼</li>
        <li class="step disable"><span>4</span> 크리에이터 소개</li>
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

    .step {
      height: 40px;
      align-items: center;
      align-content: center;
      line-height: 2rem;

      span {
        display: inline-block;
        width: 24px;
        height: 26px;
        border-radius: 4px;
        text-align: center;
        background: linear-gradient(145deg, #e6e6e6, #ffffff);
        box-shadow: 1px 1px 2px #e6e6e6, -1px -1px 2px #ffffff;
      }
    }
    .disable {
      color: $gray-3;
      cursor: default;
    }
  }
}
</style>
