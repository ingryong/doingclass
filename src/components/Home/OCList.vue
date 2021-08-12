<template>
<div id="home-oclist">
    <h1 class="ListTitle">온라인 클래스 <span class="sub_title">전문가들의 OnlineClass</span></h1>
    <ul>
        <li v-for="list in OnlineClass" :key="list.id">
        <img :src="list.리스트이미지"/>
        <span class="ctg">{{ list.카테고리1 }} | {{list.카테고리2}} </span>
        <span class="tt">{{ list.제목 }}</span>
        <p style="padding-block-start:0px;">
            <span v-if="list.태그1 === '수강가능'" class="tag-open">{{ list.태그1 }}</span>
            <span v-else-if="list.태그1 === '준비중'" class="tag-ready">{{ list.태그1 }}</span>
            <span v-else-if="list.태그1 === '모집종료'" class="tag-close">{{ list.태그1 }}</span>
            <span v-if="list.태그2 === '1:1코칭'" class="tag-coaching">{{list.태그2}}</span>
            <span v-if="list.태그3 === '준비물'" class="tag-goods">{{list.태그3}}</span>
        </p>
        </li>
    </ul>
</div>
</template>

<script>
import OnlineClass from '@/assets/data/onlineclass.js'

export default {
  data () {
    return {
      OnlineClass: OnlineClass
    }
  }
}
</script>

<style lang="scss">
#home-oclist{
  @include content-area;
  padding: 50px 10px;
  margin-bottom:30px;
  ul{
    @include content-area;
    padding-left:0px;
    padding-right:0px;
    display: grid;
    grid: '. . . .';
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-gap: 10px;

    li{

      img{
        width:100%;
        border-radius:6px;
      }
      span{
        display: block;
        text-align: left;
      }
      p{
        display: flex;
        margin:0px;
        padding-bottom:10px;
      }
      .ctg{
        font-size:0.7rem;
        margin: 0px 5px;
      }
      .tt{
        font-size:0.95rem;
        margin: 0px 5px;
      }
    }
  }
}
</style>
