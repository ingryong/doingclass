import Vue from "vue";
import VueRouter from "vue-router";

import Login from "@/views/Auth/Login.vue";
import Join from "@/views/Auth/Join.vue";
import Home from "@/views/Home.vue";
import Profile from "@/views/Auth/Profile.vue";
import OnlineClassList from "@/views/OnlineClass/OCList";
import OnlineClassDetail from "@/views/OnlineClass/OCDetail";
import CreateClass from "@/views/Creators/CreateClass";
import MyClass from "@/views/Creators/MyClass";
import DefultLayout from "@/layouts/Default";
import CreatorLayout from "@/layouts/Creator";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: DefultLayout,
    children: [
      {
        path: "/",
        name: "Home",
        component: Home
      },
      {
        path: "/login",
        name: "Login",
        component: Login
      },
      {
        path: "/profile",
        name: "Profile",
        component: Profile
      },
      {
        path: "/join",
        name: "Join",
        component: Join
      },
      {
        path: "/oclist",
        name: "onlineclasslist",
        component: OnlineClassList
      },
      {
        path: "/ocdetail/:id",
        name: "ocdetail",
        component: OnlineClassDetail
      }
    ]
  },
  {
    path: "/creators",
    name: "creators",
    component: CreatorLayout,
    children: [
      {
        path: "/creators/createclass",
        name: "createclass",
        component: CreateClass
      },
      {
        path: "/creators/myclass",
        name: "myclass",
        component: MyClass
      }
    ]
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
