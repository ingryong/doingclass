<template>
  <div class="oc_oclist">
    <p class="listTitle">
      <span class="title">
        <font-awesome-icon :icon="['fas', 'briefcase']" style="color:#999;" />
        커리어 클래스
      </span>
      <span class="sub_title">각 분야별 전문가의 커리어 클래스</span>
    </p>
    <!-- 해당 클래스에 등록된 클래스가 없을 경우 -->
    <div class="none_class" v-if="!careerClassList">
      <h3>등록된 클래스가 없습니다.</h3>
    </div>
    <!-- 클래스 리스트 -->
    <ul>
      <li v-for="list in careerClassList" :key="list.id">
        <router-link :to="`/ocdetail/${list.id}`">
          <img class="list_sumbnail" :src="list.thumbnail" />
          <div class="list_profile">
            <img :src="list.profile_img" />
            <span>{{ list.profile_name }}</span>
          </div>
          <span class="ctg"
            >{{ list.category.c1 }} | {{ list.category.c2 }}
          </span>
          <span class="tt">{{ list.title }}</span>
          <p style="padding-block-start:0px;">
            <span v-if="list.classopen" class="tag-open">수강 가능</span>
            <span v-else-if="!list.classopen" class="tag-ready">준비중</span>
            <span v-if="list.onoff === 'online'" class="tag-coaching"
              >온라인 강의</span
            >
            <span v-if="list.onoff === 'offline'" class="tag-coaching"
              >오프라인 강의</span
            >
          </p>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: ["careerClassList"]
};
</script>
