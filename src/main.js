import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import VueRouter from "vue-router";
import store from "./store/store";
import ElementUI from "element-ui";
import iView from "iview"
import "element-ui/lib/theme-chalk/index.css";
import qs from "qs";
import axios from "axios";
import { post, toDelete, get, patch, put } from "./api/http.js";

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(iView);

Vue.config.productionTip = false;

Vue.prototype.$qs = qs;
Vue.prototype.$store = store;
Vue.prototype.$axios = axios;
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$toDelete = toDelete;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
