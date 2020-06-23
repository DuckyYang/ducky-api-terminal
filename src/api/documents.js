/*
 * @Description: 
 * @Version: 1.0
 * @Author: Ducky Yang
 * @Date: 2020-06-17 12:46:08
 * @LastEditors: Ducky
 * @LastEditTime: 2020-06-23 21:37:59
 */ 
import request from '../plugin/request'

const baseURL = 'api/documents'
const api = {
    get(){
        return request.get(baseURL);
    },
    remove(id){
        return request.delete(baseURL+'/'+id)
    }
}
export default api;