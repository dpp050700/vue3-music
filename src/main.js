import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import lazyPlugin from "vue3-lazy";
import "./assets/scss/index.scss";
import loadingDirective from "@/components/base/loading/directive";
// import Vconsole from "vconsole";
// new Vconsole();

createApp(App)
  .use(store)
  .use(router)
  .use(lazyPlugin, { loading: require("@/assets/images/singerTop.png") })
  .directive("loading", loadingDirective)
  .mount("#app");
