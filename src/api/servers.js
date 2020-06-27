/*
 * @Author: Ducky
 * @Date: 2020-06-16 18:33:56
 * @LastEditTime: 2020-06-26 11:54:42
 * @LastEditors: Ducky
 * @Description:
 * @FilePath: /ducky-api-terminal/src/api/servers.js
 * @
 */
import Request from "../plugin/request";

const request = new Request('api/servers');

export default {
  get(filter, pageIndex, pageSize) {
    return request.get('', {
      filter: filter,
      pageIndex: pageIndex,
      pageSize: pageSize,
    });
  },
  add(data) {
    return request.post('', data);
  },
  edit(id, data) {
    return request.put('{id}', data, { id: id });
  },
  remove(id) {
    return request.delete('{id}', { id: id });
  },
  addCollection(id, name) {
    return request.post("{id}/collection", { name: name }, { id: id });
  },
};
