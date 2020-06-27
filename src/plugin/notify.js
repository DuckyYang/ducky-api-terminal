/*
 * @Author: Ducky
 * @Date: 2020-06-27 11:00:34
 * @LastEditTime: 2020-06-27 11:14:32
 * @LastEditors: Ducky
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/plugin/notify.js
 * @
 */ 

import utils from './utils'
class Notify{
    constructor(){
        const namespaceId =utils.uuid(); 
        this.subscriber = {
            namespace: 'subscriber_'+namespaceId,
            pool: []
        }
        this._noob = function(){}
    }

    Subscribe(name,event){
        let subscriberName = this.subscriber.namespace+'_'+name;
        let subscriber = {
            name: subscriberName,
            event: event || this._noob
        };
        this.subscriber.pool.push(subscriber);
    }

    Publish(name, data){
        let subscriberName = this.subscriber.namespace+'_'+name;
        for (let index = 0; index < this.subscriber.length; index++) {
            const sub = this.subscriber[index];
            if (sub.name === subscriberName) {
                sub.event(data);
            }
        }
    }
}

export default new Notify();