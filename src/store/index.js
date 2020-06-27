/*
 * @Author: Ducky
 * @Date: 2020-05-22 22:14:00
 * @LastEditTime: 2020-06-27 22:06:21
 * @LastEditors: Ducky
 * @Description:
 * @FilePath: /ducky-api-terminal/src/store/index.js
 * @
 */

import Vue from "vue";
import Vuex from "vuex";
import cookie from '../plugin/cookie'
import utils from '../plugin/utils'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // Left Navigation collapsed status
    navCollapsed: false,
    //
    screenHeight: 0,
    // user's identity when user login system
    identity:{},
    accesstoken:null,
    mock:false,
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
      cookie.set('user',utils.serialize(userIdentity))
      // store user identity
      state.identity = userIdentity || {}
    },
    setToken(state,accesstoken){
      // save accesstoken to cookie
      cookie.set('accesstoken',accesstoken)
      // store token
      state.accesstoken = accesstoken || ''
    },
    setMockMode(state){
      state.mock = true
    },
    signOut(state){
      // clear token and identity
      cookie.remove('accesstoken');
      cookie.remove('user');
      state.accesstoken = '';
      state.identity = {};
    },
  },
  getters:{
    accesstoken(state){
      // try to get token from store or cookie
      return state.accesstoken || cookie.get('accesstoken')
    },
  },
  actions: {},
  modules: {},
});
