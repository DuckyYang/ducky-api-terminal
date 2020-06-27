/*
 * @Description:
 * @Version: 1.0
 * @Author: Ducky Yang
 * @Date: 2020-06-08 11:59:50
 * @LastEditors: Ducky
 * @LastEditTime: 2020-06-26 11:58:12
 */

import Request from "../plugin/request";

const request = new Request('api/users')
const api = {
  getUsers(filter, role, pageIndex, pageSize) {
    return request.get("", {
      filter: filter,
      role: role,
      pageIndex: pageIndex,
      pageSize: pageSize,
    });
  },
  add(data) {
    return request.post("", data);
  },
  edit(id, data) {
    return request.put('{id}', data, { id: id });
  },
  remove(id) {
    return request.delete('{id}', { id: id });
  },
  enable(id) {
    return request.put("{id}/enabled", { id: id });
  },
  lock(id) {
    return request.put("{id}/locked", { id: id });
  }
};

export default api;
