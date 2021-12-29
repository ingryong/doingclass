<template>
  <div id="main_carousel">
    <Carousel
      class="title-baner"
      :dots="false"
      :loop="true"
      :autoplay="false"
      :items="1"
      :nav="false"
      :rewind="true"
    >
      <div
        class="carousel_section"
        style="margin:auto; background-color:black;"
      >
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
              <td class="banner_right">
                <a href="/"
                  ><img src="~@/assets/imgs/home_banner01.jpg" class="fr-dib"
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
  .carousel_section {
    margin: auto;
    width: 100%;
    padding: 50px 0px;

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

    .noBorder {
      display: flex;
      flex-direction: row;
      justify-content: center;
      margin: auto;
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
      .banner_right {
        width: 60%;
        user-select: auto;
        margin: auto;

        a > img {
          width: 90%;
          margin: auto;
        }
      }
    }
  }
}
@media (max-width: 680px) {
  #main_carousel {
    width: 100%;
    margin: auto;

    .noBorder {
      tr {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: auto;
        user-select: auto;

        td {
          width: 100%;
        }
      }
    }
  }
}
</style>
