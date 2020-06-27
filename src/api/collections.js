/*
 * @Author: Ducky
 * @Date: 2020-06-26 10:43:40
 * @LastEditTime: 2020-06-26 12:27:55
 * @LastEditors: Ducky
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/api/collections.js
 * @
 */
import Request from '../plugin/request';

const request = new Request('api/collections');
export default {
    addRequest(id, name) {
        return request.post('{id}/request', { name: name }, { id: id });
    },
    remove(id){
        return request.delete('{id}',{},{id:id});
    },
    rename(id,name){
        return request.put('{id}/name',{name:name},{id:id});
    }
}