/*
 * @Description:
 * @Version: 1.0
 * @Author: Ducky Yang
 * @Date: 2020-06-08 11:59:50
 * @LastEditors: Ducky Yang
 * @LastEditTime: 2020-06-13 15:26:33
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
  add(data) {
    return request.post("api/users", data);
  },
  edit(id, data) {
    return request.put("api/users/" + id, data);
  },
  remove(id){
    return request.delete("api/users/"+id);
  },
  enable(id){
    return request.put("api/users/"+id+"/enabled");
  },
  lock(id){
    return request.put("api/users/"+id+"/locked");
  }
};

export default api;
