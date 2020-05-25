/*
 * @Author: Ducky
 * @Date: 2020-05-22 22:14:00
 * @LastEditTime: 2020-05-24 20:49:12
 * @LastEditors: Ducky
 * @Description: 
 * @FilePath: /ducky-ui/src/store/index.js
 * @
 */ 
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Left Navigation collapsed status
    navCollapsed:false,
  },
  mutations: {
    navCollapse(state){
      state.navCollapsed = !state.navCollapsed
    }
  },
  actions: {
  },
  modules: {
  }
})
