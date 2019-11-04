import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import VueRouter from "vue-router";
import store from "./store/store";
import ElementUI from "element-ui"; //引入element组件
import iView from "iview"; //引入iview组件
import "element-ui/lib/theme-chalk/index.css";
import qs from "qs";
import axios from "axios";
import { post, toDelete, get, patch, put } from "./api/index"; //封装方法
import utils from "./utils/commonFunction"; //引入公共方法
import {deBounce} from "./utils/deBounce";
import vuescroll from "vuescroll/dist/vuescroll-native";
import "./common/iconf/iconfont.js"; //引入iconfont
import "./common/iconf/iconfont.css"; //引入iconfont
// import VueBus from "vue-bus";
import echarts from "echarts";

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(iView);
Vue.use(vuescroll);
// Vue.use(VueBus);

Vue.config.productionTip = false;

Vue.prototype.$utils = utils;
Vue.prototype.$deBounce = deBounce;
// Vue.prototype.$VueBus = VueBus;
Vue.prototype.$qs = qs;
Vue.prototype.$store = store;
Vue.prototype.$axios = axios;
Vue.prototype.$post = post;
Vue.prototype.$get = get;
Vue.prototype.$toDelete = toDelete;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;
Vue.prototype.$echarts = echarts;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
