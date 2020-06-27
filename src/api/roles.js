/*
 * @Author: Ducky
 * @Date: 2020-06-12 19:57:51
 * @LastEditTime: 2020-06-26 11:58:21
 * @LastEditors: Ducky
 * @Description:
 * @FilePath: /ducky-api-terminal/src/api/roles.js
 * @
 */

import Request from "../plugin/request";

const request = new Request('api/roles')

export default {
  getAll() {
    return request.get();
  },
  getAuths() {
    return request.get('auths');
  },
  add(roleName) {
    return request.post('', { role: roleName });
  },
};
