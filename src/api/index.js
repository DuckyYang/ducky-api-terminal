/*
 * @Author: Ducky
 * @Date: 2020-06-26 10:47:04
 * @LastEditTime: 2020-06-26 17:09:57
 * @LastEditors: Ducky
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/api/index.js
 * @
 */
import collections from './collections'
import request from './request'
import logs from './logs'
import menus from './menus'
import role_auths from './role_auths'
import roles from './roles'
import servers from './servers'
import users from './users'
import accesstoken from './accesstoken'

const api = {
    collections: collections,
    request: request,
    logs: logs,
    menus: menus,
    role_auths: role_auths,
    roles: roles,
    servers: servers,
    users: users,
    accesstoken: accesstoken
}

export default api;
