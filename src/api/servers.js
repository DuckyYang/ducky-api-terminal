/*
 * @Author: Ducky
 * @Date: 2020-06-16 18:33:56
 * @LastEditTime: 2020-06-18 17:00:30
 * @LastEditors: Ducky Yang
 * @Description:
 * @FilePath: /ducky-api-terminal/src/api/servers.js
 * @
 */
import request from "../plugin/request";

const baseURL = "api/servers";
const api = {
  get(filter, pageIndex, pageSize) {
    return request.get(baseURL, {
      filter: filter,
      pageIndex: pageIndex,
      pageSize: pageSize,
    });
  },
  add(data) {
    return request.post(baseURL, data);
  },
  edit(id, data) {
    return request.put(baseURL + "/" + id, data);
  },
  remove(id) {
    return request.delete(baseURL + "/" + id);
  },
  addCollection(id, name) {
    return request.post(baseURL + "/" + id + "/collection", { name: name });
  },
  addRequest(id, name, collectionId) {
    let url = "";
    if (collectionId) {
      url = baseURL + "/" + id + "/" + collectionId + "/request";
    } else {
      url = baseURL + "/" + id + "/request";
    }
    return request.post(url, {
      name: name,
    });
  },
};

export default api;
