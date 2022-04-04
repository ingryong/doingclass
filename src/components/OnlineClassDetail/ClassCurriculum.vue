<template>
  <div class="description_container">
    <h4>강의 커리큘럼</h4>
    <p>
      강의를 수강하게 되면 배울 수 있는 커리큘럼 입니다.
    </p>
    <div
      class="cur_container"
      v-for="(cur, cur_num) in curriculum"
      :key="cur_num"
    >
      <p class="cur_title">#{{ cur.cur_id }} {{ cur.chapter_name }}</p>
      <div class="mb-4 d-flex">
        <div class="col-3">
          <img class="cur_img" :src="cur.chapter_img" v-if="cur.chapter_img" />
          <img
            class="cur_none_img"
            :src="cur.chapter_img"
            v-if="!cur.chapter_img"
          />
        </div>
        <ul class="cur_study_container">
          <li v-for="(epi, epi_num) in episode" :key="epi_num">
            <span
              class="cur_study"
              v-if="epi.curriculum_id === cur.curriculum_id"
              >{{ epi.episode_name }}</span
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    curriculum: Array,
    episode: Array
  }
};
</script>

<style lang="scss">
.cur_container {
  padding-bottom: 10px;

  .cur_title {
    font-size: 1.1rem;
    font-weight: bolder;
    color: $cur-title-text;
    margin-bottom: 0px;
  }
  .cur_img {
    object-fit: cover;
    max-width: 220px;
    max-height: 300px;
    overflow: auto;
    border-radius: 4px;
  }
  .cur_none_img {
    background-size: contain;
    background-color: #ccc;
    max-width: 220px;
    height: 100px;
    overflow: auto;
    border-radius: 4px;
  }

  .cur_study_container {
    width: 100%;

    .cur_study {
      display: block;
      border: 1px solid $gray-2;
      padding: 10px 10px;
      margin: 0px 0px 5px 5px;
      border-radius: 4px;
      font-size: 0.9rem;
    }
  }
}
</style>
