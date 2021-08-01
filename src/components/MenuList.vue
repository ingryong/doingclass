<template>
<ul id="nav_menu">
    <li>
        <router-link id="nav_home" to="/">Home</router-link>
    </li>
    <li>
        <router-link id="nav_about" to="/oclist">온라인 클래스</router-link>
    </li>
    <li>
        <router-link id="nav_about" to="/about">어바웃</router-link>
    </li>
</ul>
</template>

<script>
export default {
}
</script>

<style>
#nav_menu {
  display: flex;
}
#nav_menu li{
  list-style: none;
  padding:14px 16px;
}
#nav_menu li.on{
  border-bottom:4px solid #000;
}

#nav .nav_logo{
  height:32px;
}

#nav .nav_btm2 a {
  color: #2c3e50;
  font-size: 1rem;
  font-weight: 400;
  text-decoration: none;
}
#nav .nav_btm2 a:hover{
  color:#000;
}

#nav a.router-link-exact-active {
  color: #000;
  font-weight: bold;
}
</style>
