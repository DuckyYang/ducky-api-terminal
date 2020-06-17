/*
 * @Description: 
 * @Version: 1.0
 * @Author: Ducky Yang
 * @Date: 2020-06-17 12:46:08
 * @LastEditors: Ducky Yang
 * @LastEditTime: 2020-06-17 12:46:47
 */ 
import request from '../plugin/request'

const api = {
    get(){
        return request.get();
    }
}
export default api;