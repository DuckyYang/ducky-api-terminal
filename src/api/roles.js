/*
 * @Author: Ducky
 * @Date: 2020-06-12 19:57:51
 * @LastEditTime: 2020-06-17 09:11:25
 * @LastEditors: Ducky Yang
 * @Description:
 * @FilePath: /ducky-api-terminal/src/api/roles.js
 * @
 */

import request from "../plugin/request";

const baseURL = "api/Roles";
const api = {
  getAll() {
    return request.get(baseURL);
  },
  getAuths() {
    return request.get(baseURL + '/auths');
  },
  add(roleName) {
    return request.post(baseURL, { role: roleName });
  },
};
export default api;
