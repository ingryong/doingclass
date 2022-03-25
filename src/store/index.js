import Vue from "vue";
import Vuex from "vuex";
import { getAuth, signOut } from "firebase/auth";

import createPersistedState from "vuex-persistedstate";
// vuex-persistedstate를 사용하여 화면 리로드 시 store의 데이터가 소실되어 생기는 문제를 보완

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: null,
    token: "",
    db: "",
    storage: ""
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    },
    setDB(state, db) {
      state.db = db;
    },
    setStorage(state, storage) {
      state.storage = storage;
    }
  },
  actions: {
    getUser({ commit }, user) {
      commit("setUser", user);
      if (!user) return;
      user.getIdToken().then(token => {
        commit("setToken", token);
      });
    },
    signOut() {
      signOut(getAuth())
        .then(() => {
          // sign-out successful
          location.href = "/";
        })
        .catch(error => {
          // an error happened
          console.log(error);
        });
    }
  },
  modules: {},
  plugins: [createPersistedState()]
});

export default store;
