/* eslint-disable no-dupe-class-members */
/*
 * @Author: your name
 * @Date: 2020-06-04 08:47:45
 * @LastEditTime: 2020-06-26 12:12:10
 * @LastEditors: Ducky
 * @Description: In User Settings Edit
 * @FilePath: /ducky-api-terminal/src/plugin/request.js
 */

import axios from "axios";
import store from "../store/index";
import utils from '../plugin/http-utils'
import './string'

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

class Request {
  /**
   * 
   * @param {String} baseURL request base url,just like 'api/documents'
   */
  constructor(baseURL) {
    this.baseURL = baseURL;
  }
  /**
   * Get data from server
   * @param {String} url request url
   * @param {Object} params request data, get method will build params to url
   * @param {Object} restfulParams restful api's parameters
   */
  get(url, params, restfulParams) {
    const uri = utils.resolveUri(this.combine(url), restfulParams);
    if (store.state.mock) {
      return instance.post(uri, params);
    } else {
      return instance.get(utils.buildParams(uri, params));
    }
  }
  /**
   * Post data to server
   * @param {String} url request url
   * @param {Object} data request data
   * @param {Object} restfulParams restful api's parameters
   */
  post(url, data, restfulParams) {
    const uri = utils.resolveUri(this.combine(url), restfulParams);
    return instance.post(uri, data);
  }
  /**
   * Put data to server
   * @param {String} url request url
   * @param {Object} data request data
   * @param {Object} restfulParams restful api's parameters
   */
  put(url, data, restfulParams) {
    const uri = utils.resolveUri(this.combine(url), restfulParams);
    return instance.put(uri, data);
  }
  /**
   * Delete data
   * @param {String} url request url
   * @param {Object} restfulParams restful api's parameters
   */
  delete(url, restfulParams) {
    const uri = utils.resolveUri(this.combine(url), restfulParams);
    return instance.delete(uri);
  }
  combine(url) {
    if (!url || typeof url !== 'string') {
      url = ''
    }
    return this.baseURL.trimEnd('/') + (url ? ( '/' + url.trimStart('/')) : '');
  }
}

export default Request;
