/*
 * @Author: Ducky
 * @Date: 2020-06-26 11:55:35
 * @LastEditTime: 2020-06-26 11:59:54
 * @LastEditors: Ducky
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/api/accesstoken.js
 * @
 */
import Request from '../plugin/request';

const request = new Request('api/token')

export default {
    get(email, password) {
        return request.post('', {
            account: email,
            password: password,
        });
    },
}