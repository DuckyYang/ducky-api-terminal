/*
 * @Author: Ducky
 * @Date: 2020-05-24 18:29:49
 * @LastEditTime: 2020-05-24 20:07:36
 * @LastEditors: Ducky
 * @Description: 
 * @FilePath: /ducky-ui/src/plugin/JsExt/ArrayExt.js
 * @
 */ 
Array.prototype.forEachExt = function(callback){
    for (let index = 0; index < this.length; index++) {
        const item = this[index];
        let r =callback(item,index) 
        if (typeof(r) === "boolean" && !r) {
            break
        }
    }
}
/**
 * remove the indicate array items 
 */
Array.prototype.remove = function(callback){
    let arrs = this
    for (let index = 0; index < this.length; index++) {
        const item = this[index];
        if (callback(item,index)) {
            arrs.splice(index,1)
        }
    }
    return arrs
}