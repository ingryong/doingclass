<template>
    <div>
        <div id="Drawer" class="drawer_background" @click="close_drawer">
        </div>
        <div id="Drawer_Content" class="drawer_container">
            <div class="drawer_header">
                <div><span> </span></div>
                <div><a class="close_btn" @click="close_drawer"><i class="fas fa-times"></i></a></div>
            </div>
            <div class="drawer_menu_list">
                <MenuList/>
            </div>
        </div>
    </div>
</template>

<script>
import MenuList from '@/components/MenuList.vue'
export default {
  components: {
    MenuList
  },
  methods: {
    close_drawer () {
      document.getElementById('Drawer').style = 'display: none;'
      document.getElementById('Drawer_Content').style = 'display: none;'
    },
    open_drawer () {
      document.getElementById('Drawer').style = 'display: block;'
      document.getElementById('Drawer_Content').style = 'display: block;'
    }
  }
}
</script>

<style lang="scss">
.drawer_background{
    width: 100%;
    height: 100%;
    position: fixed;
    display: none;
    z-index: 100;
    background-color: rgba(0,0,0,0.6);
}
.drawer_container{
    width: 300px;
    height: 100%;
    position: fixed;
    display:none;
    z-index: 102;
    top: 0;
    left: 0;
    background-color: white;
    .drawer_header{
        width:100%;
        display:flex;
            justify-content: space-between;
            div{
            width:30px;
            .close_btn{
                font-size:1rem;
            }
        }
    }
    .drawer_menu_list{
        ul{
            flex-direction: column;
            li{
                text-align: left;
                a{
                    color: $main-txt !important;
                }
            }
        }
    }
}
</style>
