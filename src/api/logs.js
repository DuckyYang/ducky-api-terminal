/*
 * @Author: your name
 * @Date: 2020-06-04 12:44:04
 * @LastEditTime: 2020-06-12 12:13:20
 * @LastEditors: Ducky Yang
 * @Description: In User Settings Edit
 * @FilePath: /ducky-api-terminal/src/api/logs.js
 */

import request from "../plugin/request";

const api = {
  getLogs: {
    url: "api/workflow2.0/task/getlogs",
    get(params) {
      return request.get(this.url,params);
    },
  },
};

export default api;
