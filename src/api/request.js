/*
 * @Description: 
 * @Version: 1.0
 * @Author: Ducky Yang
 * @Date: 2020-06-17 12:46:08
 * @LastEditors: Ducky
 * @LastEditTime: 2020-06-26 17:17:47
 */ 
import Request from '../plugin/request';

const request = new Request('api/request');
export default {
    get(){
        return request.get();
    },
    remove(id){
        return request.delete('{id}',{id:id});
    },
    update(id,data){
        return request.put('{id}',data,{id:id});
    }
};