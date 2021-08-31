<template>
  <section>
    <!-- 상단 타이틀 배너 컨테이너 -->
    <header class="title_container">
      <div class="detail_title_banner">
        <div class="banner_left">
          <img :src="OnlineClass[$route.params.id - 1 ].detail_banner_img1"/>
        </div>
        <div class="banner_right_top">
          <img :src="OnlineClass[$route.params.id - 1 ].detail_banner_img2"/>
        </div>
        <div class="banner_right_bottom1">
          <img :src="OnlineClass[$route.params.id - 1 ].detail_banner_img3"/>
        </div>
        <div class="banner_right_bottom2">
          <img :src="OnlineClass[$route.params.id - 1 ].detail_banner_img4"/>
        </div>
      </div>
    </header>
    <article class="detail_container" style="padding:0px 8px;">
      <!-- 메인 컨텐츠 컨테이너 -->
      <div class="left_container">
        <p class="class_info">
        <strong>클래스 정보</strong><br/>
        <span>수강가능 <span class="values">{{ OnlineClass[$route.params.id - 1 ].tag1 }}</span></span>
        </p>
        <hr/>
        <blank></blank>
        <img :src="OnlineClass[$route.params.id - 1 ].posterimg"/>
        <div class="description_container" v-if="OnlineClass[$route.params.id - 1 ].detail_description1 !== ''">
          <h4>| 이런 걸 배울 거에요</h4>
          <p v-html="OnlineClass[$route.params.id - 1 ].detail_description1"></p>
          <hr/>
        </div>
        <div class="description_container" v-if="OnlineClass[$route.params.id - 1 ].detail_description2 !== ''">
          <h4>| 클래스의 장점</h4>
          <p v-html="OnlineClass[$route.params.id - 1 ].detail_description2"></p>
          <hr/>
        </div>
        <div class="description_container" v-if="OnlineClass[$route.params.id - 1 ].detail_description3 !== ''">
          <h4>| 이 클래스를 끝내면 무엇을 할 수 있게 되나요?</h4>
          <p v-html="OnlineClass[$route.params.id - 1 ].detail_description3"></p>
          <hr/>
        </div>
        <div class="description_container" v-if="OnlineClass[$route.params.id - 1 ].detail_description4 !== ''">
          <h4>| 이런분들께 이 강좌를 추천합니다</h4>
          <p v-html="OnlineClass[$route.params.id - 1 ].detail_description4" style="margin-bottom:50px; padding:20px; background-color:#fbfbfb;"></p>
          <hr/>
        </div>
        <div class="description_container">
          <h4>| 강의 커리큘럼</h4>
          <div class="cur_container" v-for="cur in OnlineClass[$route.params.id - 1 ].detail_curriculum" :key="cur">
            <p class="cur_title">#{{ cur.cur_id }} {{ cur.title }}</p>
            <ul style="display:flex;">
              <li>
                <img class="cur_img" :src="cur.cur_img">
              </li>
              <ul class="cur_study_container">
                <li class="cur_study" v-for="(cur_study, nums) in cur.study" :key="cur_study">
                  {{ nums + 1 }}. {{ cur_study }}
                </li>
              </ul>
            </ul>
          </div>
          <hr/>
        </div>
      </div>
      <!-- 우측 플로팅 컨테이너 -->
      <aside class="right_container">
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
        <a class="btn_lg btn_black" href="/">클래스 신청하기</a>
        </div>
      </aside>
    </article>
  </section>
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
.btn_lg{
  display: block;
  padding:14px 10px;
  text-align: center;
  align-items: center;
  border:1px solid black;
}
.btn_black{
  background-color:black;
  border-color: black;
  color:white;
}
.btn_black:hover{
  background-color: white;
  color:black;
}

@keyframes fadeOut {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}

.title_container{
  width:100%;
  background:#222;

  .detail_title_banner{
    width:100%;
    min-width: 1200px;
    max-width: 1920px;
    margin:auto;
    display: grid;
    grid-template-columns: 50% 25% 25%;
    grid-template-rows: 350px 350px;
    grid-template-areas:
      "left right right"
      "left right1 right2";

    img{
      width:100%;
      height:350px;
      object-fit: cover;
    }
    img:hover{
      animation-duration: 1s;
      animation-name:fadeOut;
      animation-fill-mode: both;
    }

    .banner_left{
      grid-area: left;
      img{
        height:700px;
      }
    }
    .banner_right_top{
      grid-area: right;
    }
    .banner_right_bottom1{
      grid-area: right1;
    }
    .banner_right_bottom2{
      grid-area: right2;
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
    .cur_title{
      font-size:1.1rem;
      font-weight: bolder;
      color: $cur-title-text;
      margin-bottom:0px;
    }
    .cur_img{
      object-fit: cover;
      width:200px;
      height:110px;
      border-radius: 4px;
    }

    .description_container{
      h4{
        font-size:1.4rem;
        color: $dct-title;
      }
      .cur_container{
        padding-bottom:10px;

        .cur_study_container{
          width:100%;

          .cur_study{
            border:1px solid $gray-2;
            padding: 6px 10px;
            margin: 0px 0px 5px 5px;
            border-radius: 4px;
            font-size: 0.9rem;
          }
        }
      }
    }
  }
  .right_container{
    width:330px;

    .float_window{
      z-index: 100;
      border:1px solid $gray-1;
      padding:14px 14px;
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
