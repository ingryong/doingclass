<template>
  <div>
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
      <!-- 왼쪽 사이드바 -->
      <div id="creators-left-side">
        <router-link class="backpage" :to="`/creators/myclass`"
          ><i class="fas fa-arrow-left"></i> 이전으로 돌아가기</router-link
        >

        <h5>클래스 기본 설정</h5>
        <ul>
          <li class="step">
            <router-link :to="`/creators/editclass1/${url}`">
              <span>1</span> 클래스 기본정보
            </router-link>
          </li>
          <li class="step">
            <router-link :to="`/creators/editclass2/${url}`">
              <span>2</span> 클래스 소개
            </router-link>
          </li>
          <li class="step">
            <router-link :to="`/creators/editclass3/${url}`">
              <span>3</span> 커리큘럼
            </router-link>
          </li>
          <li class="step">
            <router-link :to="`/creators/editclass4/${url}`">
              <span>4</span> 크리에이터 소개
            </router-link>
          </li>
        </ul>
        <h5>클래스 추가 설정</h5>
        <ul>
          <li class="step">
            <router-link :to="`/creators/othersetting/${url}`">
              추가 설정 관리
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Creators",
  data() {
    return {
      url: this.$route.params.id
    };
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
</style>
