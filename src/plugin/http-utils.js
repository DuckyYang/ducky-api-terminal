/*
 * @Author: Ducky
 * @Date: 2020-06-26 11:04:39
 * @LastEditTime: 2020-06-26 11:48:07
 * @LastEditors: Ducky
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/plugin/http-utils.js
 * @
 */

const utils = {
    buildParams(url, params) {
        if (!params || typeof params !== 'object') {
            params = {};
        }
        let p = [];
        for (const key in params) {
          let val = params[key];
          p.push(key + "=" + val);
        }
        return url.trim().replace("?", "") + "?" + p.join("&");
    },
    /**
     * resolve restful api url to complete uri for request
     * @param {String} url restful url,just like 'api/servers/{id}/name'
     * @param {Object} params the restful url contains parameters object, like: {id: 1}
     * @returns {string} return resolved uri, like 'api/servers/1/name'
     */
    resolveUri(url, params) {
        if (!params || typeof params !== 'object') {
            params = {};
        }
        for (const p in params) {
            let replaceHolder = '{' + p + '}';

            if (url.indexOf(replaceHolder) > -1) {
                url = url.replace(replaceHolder, params[p]);
            }
        }
        return url;
    }
}
export default utils;
