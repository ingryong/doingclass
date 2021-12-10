<template>
  <div id="main_carousel">
    <Carousel
      class="title-baner"
      :dots="false"
      :loop="true"
      :autoplay="true"
      :items="1"
      :nav="false"
      :rewind="true"
    >
      <div style="width:100%; height:500px; background-color:black;">
        <table class="noBorder">
          <tbody>
            <tr>
              <td class="banner_left">
                <h4>
                  <span><br /></span>
                </h4>
                <p>
                  <span class="fs-16">DOING CREATOR CENTER</span>
                  <br /><br />
                  <span class="fs-24"
                    ><strong>온라인 강의를 게시하고 관리하세요!</strong></span
                  >
                  <br />
                  <br />
                  <br />
                </p>
                <p>
                  <span class="fs-18"
                    ><router-link class="btn-lg" to="/creators/myclass"
                      >크리에이터센터 이동하기 &gt;</router-link
                    ></span
                  >
                </p>
                <br style="user-select: auto;" />
              </td>
              <td style="width: 60%; user-select: auto; margin:auto;">
                <a href="/"
                  ><img
                    src="~@/assets/imgs/home_banner01.jpg"
                    style="width: 600px;"
                    class="fr-dib"
                /></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </Carousel>
  </div>
</template>

<script>
import Carousel from "vue-owl-carousel";

export default { components: { Carousel } };
</script>

<style lang="scss">
.title-baner {
  div {
    width: 100%;
    height: 500px;

    .btn-lg {
      padding: 10px 30px;
      border: 1px solid #fff;
      border-radius: 4px;
      color: #fff;
      font-weight: bold;
    }
    .btn-lg:hover {
      background-color: #fff;
      color: orange;
    }

    table {
      width: 100%;
      height: 100%;
      user-select: auto;

      .banner_left {
        width: 40%;
        user-select: auto;

        h4 {
          text-align: left;

          span {
            color: #fff;
          }
        }
        p {
          text-align: center;
          color: #fff;
          line-height: 0.9;
          .fs-18 {
            font-size: 1.2rem;
          }
          .fs-24 {
            font-size: 1.6rem;
          }
        }
      }
    }
  }
}
</style>
