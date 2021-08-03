<template>
  <div>
    <div id="main_carousel">
      carousel area
    </div>
    <div id="home-list01">
      <h1>Let's do it! <span class="sub_title">바로 수강 가능한 클래스</span></h1>
      <div class="list-carousel-slide01">
        <ul>
          <li>
            <img src="@/assets/imgs/home-list01/003.jpg">
          </li>
          <li>
            <img src="@/assets/imgs/home-list01/002.jpg">
          </li>
          <li>
            <img src="@/assets/imgs/home-list01/001.jpg">
          </li>
          <li>
            <img src="@/assets/imgs/home-list01/003.jpg">
          </li>
          <li>
            <img src="@/assets/imgs/home-list01/003.jpg">
          </li>
        </ul>
      </div>
    </div>
    <div id="home-list02">
      <div class="list-carousel-slide02">
        <h1>NEW & BEST <span class="sub_title">신규/베스트 VOD</span></h1>
          <div class="list-carousel-slide02">
          <ul>
            <li>
              <img src="@/assets/imgs/home-list01/003.jpg">
            </li>
            <li>
              <img src="@/assets/imgs/home-list01/002.jpg">
            </li>
            <li>
              <img src="@/assets/imgs/home-list01/001.jpg">
            </li>
            <li>
              <img src="@/assets/imgs/home-list01/003.jpg">
            </li>
            <li>
              <img src="@/assets/imgs/home-list01/003.jpg">
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

</template>

<style lang="scss">
#main_carousel{
  width:100%;
  height:400px;
  background-color: green;
}

#home-list01{
  width:1200px;
  margin:auto;
  padding: 50px 0px;
  text-align: left;
  overflow: hidden;

  .sub_title{
    font-size:1.1rem;
    font-weight: 400;
  }
  .list-carousel-slide01{
    ul{
      display: flex;
      padding-left:0px;
    }
    li{
      margin:0px 5px;
    }
    img{
      width:390px;
      border-radius: 10px;
    }
  }
}

#home-list02{
  background-color: $gray-1;
  padding: 50px 0px;
  text-align: left;

  .list-carousel-slide02{
    width:1000px;
    margin:auto;
    overflow: hidden;

    .sub_title{
      font-size:1.1rem;
      font-weight: 400;
    }
    ul{
      display: flex;
      padding-left:0px;
    }
    li{
      margin:0px 5px;
    }
    img{
      width:324px;
      border-radius: 10px;
    }
  }

}
</style>
