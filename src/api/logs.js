/*
 * @Author: your name
 * @Date: 2020-06-04 12:44:04
 * @LastEditTime: 2020-06-04 21:21:07
 * @LastEditors: Ducky
 * @Description: In User Settings Edit
 * @FilePath: /ducky-api-terminal/src/api/logs.js
 */

import request from "../plugin/request";
import Mock from "mockjs";
import utils from "../plugin/utils";

const api = {
  getLogs: {
    url: "api/workflow2.0/task/getlogs",
    type: "get",
    get(params) {
      return request.get(this.url,params);
    },
    mock: {
      params: ["pageSize"],
      data(params) {
        let pageSize = params['pageSize']
        
        let data = [];
        let Random = Mock.Random;
        const methods = ["get", "post", "put", "delete"];
        const stringPool = "abcdefghijklmnopqrstuvwxyz";
        for (let index = 0; index < pageSize; index++) {
          let template = {
            id:Random.guid(),
            host: Random.domain(),
            route: Random.url('http'),
            method: methods[Random.integer(0, 3)],
            headers: "accesstoken=" + Random.string(stringPool, 16, 16),
            request: utils.serialize({
              id: Random.id(),
              name: Random.string(stringPool,3,10),
            }),
            response: utils.serialize({
              success: Random.boolean(),
              content: Random.string(stringPool,3,10),
              message: Random.string(stringPool,3,10),
              total: 0,
            }),
            requestTime: Random.date("yyyy/MM/dd HH:mm:ss"),
            application: "workflow2.0",
            isError: Random.boolean(),
            error: Random.string(stringPool, 10, 30),
            duration: Random.integer(10, 1000),
          };
          data.push(template);
        }
        return data;
      },
    },
  },
};

export default api;
