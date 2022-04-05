<template>
  <div class="home_oclist">
    <h1 class="fs-3 mt-4">
      <i class="fas fa-book" style="color:#999;"></i>
      <strong> 온라인 클래스 </strong>
      <span class="fs-6">온라인 VOD 클래스</span>
    </h1>
    <div style="margin:auto;">
      <ul>
        <li v-for="list in openClassList" :key="list.id">
          <router-link :to="`/ocdetail/${list.id}`">
            <img :src="list.thumbnail" alt="온라인클래스 섬네일" />
            <div class="list_profile">
              <img :src="list.profile_img" alt="강사 프로필 사진" />
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
  </div>
</template>

<script>
export default {
  props: ["openClassList"]
};
</script>

<style lang="scss">
.home_oclist {
  @include content-area;
  padding: 30px 10px;
  margin-bottom: 30px;

  .none_class {
    margin: auto;
    margin-top: 50px;
    font-size: 1.35rem;
    color: $gray-2;
    text-align: center;
  }

  ul {
    @include content-area;
    padding-left: 0px;
    padding-right: 0px;
    display: flex;
    flex-wrap: wrap;

    li {
      width: 240px;
      margin: 4px;

      a {
        color: #222;
      }

      img {
        width: 240px;
        height: 180px;
        border-radius: 6px;
        object-fit: cover;
        background: $gray-2;
      }
      span {
        display: block;
        text-align: left;
      }
      p {
        display: flex;
        margin: 0px;
        padding-bottom: 10px;
      }
      .ctg {
        font-size: 0.7rem;
        margin: 0px 5px;
      }
      .tt {
        font-size: 0.95rem;
        margin: 0px 5px;
      }

      .list_profile {
        position: relative;
        margin-top: -50px;
        margin-bottom: 4px;
        display: flex;
        flex-direction: row;
        padding: 8px;
        background: black;
        background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9));
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;

        img {
          background: linear-gradient(#ccc, #aaa);
          width: 35px;
          height: 35px;
          object-fit: cover;
          object-position: top;
          border-radius: 50px;
          border: 2px solid #fff;
        }
        span {
          color: #fff;
          font-size: 0.8rem;
          font-weight: bold;
          align-items: center;
          margin: auto 0;
          padding-left: 4px;
        }
      }
    }
    li:hover {
      animation-name: scaleUp;
      animation-duration: 0.5s;
      animation-fill-mode: both;
    }
  }
}
</style>
