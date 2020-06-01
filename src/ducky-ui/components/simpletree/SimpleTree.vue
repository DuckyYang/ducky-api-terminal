<!--
 * @Author: your name
 * @Date: 2020-05-28 11:21:07
 * @LastEditTime: 2020-06-01 20:15:05
 * @LastEditors: Ducky
 * @Description: In User Settings Edit
 * @FilePath: /ducky-api-terminal/src/ducky-ui/components/simpletree/SimpleTree.vue
-->
<template>
  <!-- tree root -->
  <div class="ducky-simpletree" role="tree">
    <!-- tree root node list -->
    <simple-tree-node v-for="(node, index) in nodes" :key="index" :node="node">
      <template #title="slotProp">
        <slot name="title" :node="slotProp.node"></slot>
      </template>
    </simple-tree-node>
  </div>
</template>
<script>
import simpleTreeNode from "./SimpleTreeNode";
import utils from "../../utils";
export default {
  data() {
    return {
      nodes: [],
      defaultConfigs: {
        simpleDataKey: { idKey: "id", pIdKey: "pid" }
      },
      isTree: true,
      currentNode: null
    };
  },
  props: {
    data: Array,
    configs: Object
  },
  components: {
    "simple-tree-node": simpleTreeNode
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
    }
  },
  provide() {
    return {
      setCurrentNode: this.setCurrentNode
    };
  },
  mounted() {
    let me = this;

    // initial nodes from data
    if (this.data && this.data.length > 0) {
      let key = this.defaultConfigs.simpleDataKey.idKey;
      let pidKey = this.defaultConfigs.simpleDataKey.pIdKey;

      let buildChildren = function(node) {
        // find children nodes
        let children = me.data.filter(item => item[pidKey] === node[key]);
        if (children.length > 0) {
          children.forEach(item => {
            let c = utils.deepClone(item)

            c.level = node.level+1
            c.isCurrent = false
            c.children = []

            node.children.push(c)
            buildChildren(c);
          });
        }
      };

      let roots = this.data.filter(item => {
        return item[pidKey] === 0 || item[pidKey] === "";
      });

      // foreach roots, build children node
      roots.forEach(root => {
        let r = utils.deepClone(root)

        r.level = 0
        r.isCurrent = false
        r.children=[]
        buildChildren(r);
        me.nodes.push(r)
      });
      // this.nodes = roots;
    }
  }
};
</script>
<style lang="scss" scoped>
.ducky-simpletree {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  .ducky-simpletree-node {
    width: 100%;
    display: block;
  }
  .ducky-simpletree-node__wrapper {
    width: 100%;
    height: 100%;

    .ducky-simpletree-node__title {
      display: inline-block;
      width: 100%;
      height: 32px;
      line-height: 32px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      cursor: pointer;
    }
    .ducky-simpletree-node__panel {
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;
    }
  }
}
</style>
