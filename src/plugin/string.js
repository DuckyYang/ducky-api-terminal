/*
 * @Author: Ducky
 * @Date: 2020-06-26 11:36:47
 * @LastEditTime: 2020-06-26 11:43:22
 * @LastEditors: Ducky
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/plugin/string.js
 * @
 */

 
/**
 * @param {String} str remove target string from end
 */
String.prototype.trimEnd = function(str){
    return this.replace(new RegExp('\\'+str+'+$', 'g'), '');
}
/**
 * @param {String} str remove target string from start
 */
String.prototype.trimStart = function(str){
    return this.replace(new RegExp('^\\'+str+'+', 'g'), '');
}