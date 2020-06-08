<!--
 * @Author: your name
 * @Date: 2020-05-28 11:21:07
 * @LastEditTime: 2020-06-08 08:30:37
 * @LastEditors: Ducky Yang
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
    configs: Object,
    filter: String
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
    },
    render(reRender) {
      if (reRender) {
        this.nodes = [];
      }
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
              let c = utils.deepClone(item);

              c.level = node.level + 1;
              c.isCurrent = false;
              c.visible = true;
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
          r.isCurrent = false;
          r.visible = true;
          r.children = [];
          buildChildren(r);
          me.nodes.push(r);
        });
        // this.nodes = roots;
      }
    },
  },
  provide() {
    return {
      setCurrentNode: this.setCurrentNode
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
          node.children.forEach(item => {
            rec(item);
          });
        };
        this.nodes.forEach(item => {
          item.visible = true;
          rec(item);
        });
      } else {
        // search nodes contains filter key
        const rec = function(node) {
          if (node.children.length > 0) {
            node.visible = false;
            node.children.forEach(item => {
              node.visible = (rec(item) || node.visible );
            });
          } else {
            node.visible = node.title.toLowerCase().indexOf(val.trim().toLowerCase()) > -1;
          }
          return node.visible;
        };
        this.nodes.forEach(item => {
          if (item.children.length > 0) {
            item.visible = false;
            item.children.forEach(x => {
              item.visible = (rec(x) || item.visible) ;
            });
          }
        });
      }
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
