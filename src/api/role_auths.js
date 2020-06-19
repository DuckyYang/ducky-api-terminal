/*
 * @Description:
 * @Version: 1.0
 * @Author: Ducky Yang
 * @Date: 2020-06-16 12:53:03
 * @LastEditors: Ducky Yang
 * @LastEditTime: 2020-06-18 16:25:56
 */

import request from "../plugin/request";

const baseURL = "api/RoleAuths/";
const api = {
  changeViewAuth(id) {
    return request.put(baseURL + id + "/viewable");
  },
  changeOperateAuth(id) {
    return request.put(baseURL + id + "/operable");
  },
};
export default api;
