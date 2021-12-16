<template>
  <footer
    style="width:100%; height:250px; background-color: #333; bottom:0px; left:0px;"
  >
    <div id="footer">
      <div class="left">
        <h3>SITEMAP</h3>
        <MenuList style="dispaly:table; margin-left:0px;" />
      </div>
      <div class="center">
        <h3>SERVICE</h3>
        <span>카카오 1:1 상담</span>
        <span>010-1234-1234</span>
        <span>doingclass@gmail.com</span>
        <span>Mon - Fri AM 09:30 - 18:00</span>
        <span>Sat.Sun.Red-Day Off</span>
        <span style="margin-top:20px;">ⓒ 2021 Doing Class</span>
      </div>
      <div class="right">
        <h3>CORPORATION</h3>
        <span
          ><strong>주식회사 OOO</strong> |
          <strong>사업자등록번호</strong> 111-11-11111</span
        >
        <span
          ><strong>대표자명</strong> 백철우 |
          <strong>통신판매업신고번호</strong> 2021-다산-0000호</span
        >
        <span>서울시 강남구 강남대로 123-123 강남타워 5층</span>
        <h3>INFORMATION</h3>
        <span>이용약관 ㅣ 개인정보처리방침 ㅣ 사업자정보확인</span>
      </div>
    </div>
  </footer>
</template>

<script>
import MenuList from "@/components/MenuList.vue";
export default {
  name: "App",
  components: {
    MenuList
  }
};
</script>

<style>
#footer {
  max-width: 1000px;
  padding: 10px;
  margin: auto;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  background-color: #333;
  font-size: 0.86rem;
}
#footer .left {
  display: flex;
  flex-direction: column;
  padding-right: 10px;
}
#footer h3 {
  color: #fff;
  text-align: left;
}
#footer ul {
  display: block;
  margin-top: -10px;
  padding-left: 0;
}
#footer ul li {
  padding: 4px;
  text-align: left;
}
#nav_menu a {
  color: #ccc;
  text-decoration: none;
}

#footer .center {
  display: flex;
  flex-direction: column;
  color: #ccc;
  text-align: left;
  padding-right: 10px;
}
#footer .center span:first-child {
  margin-top: -10px;
}

#footer .right {
  display: flex;
  flex-direction: column;
  color: #ccc;
  text-align: left;
}
</style>
