import { createStore, createLogger } from "vuex";
import player from "./player";

const isDebugger = process.env.NODE_ENV === "production" ? false : true;

export default createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: { player },
  plugins: isDebugger ? [createLogger()] : [],
});
