<template>
<div>
    <div id="nav">
      <div class="nav_top">
        <div class="nav_top1">
          <a href="/"><img class="nav_logo" src="@/assets/logo_color.png"></a>
        </div>
        <div class="nav_top2">
          <input type="text" placeholder="배우고 싶은 것이 있나요?"/><i class="fas fa-search"></i></div>
        <div class="nav_top3">
          <a> 로그인 </a>
          <a> 회원가입 </a>
        </div>
      </div>
      <div class="nav_btm">
        <div class="nav_btm1">
          <a><i class="fas fa-bars"></i></a>
        </div>
        <div class="nav_btm2">
          <MenuList/>
        </div>
      </div>
    </div>
    <div class="top_blank" style="width:100%; height:110px;"></div>
</div>
</template>

<script>
import MenuList from '@/components/MenuList.vue'
export default {
  name: 'App',
  components: {
    MenuList
  }
}
</script>

<style>
#nav {
  position: fixed;
  width:100%;
  height:110px;
  background: white;
  font-weight: bold;
  box-shadow: 0 0 4px black;
}

/* 네비게이션 첫번째 줄 */
#nav .nav_top{
  display: flex;
  max-width: 1200px;
  margin:auto;
  justify-content: space-between;
  align-items: center;
  height:70px;
  padding: 0px 14px;
}
#nav .nav_top2{
  height:26px;
  border-bottom:1px solid #ccc;
}
#nav .nav_top2 input{
  width:250px;
  border: none;
}
#nav .nav_top3 a{
  font-size:0.9rem;
  font-weight: 400;
  color:#333;
}
#nav .nav_top3 a:first-child{
  margin-right:10px;
}

/* 네비게이션 두번째 줄 */
#nav .nav_btm{
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin:auto;
  height:30px;
  padding: 0px 14px;
}
#nav .nav_btm1 a{
  font-size:1.2rem;
  margin-right:10px;
}
</style>
