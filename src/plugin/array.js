/*
 * @Author: Ducky
 * @Date: 2020-05-24 18:29:49
 * @LastEditTime: 2020-06-08 20:34:02
 * @LastEditors: Ducky
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/plugin/array.js
 * @
 */
import utils from './utils'
Array.prototype.forEachExt = function (callback) {
    for (let index = 0; index < this.length; index++) {
        const item = this[index];
        let r = callback(item, index)
        if (typeof (r) === "boolean" && !r) {
            break
        }
    }
}
/**
 * remove the indicate array items 
 */
Array.prototype.remove = function (callback) {
    let arrs = this
    for (let index = 0; index < this.length; index++) {
        const item = this[index];
        if (callback(item, index)) {
            arrs.splice(index, 1)
        }
    }
    return arrs
}
/**
 * transform normal array to recursion array
 */
Array.prototype.transform = function () {
    let result = []
    let data = this;
    // initial nodes from data
    if (data && data.length > 0) {
        let key = 'id';
        let pidKey = 'pId';

        let buildChildren = function (node) {
            // find children nodes
            let children = data.filter(item => item[pidKey] === node[key]);
            if (children.length > 0) {
                children.forEach(item => {
                    let c = utils.deepClone(item);

                    c.level = node.level + 1;
                    c.children = [];

                    node.children.push(c);
                    buildChildren(c);
                });
            }
        };

        let roots = this.data.filter(item => {
            return item[pidKey] === 0 || item[pidKey] === "";
        });

        // foreach roots, build children node
        roots.forEach(root => {
            let r = utils.deepClone(root);

            r.level = 0;
            r.children = [];
            buildChildren(r);
            result.push(r);
        });
    }
    return result
}