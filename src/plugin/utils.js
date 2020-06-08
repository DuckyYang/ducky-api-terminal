/*
 * @Author: your name
 * @Date: 2020-06-02 12:28:43
 * @LastEditTime: 2020-06-08 09:52:24
 * @LastEditors: Ducky Yang
 * @Description: In User Settings Edit
 * @FilePath: \ducky-api-terminal\src\plugin\utils.js
 */

import lodash from "lodash";

export default {
  uuid() {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
  },
  /**
   * replace `target` object property value with same key's value of `obj` object
   * @param {Object} target target object that will be replaced
   * @param {Object} obj source object
   */
  assign(target, obj) {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        target[key] = obj[key];
      }
    }
  },
  /**
   *
   * @param {Object} obj deep clone a object
   */
  deepClone(obj) {
    return lodash.cloneDeep(obj);
  },
  /**
   * serialize an object to json string
   * @param {Object} obj
   */
  serialize(obj) {
    if (!obj) {
      return;
    }
    let self = this
    if (Array.isArray(obj)) {
      let newArray = [];
      obj.forEach((x) => {
        newArray.push(self.deepClone(x));
      });
      return JSON.stringify(newArray);
    } else {
      return JSON.stringify(self.deepClone(obj));
    }
  },
  /**
   * parse a json string to object
   * @param {String} jsonString
   */
  parse(jsonString) {
    return JSON.parse(jsonString);
  },
  /**
   * get parameters from url
   * @param {String} url
   */
  getParams(url) {
    if (typeof url !== "string") {
      return;
    }
    if (!url || url.indexOf("?") === -1) {
      return;
    }
    let params = url
      .trim()
      .split("?")[1]
      .replace("?", "");

    let result = {};
    params.split("&").forEach((x) => {
      let keyValue = x.split("=");
      result[keyValue[0]] = keyValue[1].trim();
    });
    return result;
  },
};
