import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
// vuex-persistedstate를 사용하여 화면 리로드 시 store의 데이터가 소실되어 생기는 문제를 보완

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: null,
    token: ""
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
    }
  },
  actions: {
    getUser({ commit }, user) {
      commit("setUser", user);
      if (!user) return;
      user.getIdToken().then(token => {
        commit("setToken", token);
      });
    }
  },
  modules: {},
  plugins: [createPersistedState()]
});

export default store;
