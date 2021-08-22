<template>
  <div>
    <div class="detail_title_banner" style="background-color:url('${OnlineClass[$route.params.id - 1 ].bgimg}')">
      <ul>
        <li>
          <img :src="OnlineClass[$route.params.id - 1 ].listimg"/>
        </li>
        <li>
          <span>{{ OnlineClass[$route.params.id - 1 ].title }}</span>
          <span></span>
          <span></span>
        </li>
      </ul>
    </div>
    <div class="detail_container">
      <div class="left_container">
        <p class="class_info">
        <strong>클래스 정보</strong><br/>
        <span>수강가능 <span class="values">{{ OnlineClass[$route.params.id - 1 ].tag1 }}</span></span>
        </p>
        <hr/>
        <img :src="OnlineClass[$route.params.id - 1 ].posterimg"/>
      </div>
      <div class="right_container">
        <div class="float_window">
          <p class="window_category">
            <span>{{ OnlineClass[$route.params.id - 1 ].category1 }} | {{ OnlineClass[$route.params.id - 1 ].category2 }}</span>
          </p>
          <p class="window_title">{{ OnlineClass[$route.params.id - 1 ].title }}<br>
            <span v-if="OnlineClass[$route.params.id - 1 ].tag1 === '수강가능'" class="tag-open">{{ OnlineClass[$route.params.id - 1 ].tag1 }}</span>
            <span v-else-if="OnlineClass[$route.params.id - 1 ].tag1 === '준비중'" class="tag-ready">{{ OnlineClass[$route.params.id - 1 ].tag1 }}</span>
            <span v-else-if="OnlineClass[$route.params.id - 1 ].tag1 === '모집종료'" class="tag-close">{{ OnlineClass[$route.params.id - 1 ].tag1 }}</span>
            <span v-if="OnlineClass[$route.params.id - 1 ].tag2 === '1:1코칭'" class="tag-coaching">{{OnlineClass[$route.params.id - 1 ].tag2}}</span>
            <span v-if="OnlineClass[$route.params.id - 1 ].tag3 === '준비물'" class="tag-goods">{{OnlineClass[$route.params.id - 1 ].tag3}}</span>
        </p>
        <p class="detail_price">
          <span><s>{{ OnlineClass[$route.params.id - 1 ].price*1.3|comma }}원</s> → {{ OnlineClass[$route.params.id - 1 ].price|comma }}원</span><br>
          <span><strong>월 {{ OnlineClass[$route.params.id - 1 ].price/3|comma }}원</strong> (3개월 할부)</span>
        </p>
        <p class="detail_learningdays">
          <span>수강기간</span>
          <span>구매 후 {{ OnlineClass[$route.params.id - 1 ].learningdays }}일간 무제한 수강</span>
        </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OnlineClass from '@/assets/data/onlineclass.js'

export default {
  data () {
    return {
      OnlineClass: OnlineClass
    }
  },
  filters: {
    comma: function (val) {
      var num = Number(val)
      return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
    }
  }
}
</script>

<style lang="scss">
.detail_title_banner{
  width:100%;
  height:400px;
  background:teal;
  ul{
    margin:0;
    padding-top:20px;
    img{
      width:400px;
    }
  }
}
.detail_container{
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  width:1200px;
  margin:auto;
  text-align: left;

  .left_container{
    width:850px;

    img{
      margin: auto;
    }

    .class_info{
      font-size:0.9rem;
      strong{
        font-size:1rem;
      }
      .values{
        color:$gray-3;
      }
    }
  }
  .right_container{
    width:330px;

    .float_window{
      z-index: 100;
      border:1px solid $gray-1;
      padding:10px 10px;
      margin-top:10px;
      font-size:0.9rem;

      .window_category{
        font-size:0.8rem;
        margin:0;
      }
      .window_title{
        font-size:1.1rem;
        font-weight: bold;
        margin:0;

        span{
          margin-left:0;
          margin-right:5px;
        }
      }
      .detail_price{
        text-align-last: right;
        strong{
          font-size:1.1rem;
        }
      }
      .detail_learningdays{
        font-size:0.8rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
      }
    }
  }
}
</style>
