/*
 * @Description: 
 * @Version: 1.0
 * @Author: Ducky Yang
 * @Date: 2020-06-16 12:22:50
 * @LastEditors: Ducky
 * @LastEditTime: 2020-06-26 11:50:34
 */
import Request from '../plugin/request';

const request = new Request('api/menus');
export default {
    get() {
        return request.get();
    }
};