/*
 * @Author: Ducky
 * @Date: 2020-05-22 22:14:00
 * @LastEditTime: 2020-06-10 14:59:04
 * @LastEditors: Ducky Yang
 * @Description:
 * @FilePath: /ducky-ui/src/router/index.js
 * @
 */

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import Routes from "./routes";

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

export default router;
