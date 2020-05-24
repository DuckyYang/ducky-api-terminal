/*
 * @Author: Ducky
 * @Date: 2020-05-22 22:14:00
 * @LastEditTime: 2020-05-24 21:03:20
 * @LastEditors: Ducky
 * @Description: 
 * @FilePath: /ducky-ui/src/router/index.js
 * @
 */ 
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Routes from '../static/routes.js'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: '',
    component: Home,
    children: Routes
  }
]

const router = new VueRouter({
  routes
})

export default router
