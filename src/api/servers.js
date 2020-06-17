/*
 * @Author: Ducky
 * @Date: 2020-06-16 18:33:56
 * @LastEditTime: 2020-06-17 12:41:52
 * @LastEditors: Ducky Yang
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/api/servers.js
 * @
 */
import request from '../plugin/request'

const baseURL = 'api/servers'
const api = {
    get(filter, pageIndex, pageSize) {
        return request.get(baseURL, {
            filter: filter,
            pageIndex: pageIndex,
            pageSize: pageSize
        });
    },
    add(data){
        return request.post(baseURL,data);
    },
    edit(id,data){
        return request.put(baseURL+'/'+id,data);
    },
    remove(id){
        return request.delete(baseURL+'/'+id);
    }
}

export default api;