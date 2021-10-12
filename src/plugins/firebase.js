import Vue from "vue";
import store from "../store";
// firebase import
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

import KEY from "../../secret.json";

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
firebase.initializeApp(firebaseConfig);
firebase.firestore();

firebase.auth().onAuthStateChanged(user => {
  // 조회 - 데이터 베이스에 저장된 닉네임을 현재 접속되어있는 user의 key값을 이용해 불러옴
  store.commit("setUser", user);
  store.dispatch("getUser", user);
});

Vue.prototype.$firebase = firebase;
