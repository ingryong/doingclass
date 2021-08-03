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
            <img src="@/assets/home-list01/003.jpg">
          </li>
          <li>
            <img src="@/assets/home-list01/002.jpg">
          </li>
          <li>
            <img src="@/assets/home-list01/001.jpg">
          </li>
          <li>
            <img src="@/assets/home-list01/003.jpg">
          </li>
          <li>
            <img src="@/assets/home-list01/003.jpg">
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
              <img src="@/assets/home-list01/003.jpg">
            </li>
            <li>
              <img src="@/assets/home-list01/002.jpg">
            </li>
            <li>
              <img src="@/assets/home-list01/001.jpg">
            </li>
            <li>
              <img src="@/assets/home-list01/003.jpg">
            </li>
            <li>
              <img src="@/assets/home-list01/003.jpg">
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

</template>

<style>
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
}
#home-list01 .sub_title{
  font-size:1.1rem;
  font-weight: 400;
}
#home-list01 .list-carousel-slide01 ul{
  display: flex;
  padding-left:0px;
}
#home-list01 .list-carousel-slide01 li{
  margin:0px 5px;
}
#home-list01 .list-carousel-slide01 img{
  width:390px;
  border-radius: 10px;
}

#home-list02{
  background-color: #eee;
  padding: 50px 0px;
  text-align: left;
}
#home-list02 .list-carousel-slide02{
  width:1000px;
  margin:auto;
  overflow: hidden;
}
#home-list02 .sub_title{
  font-size:1.1rem;
  font-weight: 400;
}
#home-list02 .list-carousel-slide02 ul{
  display: flex;
  padding-left:0px;
}
#home-list02 .list-carousel-slide02 li{
  margin:0px 5px;
}
#home-list02 .list-carousel-slide02 img{
  width:324px;
  border-radius: 10px;
}
</style>
