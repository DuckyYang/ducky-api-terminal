/*
 * @Description: 
 * @Version: 1.0
 * @Author: Ducky Yang
 * @Date: 2020-06-16 12:22:50
 * @LastEditors: Ducky
 * @LastEditTime: 2020-06-16 19:55:14
 */ 
import request from '../plugin/request'

const baseURL = 'api/menus';
 const api = {
     get(){
         return request.get(baseURL);
     }
 }

 export default api;