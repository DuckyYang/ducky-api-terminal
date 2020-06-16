/*
 * @Author: your name
 * @Date: 2020-06-04 08:47:45
 * @LastEditTime: 2020-06-16 20:06:32
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
  // let accesstoken = store.getters.accesstoken;
  // if (!accesstoken) {
  //     return Promise.reject('user status is invalid')
  // }
  // // let request use accesstoken
  // config.headers["accesstoken"] = accesstoken;
  return config;
});
instance.interceptors.response.use(
  (response) => {
    // server will response like : {"code":200,"message":"用户名或密码错误!","success":false,"total":0,"count":0}
    // The `code` is http status,200 means success
    // The `success` means request execute successfully or not

    let res = response.data;
    if (res) {
      // if request sucess and execute successfully
      if (res.code === 200 && res.success) {
        return Promise.resolve({
          data: res.content,
          total: res.total,
          count: res.count,
        });
      } else {
        return Promise.reject(res.message || "server error");
      }
    } else {
      return Promise.reject(response.statusText);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

const http = {
  buildParams(url, params) {
    let p = [];
    for (const key in params) {
      let val = params[key];
      p.push(key + "=" + val);
    }
    return url.trim().replace("?", "") + "?" + p.join("&");
  },
};

const request = {
  get(url, params) {
    // build params
    if (store.state.mock) {
      // mock mode needs to put params to body,and then change http method to post
      return instance.post(url, params);
    } else {
      url = http.buildParams(url, params);
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
