/*
 * @Author: your name
 * @Date: 2020-05-29 12:50:22
 * @LastEditTime: 2020-05-29 18:49:51
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ducky-api-terminal\src\ducky-ui\components\simpletree\tree-store.js
 */

import Node from "./node";
export default class TreeStore {
  constructor(options) {
    const that = this;

    this.data = [];
    this.nodes = [];
    this.currentNode = null;

    for (let option in options) {
      if (Object.prototype.hasOwnProperty.call(options, option)) {
        this[option] = options[option];
      }
    }

    // initial nodes
    const recurse = function(item, node) {
      item.children &&
        item.children.forEach((x) => {
          const child = new Node(x);
          node.children.push(child);
          recurse(x, child);
        });
    };
    this.data.forEach((item) => {
      const node = new Node(item);
      that.nodes.push(node);
      recurse(item, node);
    });
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
