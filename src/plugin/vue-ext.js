/*
 * @Description:
 * @Version: 1.0
 * @Author: Ducky Yang
 * @Date: 2020-06-05 17:14:59
 * @LastEditors: Ducky Yang
 * @LastEditTime: 2020-06-05 17:15:34
 */

import Vue from "vue";

export default {
  /**
   *
   * @param {Object} obj object
   * @param {String} name key name
   * @param {Object} val value
   */
  setProperty(obj, name, val) {
    Vue.set(obj, name, val);
  },
  /**
   *
   * @param {Array} objArr a array of object that contains `obj`,`name`,`val` properties
   */
  setProperties(objArr) {
    if (objArr && Array.isArray(objArr)) {
      objArr.forEach((item) => {
        Vue.set(item.obj, item.name, item.val);
      });
    }
  },
};
