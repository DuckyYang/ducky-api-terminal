/*
 * @Author: Ducky
 * @Date: 2020-05-22 22:14:00
 * @LastEditTime: 2020-06-04 14:18:15
 * @LastEditors: Please set LastEditors
 * @Description:
 * @FilePath: /ducky-ui/src/main.js
 * @
 */

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import VCharts from "v-charts";
import DuckyUI from "../src/ducky-ui/index";

Vue.config.productionTip = false;
// using mock
require('./mock')

Vue.use(VCharts);
Vue.use(ElementUI);
Vue.use(DuckyUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
