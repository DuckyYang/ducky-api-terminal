/*
 * @Author: Ducky
 * @Date: 2020-06-12 19:57:51
 * @LastEditTime: 2020-06-12 20:00:47
 * @LastEditors: Ducky
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/api/roles.js
 * @
 */ 
import request from '../plugin/request'
const api = {
    getAll(){
        return request.get('api/roles');
    }
}
export default api;