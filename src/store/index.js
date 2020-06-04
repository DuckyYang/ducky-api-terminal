/*
 * @Author: Ducky
 * @Date: 2020-05-22 22:14:00
 * @LastEditTime: 2020-06-04 12:30:16
 * @LastEditors: Please set LastEditors
 * @Description:
 * @FilePath: /ducky-api-terminal/src/store/index.js
 * @
 */

import Vue from "vue";
import Vuex from "vuex";
import cookie from '../plugin/cookie'
import uitls from '../plugin/utils'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Left Navigation collapsed status
    navCollapsed: false,
    //
    screenHeight: 0,
    // user's identity when user login system
    identity:{},
    accesstoken:null
  },
  mutations: {
    navCollapse(state) {
      state.navCollapsed = !state.navCollapsed;
    },
    changeScreenHeight(state, val) {
      state.screenHeight = val;
    },
    setUserIdentity(state,userIdentity){
      // save userIdentity to cookie
      cookie.set('user',uitls.serialize(userIdentity))
      // store user identity
      state.identity = userIdentity || {}
    },
    setToken(state,accesstoken){
      // save accesstoken to cookie
      cookie.set('accesstoken',accesstoken)
      // store token
      state.accesstoken = accesstoken || ''
    }
  },
  getters:{
    accesstoken(state){
      // try to get token from store or cookie
      return state.accesstoken || cookie.get('accesstoken')
    }
  },
  actions: {},
  modules: {},
});
