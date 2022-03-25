<template>
  <div>
    <div>
      <CreatorNavbar></CreatorNavbar>
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
    <router-view :key="$route.fullPath" />
  </div>
</template>

<script>
import CreatorNavbar from "@/components/Navbar/CreatorNavbar.vue";

export default {
  name: "Creators",
  data() {
    return {
      url: this.$route.params.id
    };
  },
  components: {
    CreatorNavbar
  }
};
</script>
