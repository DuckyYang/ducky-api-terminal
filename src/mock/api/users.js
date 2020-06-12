/*
 * @Description:
 * @Version: 1.0
 * @Author: Ducky Yang
 * @Date: 2020-06-08 11:59:50
 * @LastEditors: Ducky Yang
 * @LastEditTime: 2020-06-12 12:11:34
 */

import Mock from "mockjs";

const api = {
  getUsers: {
    url: "api/users",
    type: "get",
    mock: {
      // if mock data needs some other params from request, set name into params array
      params: ["pageSize", "filterKey", "role"],
      data(params) {
        // params contains value that method needs, you can try to get from it
        let pageSize = params["pageSize"];
        // let filterKey = params["filterKey"];
        let role = params["role"];

        let data = [];
        let Random = Mock.Random;
        const roles = ["admin", "user"];
        for (let index = 0; data.length < pageSize; index++) {
          let template = {
            id: Random.guid(),
            name: Random.first(),
            account: Random.string(6, 12),
            password: Random.string(6, 18),
            role: role === "" ? roles[Random.integer(0, 1)] : role,
            email: Random.email(),
          };
          data.push(template);
        }
        return data;
      },
    },
  },
  signIn: {
    url: "api/token",
    type: "post",
    mock: {
      // if mock data needs some other params from request, set name into params array
      params: ["email", "password"],
      data(params) {
        console.log(params)
        return {}
      },
    },
  },
};

export default api;
