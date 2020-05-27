/*
 * @Author: Ducky
 * @Date: 2020-05-22 22:14:00
 * @LastEditTime: 2020-05-27 13:39:15
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: /ducky-ui/src/router/index.js
 * @
 */ 
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home'
import Routes from './routes'

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
