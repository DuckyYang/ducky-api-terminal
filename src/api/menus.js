/*
 * @Description: 
 * @Version: 1.0
 * @Author: Ducky Yang
 * @Date: 2020-06-16 12:22:50
 * @LastEditors: Ducky Yang
 * @LastEditTime: 2020-06-16 12:24:10
 */ 
import request from '../plugin/request'
 const api = {
     get(){
         return request.get('api/menus');
     }
 }

 export default api;