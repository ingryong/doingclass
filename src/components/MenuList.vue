<template>
  <ul id="nav_menu">
      <li v-for="(menu, index) in menulist" :key="index">
          <router-link id="nav_home" :to="menu.url">{{ menu.menuname }}</router-link>
      </li>
  </ul>
</template>

<script>
import menulist from '@/assets/data/menulist.js'

export default {
  data () {
    return {
      menulist: menulist
    }
  }
}
</script>

<style lang="scss">
#nav_menu {
  display: flex;
  margin-left: 40px;

  li{
    list-style: none;
    padding:14px 16px;
  }

  li.on{
    border-bottom:4px solid #000;
  }
}

#nav{
  .nav_logo{
  height:32px;
  }
  .nav_btm2{
    a {
    color: #2c3e50;
    font-size: 1rem;
    font-weight: 400;
    text-decoration: none;
    }
    a:hover{
      color:#000;
    }
  }

  a.router-link-exact-active {
    color: #000;
    font-weight: bold;
  }
}
</style>
