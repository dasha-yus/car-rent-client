
import Vuex from "vuex";
import auth from "./modules/auth/auth";

export const store = new Vuex.Store({
  modules: {
    auth,
  },
});
