/*
 * @Description:
 * @Version: 1.0
 * @Author: Ducky Yang
 * @Date: 2020-06-08 11:59:50
 * @LastEditors: Ducky Yang
 * @LastEditTime: 2020-06-12 12:49:48
 */

import request from "../plugin/request";

const api = {
  getUsers(filter, role, pageIndex, pageSize) {
    return request.get("api/users", {
      filter: filter,
      role: role,
      pageIndex: pageIndex,
      pageSize: pageSize,
    });
  },
  signIn(email, password) {
    const url = "api/token";
    return request.post(url, {
      account: email,
      password: password,
    });
  },
};

export default api;
