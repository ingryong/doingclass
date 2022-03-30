<template>
  <footer>
    <div
      id="footer"
      class="nav navbar navbar-dark bg-dark w-100 p-4 d-flex justify-content-evenly"
    >
      <div class="left align-self-start">
        <h3>SITEMAP</h3>
        <MenuList style="dispaly:table; margin-left:0px;" />
      </div>
      <div class="center align-self-start">
        <h3>SERVICE</h3>
        <span>카카오 1:1 상담</span>
        <span>010-1234-1234</span>
        <span>doingclass@gmail.com</span>
        <span>Mon - Fri AM 09:30 - 18:00</span>
        <span class="mb-4">Sat.Sun.Red-Day Off</span>
      </div>
      <div class="right align-self-start">
        <h3>CORPORATION</h3>
        <span>
          <strong>주식회사 OOO</strong> |
          <strong>사업자등록번호</strong> 111-11-11111
        </span>
        <span
          ><strong>대표자명</strong> 백철우 |
          <strong>통신판매업신고번호</strong> 2021-다산-0000호
        </span>
        <span class="mb-4"> 서울시 강남구 강남대로 123-123 강남타워 5층</span>
        <span> </span>
        <h3>INFORMATION</h3>
        <span>이용약관 ㅣ 개인정보처리방침 ㅣ 사업자정보확인</span>
        <span style="margin-top:20px;">ⓒ 2022 Doing Class</span>
      </div>
    </div>
  </footer>
</template>

<script>
import MenuList from "@/components/Navbar/MenuList.vue";
export default {
  name: "App",
  components: {
    MenuList
  }
};
</script>

<style lang="scss">
#footer {
  font-size: 0.86rem;

  h3 {
    font-size: 1.4rem;
    color: #fff;
    text-align: left;
  }
  ul {
    display: block;
    margin-top: -10px;
    padding-left: 0;

    li {
      padding: 4px;
      text-align: left;
    }
  }

  .left {
    display: flex;
    flex-direction: column;
    padding-right: 10px;

    #nav_menu a {
      color: #ccc;
      text-decoration: none;
    }
  }

  .center {
    display: flex;
    flex-direction: column;
    color: #ccc;
    text-align: left;
    padding-right: 10px;
  }

  .right {
    display: flex;
    flex-direction: column;
    color: #ccc;
    text-align: left;
  }
}
</style>
