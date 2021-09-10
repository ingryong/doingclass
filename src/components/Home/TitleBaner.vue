<template>
    <div id="main_carousel">
      <Carousel class="title-baner" :dots="false" :loop="true" :autoplay="true" :items=1 :nav="false" :rewind="true">
        <div class="tlcs_bg">
          <table class="noBorder">
            <tbody>
              <tr>
                <td class="banner_left">
                  <h4><span><br></span></h4>
                  <p style="user-select: auto; text-align: center;">
                    <a href="doingtv"><img src="https://cdn.imweb.me/upload/S202009184501f9980a350/deaae5f6f4d5f.png" style="width: 450px;" class="fr-dib"></a></p>
                    <p><span class="fs-18">8월 스페셜 게스트&nbsp;</span><span class="fs-24"><strong>정진일</strong></span></p>
                    <p><span class="fs-24"><strong>The Zoom Live Contents Show</strong></span></p>
                    <p><span class="fs-18">2021.08.04 수요일 밤 8시</span></p>
                    <br style="user-select: auto;">
                    <p><span class="fs-18"><a class="btn-lg" href="/doingtv">더라콘쇼 자세히 보기 &gt;</a></span></p>
                    <br style="user-select: auto;">
                </td>
                <td style="width: 60%; user-select: auto;">
                  <a href="/"><img src="https://cdn.imweb.me/upload/S202009184501f9980a350/642cb6dba53fd.jpg" style="width: 600px;" class="fr-dib"></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div style="width:100%; height:500px; background-color:green;">
          <table class="noBorder">
            <tbody>
              <tr>
                <td class="banner_left">
                  <h4><span><br></span></h4>
                  <p style="user-select: auto; text-align: center;">
                    <a href="doingtv"><img src="https://cdn.imweb.me/upload/S202009184501f9980a350/deaae5f6f4d5f.png" style="width: 450px;" class="fr-dib"></a></p>
                    <p><span class="fs-18">8월 스페셜 게스트&nbsp;</span><span class="fs-24"><strong>정진일</strong></span></p>
                    <p><span class="fs-24"><strong>The Zoom Live Contents Show</strong></span></p>
                    <p><span class="fs-18">2021.08.04 수요일 밤 8시</span></p>
                    <br style="user-select: auto;">
                    <p><span class="fs-18"><a class="btn-lg" href="/doingtv">더라콘쇼 자세히 보기 &gt;</a></span></p>
                    <br style="user-select: auto;">
                </td>
                <td style="width: 60%; user-select: auto;">
                  <a href="/"><img src="https://cdn.imweb.me/upload/S202009184501f9980a350/642cb6dba53fd.jpg" style="width: 600px;" class="fr-dib"></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Carousel>
    </div>
</template>

<script>
import Carousel from 'vue-owl-carousel'

export default { components: { Carousel } }
</script>

<style lang="scss">
.title-baner{
  div{
    width:100%;
    height:500px;

    .btn-lg{
      padding:10px 30px;
      border:1px solid #fff;
      border-radius: 10px;
      color:#fff;
      font-weight: bold;
    }
    .btn-lg:hover{
      background-color:#fff;
      color:orange;
    }

    table{
      width: 100%;
      user-select: auto;

      .banner_left{
        width: 40%;
        user-select: auto;

        h4{
          text-align: left;

          span{
            color:#fff;
          }
        }
        p{
          text-align: center;
          color:#fff;
          line-height: 0.9;
          .fs-18{
            font-size:1.2rem;
          }
          .fs-24{
            font-size:1.6rem;
          }
        }
      }
    }
  }
  .tlcs_bg{
    background-image: url("~@/assets/imgs/tlcs_bg.png");
    .btn-lg:hover{
      background-color:#fff;
      color:purple;
    }
  }
}
</style>
