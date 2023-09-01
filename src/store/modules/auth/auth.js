import * as types from "./auth-types";
import router from "../../../router/router";
import apiService from "@/services/apiService";
import { createToaster } from "@meforma/vue-toaster";

const toaster = createToaster();

const state = {
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  user: JSON.parse(atob(localStorage.getItem('user') || '') || '""'),
};

const getters = {
  [types.GET_TOKEN]: (state) => {
    return state.token;
  },
  [types.IS_USER_AUTHENTICATED]: (state) => {
    return state.isAuthenticated;
  },
  [types.GET_PROFILE_DATA]: (state) => {
    return state.user;
  },
};

const mutations = {
  [types.SET_TOKEN]: (state, payload) => {
    state.token = payload;
    state.isAuthenticated = true;
  },
  [types.LOG_OUT_SUCCESS]: (state) => {
    state.token = null;
    state.isAuthenticated = false;
    state.user = null;
  },
  [types.SET_PROFILE_DATA]: (state, payload) => {
    state.user = payload;
  },
};

const actions = {
  [types.REGISTER_USER]: ({ commit }, payload) => {
    apiService
      .post("auth/signup", payload)
      .then((response) => {
        commit(types.SET_TOKEN, response.data.token);
        commit(types.SET_PROFILE_DATA, response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem('user', btoa(JSON.stringify(response.data)));
        toaster.show("You have been registered successfully", {
          position: "top-right",
          type: "success",
        });
        router.push("/cars");
      })
      .catch((err) => {
        toaster.show(err.response.data.message || err.message, {
          position: "top-right",
          type: "error",
        });
      });
  },

  // Action for logging in user
  [types.SET_TOKEN_ACTION]: ({ commit }, payload) => {
    apiService
      .post("auth/login", payload)
      .then((response) => {
        commit(types.SET_TOKEN, response.data.token);
        commit(types.SET_PROFILE_DATA, response.data);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem('user', btoa(JSON.stringify(response.data)));
        router.push("/cars");
      })
      .catch((err) => {
        toaster.show(err.response.data.message || err.message, {
          position: "top-right",
          type: "error",
        });
      });
  },

  // Log out functionality
  [types.LOG_OUT]: ({ commit }) => {
    commit(types.LOG_OUT_SUCCESS);
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      router.push("/login");
    } catch (err) {}
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
