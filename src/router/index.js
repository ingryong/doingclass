import Vue from 'vue'
import VueRouter from 'vue-router'

import Login from '@/views/Login.vue'
import Join from '@/views/Join.vue'
import Home from '@/views/Home.vue'
import OnlineClassList from '@/views/OnlineClass/OCList'
import OnlineClassDetail from '@/views/OnlineClass/OCDetail'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/logout',
    name: 'Logout',
    component: { template: '<div>Logout</div>' }
  },
  {
    path: '/join',
    name: 'Join',
    component: Join
  },
  {
    path: '/oclist',
    name: 'onlineclasslist',
    component: OnlineClassList
  },
  {
    path: '/ocdetail/:id',
    name: 'ocdetail',
    component: OnlineClassDetail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
