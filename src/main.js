import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'

// firebase import
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'

import KEY from '../secret.json'

Vue.prototype.$Axios = axios
Vue.config.productionTip = false
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
}
// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)

new Vue({
  router,
  store,
  app,
  analytics,
  render: h => h(App)
}).$mount('#app')
