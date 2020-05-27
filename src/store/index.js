/*
 * @Author: Ducky
 * @Date: 2020-05-22 22:14:00
 * @LastEditTime: 2020-05-27 21:16:02
 * @LastEditors: Ducky
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/store/index.js
 * @
 */ 
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // Left Navigation collapsed status
    navCollapsed:false,
    // 
    screenHeight:0
  },
  mutations: {
    navCollapse(state){
      state.navCollapsed = !state.navCollapsed
    },
    changeScreenHeight (state, val) {
      state.screenHeight = val
    }
  },
  actions: {
  },
  modules: {
  }
})
