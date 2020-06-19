/*
 * @Description: 
 * @Version: 1.0
 * @Author: Ducky Yang
 * @Date: 2020-06-17 12:46:08
 * @LastEditors: Ducky Yang
 * @LastEditTime: 2020-06-18 16:26:44
 */ 
import request from '../plugin/request'

const baseURL = 'api/documents'
const api = {
    get(){
        return request.get(baseURL);
    }
}
export default api;