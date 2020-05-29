/*
 * @Author: your name
 * @Date: 2020-05-29 13:43:08
 * @LastEditTime: 2020-05-29 18:43:08
 * @LastEditors: Please set LastEditors
 * @Description: Every tree node has own properties and functions
 * @FilePath: \ducky-api-terminal\src\ducky-ui\components\simpletree\model\node.js
 */ 
export default class Node{
    constructor(options){
        this.level=0
        this.isCurrent=false
        this.expanded=false

        for (let option in options) {
            if (Object.prototype.hasOwnProperty.call(options,option)) {
                this[option] = options[option]
            }
         }
    }
    toggleExpanded(){
        this.expanded = !this.expanded
    }
    setCurrentNode(){
        this.isCurrent = true
    }
}
