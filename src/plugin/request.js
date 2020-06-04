/*
 * @Author: your name
 * @Date: 2020-06-04 08:47:45
 * @LastEditTime: 2020-06-04 22:11:03
 * @LastEditors: Ducky
 * @Description: In User Settings Edit
 * @FilePath: /ducky-api-terminal/src/plugin/request.js
 */

import axios from "axios";
import store from "../store/index";

const instance = axios.create({
  // baseUrl:
  //   process.env.NODE_ENV === "production" ? "oa.cnki.net" : "localhost",
  timeout: 15000,
  headers: [],
});
instance.interceptors.request.use((config) => {
  let accesstoken = store.getters.accesstoken;
  // if (!accesstoken) {
  //     return Promise.reject('user status is invalid')
  // }
  // let request use accesstoken
  config.headers["accesstoken"] = accesstoken;
  return config;
});
instance.interceptors.response.use(
  (response) => {
    let res = response.data;
    // request success
    if (res.Success && res.Success) {
      // return default request data
      return Promise.resolve(
        {
          data: res.Content,
          total: res.Total,
          count: res.Count,
        }
      );
    } else {
      return Promise.reject(res.Message || "request failed");
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

const http = {
  buildParams(url, params) {
    let p = []
    for (const key in params) {
      let val = params[key]
      p.push(key + '=' + val)
    }
    return url.trim().replace('?', '') + '?' + p.join('&')
  }
}

const request = {
  get(url, params) {
    // build params
    if (store.state.mock) {
      // mock mode needs to put params to body,and then change http method to post
      return instance.post(url, params)
    } else {
      url = http.buildParams(url, params)
      return instance.get(url);
    }
  },
  post(url, data) {
    return instance.post(url, data);
  },
  put(url, data) {
    return instance.put(url, data);
  },
  delete(url) {
    return instance.delete(url);
  },
};

export default request;
