/*
 * @Author: Ducky
 * @Date: 2020-05-22 22:14:00
 * @LastEditTime: 2020-06-04 22:05:50
 * @LastEditors: Ducky
 * @Description:
 * @FilePath: /ducky-api-terminal/src/main.js
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
store.commit('setMockMode')

Vue.use(VCharts);
Vue.use(ElementUI);
Vue.use(DuckyUI);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
