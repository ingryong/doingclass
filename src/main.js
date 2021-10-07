import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

// firebase import
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import KEY from "../secret.json";

Vue.prototype.$Axios = axios;
Vue.config.productionTip = false;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: KEY.API_KEY,
  authDomain: KEY.AUTH_DOMAIN,
  projectId: KEY.PROJECT_ID,
  storageBucket: KEY.STORAGE_BUCKET,
  messagingSenderId: KEY.MESSAGEING_SENDER_ID,
  appId: KEY.APP_ID,
  measurementId: KEY.MEASUREMENT_ID
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore();

new Vue({
  router,
  store,
  app,
  db,
  render: h => h(App)
}).$mount("#app");

const auth = getAuth();
onAuthStateChanged(auth, user => {
  // 조회 - 데이터 베이스에 저장된 닉네임을 현재 접속되어있는 user의 key값을 이용해 불러옴
  store.commit("setUser", user);
  store.dispatch("getUser", user);
});

export default initializeApp(firebaseConfig);
