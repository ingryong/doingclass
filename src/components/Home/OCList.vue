<template>
  <div id="home-oclist">
    <h1 class="ListTitle">
      온라인 클래스 <span class="sub_title">전문가들의 OnlineClass</span>
    </h1>
    <ul>
      <li v-for="list in OnlineClass" :key="list.id">
        <a :href="`/ocdetail/${list.id}`">
          <img :src="list.listimg" />
          <div
            class="list_profile"
            v-for="(profile, i) in list.creator_profile"
            :key="i"
          >
            <img :src="profile.img" />
            <span>{{ profile.cname }}</span>
          </div>
          <span class="ctg">{{ list.category1 }} | {{ list.category2 }} </span>
          <span class="tt">{{ list.title }}</span>
          <p style="padding-block-start:0px;">
            <span v-if="list.tag1 === '수강가능'" class="tag-open">{{
              list.tag1
            }}</span>
            <span v-else-if="list.tag1 === '준비중'" class="tag-ready">{{
              list.tag1
            }}</span>
            <span v-else-if="list.tag1 === '모집종료'" class="tag-close">{{
              list.tag1
            }}</span>
            <span v-if="list.tag2 === '1:1코칭'" class="tag-coaching">{{
              list.tag2
            }}</span>
            <span v-if="list.tag3 === '준비물'" class="tag-goods">{{
              list.tag3
            }}</span>
          </p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import OnlineClass from "@/assets/data/onlineclass.js";

export default {
  data() {
    return {
      OnlineClass: OnlineClass
    };
  }
};
</script>

<style lang="scss">
#home-oclist {
  @include content-area;
  padding: 50px 10px;
  margin-bottom: 30px;
  ul {
    @include content-area;
    padding-left: 0px;
    padding-right: 0px;
    display: grid;
    grid: ". . . .";
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 10px;

    li {
      .list_profile {
        position: relative;
        margin-top: -60px;
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
      a {
        color: #222;
      }

      img {
        width: 100%;
        border-radius: 6px;
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
    }
    li:hover {
      transform: scale(1.01);
    }
  }
}
</style>
