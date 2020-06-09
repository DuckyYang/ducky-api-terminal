<!--
 * @Description: 
 * @Version: 1.0
 * @Author: Ducky Yang
 * @Date: 2020-06-09 12:41:31
 * @LastEditors: Ducky Yang
 * @LastEditTime: 2020-06-09 12:55:09
-->
<template>
  <div class="ducky-tree-table" role="tree">
    <!-- tree root node list -->
    <tree-node v-for="(node, index) in nodes" :key="index" :node="node">
      <template #title="slotProp">
        <slot name="title" :node="slotProp.node"></slot>
      </template>
    </tree-node>
  </div>
</template>
<script>
import TreeNode from "./TreeNode";
import utils from "../../utils";
export default {
  data() {
    return {
      nodes: [],
      isTree: true,
      currentNode: null,
    };
  },
  props: {
    data: Array,
    filter: String,
  },
  components: {
    "tree-node": TreeNode,
  },
  methods: {
    setCurrentNode(node) {
      if (this.currentNode) {
        this.currentNode.isCurrent = false;
      }

      node.isCurrent = true;
      if (node.children.length > 0) {
        node.open = !node.open;
      }
      this.currentNode = node;

      this.$emit("node-click", node);
    },
    render(reRender) {
      if (!this.data || this.data.length === 0) {
        return;
      }
      if (reRender) {
        this.nodes = [];
      }
      let me = this;

      const buildChildren = function(node, root) {
        if (node.children && node.children.length > 0) {
          node.children.forEach((child) => {
            let r = utils.deepClone(child);

            r.level = root.level + 1;
            r.isCurrent = false;
            r.visible = true;
            r.children = [];

            root.children.push(r);
            buildChildren(child, r);
          });
        }
      };

      this.data.forEach((root) => {
        let r = utils.deepClone(root);

        r.level = 0;
        r.isCurrent = false;
        r.visible = true;
        r.children = [];

        me.nodes.push(r);
        buildChildren(root, r);
      });
    },
  },
  provide() {
    return {
      setCurrentNode: this.setCurrentNode,
    };
  },
  mounted() {
    this.render(false);
  },
  watch: {
    data: function() {
      this.render(true);
    },
    filter: function(val) {
      if (!val) {
        const rec = function(node) {
          node.visible = true;
          node.children.forEach((item) => {
            rec(item);
          });
        };
        this.nodes.forEach((item) => {
          item.visible = true;
          rec(item);
        });
      } else {
        // search nodes contains filter key
        const rec = function(node) {
          if (node.children.length > 0) {
            node.visible = false;
            node.children.forEach((item) => {
              node.visible = rec(item) || node.visible;
            });
          } else {
            node.visible =
              node.title.toLowerCase().indexOf(val.trim().toLowerCase()) > -1;
          }
          return node.visible;
        };
        this.nodes.forEach((item) => {
          if (item.children.length > 0) {
            item.visible = false;
            item.children.forEach((x) => {
              item.visible = rec(x) || item.visible;
            });
          }
        });
      }
    },
  },
};
</script>
