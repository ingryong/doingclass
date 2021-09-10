<template>
  <section>
    <!-- 상단 타이틀 배너 컨테이너 -->
    <header class="title_container">
      <div class="detail_title_banner">
        <div class="banner_left">
          <img :src="class_detail.detail_banner_img[0]"/>
        </div>
        <div class="banner_right_top">
          <img :src="class_detail.detail_banner_img[1]"/>
        </div>
        <div class="banner_right_bottom1">
          <img :src="class_detail.detail_banner_img[2]"/>
        </div>
        <div class="banner_right_bottom2">
          <img :src="class_detail.detail_banner_img[3]"/>
        </div>
      </div>
    </header>
    <article class="detail_container" style="padding:0px 8px;">
      <!-- 메인 컨텐츠 컨테이너 -->
      <div class="left_container">
        <p class="class_info">
        <strong>클래스 정보</strong><br/>
        <span>수강가능 <span class="values">{{ class_detail.tag1 }}</span></span>
        </p>
        <hr/>
        <img class="detail_poster_img" :src="class_detail.posterimg"/>
        <hr/>
        <!-- description 영역 -->
        <div v-for="(des, des_num) in class_detail.detail_description" :key="des_num">
          <div class="description_container" v-if="class_detail.detail_description1 !== ''">
            <h4>| {{ des.title }}</h4>
            <p class="point" v-html="des.description" v-if="des.class === 'point'"></p>
            <p class="detail_description" v-html="des.description" v-if="des.class === ''"></p>
            <hr/>
          </div>
        </div>
        <!-- 강의 커리큘럼 -->
        <div class="description_container">
          <h4>| 강의 커리큘럼</h4>
          <div class="cur_container" v-for="(cur, chapnum) in class_detail.detail_curriculum" :key="chapnum">
            <p class="cur_title">#{{ cur.cur_id }} {{ cur.title }}</p>
            <ul style="display:flex;">
              <li>
                <img class="cur_img" :src="cur.cur_img">
              </li>
              <ul class="cur_study_container">
                <li class="cur_study" v-for="(cur_study, nums) in cur.study" :key="nums" v-html="nums+1 + '. ' + cur_study">
                </li>
              </ul>
            </ul>
          </div>
          <hr/>
        </div>
        <!-- 크리에이터 소개 -->
        <div class="description_container" v-for="(profiles, pnum) in class_detail.creator_profile" :key="pnum">
          <h4>| 크리에이터 소개</h4>
          <div class="creator_container" style="flex;">
            <img :src="profiles.img"/>
            <div>
              <h3>{{ profiles.cname }}</h3>
              <p v-html="profiles.cdescription"></p>
            </div>
          </div>
          <hr/>
        </div>
        <!-- 크리에이터의 한 마디 -->
        <div class="description_container" v-if="class_detail.detail_lastmessage !== undefined">
          <h4>| 크리에이터의 한 마디</h4>
          <p class="detail_description" v-html="class_detail.detail_lastmessage" style="text-align:center; line-height:1.5;"></p>
          <div style="height:50px;"></div>
        </div>
      </div>
      <!-- 우측 플로팅 컨테이너 -->
      <aside class="right_container">
        <div id="side_content" class="float_window">
          <p class="window_category">
            <span>{{ class_detail.category1 }} | {{ class_detail.category2 }}</span>
          </p>
          <p class="window_title">{{ class_detail.title }}<br>
            <span v-if="class_detail.tag1 === '수강가능'" class="tag-open">{{ class_detail.tag1 }}</span>
            <span v-else-if="class_detail.tag1 === '준비중'" class="tag-ready">{{ class_detail.tag1 }}</span>
            <span v-else-if="class_detail.tag1 === '모집종료'" class="tag-close">{{ class_detail.tag1 }}</span>
            <span v-if="class_detail.tag2 === '1:1코칭'" class="tag-coaching">{{class_detail.tag2}}</span>
            <span v-if="class_detail.tag3 === '준비물'" class="tag-goods">{{class_detail.tag3}}</span>
          </p>
          <p class="detail_price">
            <span><s>{{ class_detail.price*1.3|comma }}원</s> → {{ class_detail.price|comma }}원</span><br>
            <span><strong>월 {{ class_detail.price/3|comma }}원</strong> (3개월 할부)</span>
          </p>
          <p class="detail_learningdays">
            <span>수강기간</span>
            <span>구매 후 {{ class_detail.learningdays }}일간 무제한 수강</span>
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
      OnlineClass: OnlineClass,
      scrollPosition: null
    }
  },
  filters: {
    comma: function (val) {
      var num = Number(val)
      return num.toFixed(0).replace(/(\d)(?=(\d{3})+(?:\.\d+)?$)/g, '$1,')
    }
  },
  computed: {
    // 들어온 클래스의 id값을 찾는 OnlineClass[$route.params.id - 1] 대신 class_detail을 사용
    class_detail () {
      return OnlineClass[this.$route.params.id - 1]
    }
  },
  methods: {
    updateScroll () {
      this.scrollPosition = window.scrollY || document.documentElement.scrollTop

      if (this.scrollPosition > 690) {
        document.getElementById('side_content').style = 'position : fixed;'
      } else {
        document.getElementById('side_content').style = 'position : '
      }
    }
  },
  mounted () {
    // mounted -> 라이프사이클 상 DOM에 모든 컴포넌트를 불러온 후에 할 일
    // 스크롤이 발생할 때마다 methods의 updateScroll 이벤트를 불러온다.
    window.addEventListener('scroll', this.updateScroll)
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
    grid-template-rows: 250px 250px;
    grid-template-areas:
      "left right right"
      "left right1 right2";

    img{
      width:100%;
      height:250px;
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
        height:500px;
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
  min-width:800px;
  max-width:1150px;
  margin:auto;
  text-align: left;

  .left_container{
    max-width:800px;

    .detail_poster_img{
      width:100%;
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
      hr{
        margin-top: 50px;
      }
      .point{
        background-color:#fafafa;
        padding: 20px 20px;
      }
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
      .creator_container{
        display:flex;
        padding-bottom:30px;
        img{
            width:38%;
            margin-top:0px;
          }
        div{
          padding:0px 14px;
          h3{
            margin-top:0px;
            font-size:1.8rem
          }
        }
      }
      .detail_description{
        padding: 0px 10px;
      }
    }
  }
  .right_container{
    width:330px;

    .fixed{
      position: fixed;
    }

    .float_window{
      z-index: 100;
      border:1px solid $gray-1;
      padding:14px 14px;
      margin-top:10px;
      font-size:0.9rem;
      top:120px;
      width:300px;

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
