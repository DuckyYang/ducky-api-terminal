/*
 * @Description: 
 * @Version: 1.0
 * @Author: Ducky Yang
 * @Date: 2020-06-08 08:48:49
 * @LastEditors: Ducky Yang
 * @LastEditTime: 2020-06-08 09:13:29
 */ 
import utils from './utils'
const cache = {
    /**
     * set value to cache
     * @param {String} key cache key
     * @param {Object} value cache value
     */
    set(key,value){
        localStorage.setItem(key,utils.serialize(value))
    },
    /**
     * get value from cache
     * @param {String} key cache key
     */
    get(key){
        const cacheValue = localStorage.getItem(key)
        if (cacheValue) {
           return utils.parse(cacheValue)
        }
        return null
    },
    /**
     * remove specified key from cache
     * @param {String} key cache key
     */
    remove(key){
        localStorage.removeItem(key)
    },
    /**
     * remove all keys from cache
     */
    clear(){
        localStorage.clear()
    },
    /**
     * update value
     * @param {String} key cache key
     * @param {Object} newValue new value
     */
    update(key,newValue){
        this.remove(key)
        this.set(key,newValue)
    }
}
export default cache