import Vue from "vue";
import VueRouter from "vue-router";

import Login from "@/views/Auth/Login.vue";
import Join from "@/views/Auth/Join.vue";
import Profile from "@/views/Auth/Profile.vue";
import MyClass from "@/views/Auth/MyClass.vue";
import Home from "@/views/Home.vue";
import OnlineClassList from "@/views/OnlineClass/OCList";
import OnlineClassDetail from "@/views/OnlineClass/OCDetail";
import LearningClass from "@/views/OnlineClass/LearningClass";
import CreateClass from "@/views/Creators/CreateClass";
import EditClass1 from "@/views/Creators/EditClass1";
import EditClass2 from "@/views/Creators/EditClass2";
import EditClass3 from "@/views/Creators/EditClass3";
import EditClass4 from "@/views/Creators/EditClass4";
import OtherSetting from "@/views/Creators/OtherSetting";
import CreateEpisode from "@/views/Creators/CreateEpisode";
import EditEpisode from "@/views/Creators/EditEpisode";
import EditChapter from "@/views/Creators/EditChapter";
import CreatorClass from "@/views/Creators/MyClass";
import BuyClass from "@/views/Shop/BuyClass";

import DefultLayout from "@/layouts/Default";
import LearningClassLayout from "@/layouts/LearningClassLayout";
import CreatorLayout from "@/layouts/Creator";
import CreatClassLayout from "@/layouts/CreateClassLayout";
import EditClassLayout from "@/layouts/EditClassLayout";

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
        path: "/myclass",
        name: "MyClass",
        component: MyClass
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
      },
      {
        path: "/shopping/:id",
        name: "buyclass",
        component: BuyClass
      }
    ]
  },
  {
    path: "/learningclass",
    name: "learningclass",
    component: LearningClassLayout,
    children: [
      {
        path: "/learningclass/:id",
        name: "learningclass",
        component: LearningClass
      }
    ]
  },
  {
    path: "/creators",
    name: "creators",
    component: CreatorLayout,
    children: [
      {
        path: "/creators/myclass",
        name: "creatorclass",
        component: CreatorClass
      }
    ]
  },
  {
    path: "/creators/createclass",
    name: "create",
    component: CreatClassLayout,
    children: [
      {
        path: "/creators/createclass",
        name: "createclass",
        component: CreateClass
      }
    ]
  },
  {
    path: "/creators/editclass",
    name: "edit",
    component: EditClassLayout,
    children: [
      {
        path: "/creators/editclass1/:id",
        name: "editclass1",
        component: EditClass1
      },
      {
        path: "/creators/editclass2/:id",
        name: "editclass2",
        component: EditClass2
      },
      {
        path: "/creators/editclass3/:id",
        name: "editclass3",
        component: EditClass3
      },
      {
        path: "/creators/editclass4/:id",
        name: "editclass4",
        component: EditClass4
      },
      {
        path: "/creators/othersetting/:id",
        name: "othersetting",
        component: OtherSetting
      },
      {
        path: "/creators/createepi/:id/:doc_id",
        name: "createpisode",
        component: CreateEpisode
      },
      {
        path: "/creators/editepi/:id/:cur_id/:epi_id",
        name: "editepisode",
        component: EditEpisode
      },
      {
        path: "/creators/editchap/:id/:cur_id",
        name: "editchapter",
        component: EditChapter
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
