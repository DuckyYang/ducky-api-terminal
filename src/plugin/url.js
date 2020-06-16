/*
 * @Author: Ducky
 * @Date: 2020-06-16 18:34:24
 * @LastEditTime: 2020-06-16 20:03:36
 * @LastEditors: Ducky
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/plugin/url.js
 * @
 */

class Url {
    constructor() {
        this.baseURL = '';
        this.uri = '';
    }
    /**
     * 
     * @param {String} baseURL 
     * @param {String} uri 
     */
    combine(baseURL, uri) {
        if (baseURL.endsWith('/')) {
            baseURL = baseURL.substr(0, baseURL.length - 1)
        }
        if (uri.startsWith('/')) {
            uri = uri.substr(1, uri.length - 1);
        }
        return baseURL + '/' + uri;
    }
    /**
     * Replace url's parameter placeholder,such as http://localhost/api/todos/{id}. Return complete url after replacement.
     * throw exception if placeholder doesn't exists in params
     * @param {String} uri request url
     * @param {Object} params request params
     */
    resolve(uri, params) {
        let patten = /{.*?}/;
        var matches = patten.exec(uri);

        matches.forEach(x => {
            let key = x.replace('{', '').replace('}', '');
            let value = params[key];
            if (value === undefined) {
                console.warn("URL resolve: params doesn't exist " + key);
            } else {
                uri = uri.replace('{' + key + '}', value);
            }
        })
        return uri
    }
    
}

export default Url;