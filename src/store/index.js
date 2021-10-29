import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    token: JSON.parse(localStorage.getItem("user_token")) || "",
    user_data: JSON.parse(localStorage.getItem("user_data")) || {},
  },
  mutations: {
    rememberUser(state, payload) {
      state.token = payload.api_token;
      state.user_data = payload;
      localStorage.setItem("user_token", JSON.stringify(payload.api_token));
      localStorage.setItem("user_data", JSON.stringify(payload));
    },
    logout(state) {
      state.token = "";
      state.user_data = {};
      localStorage.removeItem("user_token");
      localStorage.removeItem("user_data");
    },
  },
  actions: {},
  modules: {},
});
