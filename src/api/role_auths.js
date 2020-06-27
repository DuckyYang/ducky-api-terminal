/*
 * @Description:
 * @Version: 1.0
 * @Author: Ducky Yang
 * @Date: 2020-06-16 12:53:03
 * @LastEditors: Ducky
 * @LastEditTime: 2020-06-26 11:51:39
 */

import Request from "../plugin/request";

const request = new Request('api/RoleAuths');

export default {
  changeViewAuth(id) {
    return request.put('{id}/viewable', {}, { id: id });
  },
  changeOperateAuth(id) {
    return request.put('{id}/operable', {}, { id: id });
  },
};
