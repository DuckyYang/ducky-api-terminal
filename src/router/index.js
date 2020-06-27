/*
 * @Author: Ducky
 * @Date: 2020-05-22 22:14:00
 * @LastEditTime: 2020-06-12 12:02:38
 * @LastEditors: Ducky Yang
 * @Description:
 * @FilePath: /ducky-ui/src/router/index.js
 * @
 */

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Routes from "./routes";
import store from "../store/index";

Vue.use(VueRouter);

const routes = [
  {
    path: "/signin",
    name: "Signin",
    component: () => import("../views/SignIn"),
  },
  {
    path: "/",
    name: "",
    component: Home,
    children: Routes,
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  // if to signin
  if (to.path === routes[0].path) {
    next();
  } else {
    // check signin status
    let token = store.getters["accesstoken"];
    if (!token) {
      next({ path: routes[0].path });
    } else {
      // update user identity
      store.commit('')
      next();
    }
  }
});

export default router;
