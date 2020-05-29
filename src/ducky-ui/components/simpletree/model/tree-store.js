/*
 * @Author: your name
 * @Date: 2020-05-29 12:50:22
 * @LastEditTime: 2020-05-29 13:42:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ducky-api-terminal\src\ducky-ui\components\simpletree\tree-store.js
 */

import utils from "../../../utils";
export default class TreeStore {
  constructor(options) {
    this.nodes = [];
    this.currentNode = null;

    for (let option in options) {
       if (Object.prototype.hasOwnProperty.call(options,option)) {
           this[option] = options[option]
       }
    }

    // initial nodes
    const recurse = function(node) {
      node.children &&
        node.children.forEach((x) => {
          if (node.level === undefined) {
            utils.setProperty(x, "level", node.level + 1);
          }
          if (node.isCurrent === undefined) {
            utils.setProperty(x, "isCurrent", false);
          }
          this.recurse(x);
        });
    };
    this.nodes.forEach((item) => {
      if (item.level === undefined) {
        utils.setProperty(item, "level", 0);
      }
      if (item.isCurrent === undefined) {
        utils.setProperty(item, "isCurrent", false);
      }
      recurse(item);
    });
  }

  expand(node) {
    node.open = true;
  }
  collapse(node) {
    node.open = false;
  }
  setCurrentNode(node) {
    const prevNode = this.currentNode;
    if (!prevNode) {
      prevNode.isCurrent = false;
    }
    this.currentNode = node;
    this.currentNode.isCurrent = true;
  }
  getCurrentNode() {
    return this.currentNode;
  }
}
