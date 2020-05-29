<!--
 * @Author: your name
 * @Date: 2020-05-28 12:30:22
 * @LastEditTime: 2020-05-29 12:48:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ducky-api-terminal/src/ducky-ui/components/simpletree/SimpleTreeNode.vue
-->
<template>
  <!-- node item -->
  <div class="ducky-simpletree-node">
    <div class="ducky-simpletree-node__wrapper">
      <!-- only render node's title if node doesn't have any child nodes -->
      <span
        @click="onNodeClick(node)"
        class="ducky-simpletree-node__title"
        :class="{'is-current': node.isCurrent}"
        v-if="node.children.length === 0"
        :style="{ paddingLeft: (node.level + 1) * 15 + 'px' }"
        
      >{{ node.title }}</span>
      <span 
        @click="expandNode(node)" 
        class="ducky-simpletree-node__title" 
        v-else
        :style="{ paddingLeft: (node.level + 1) * 15 + 'px' }"
        >
        <i :class="node.open ? 'el-icon-caret-bottom' : 'el-icon-caret-right'"></i>
        {{ node.title }}
        <i class="el-icon-plus"></i>
      </span>
      <!-- else render node's child nodes -->
      <div
        class="ducky-simpletree-node__panel"
        v-show="node.open"
        v-for="(child, index) in node.children"
        :key="index"
      >
        <simpleTreeNode :node="child" @node-click="$emit('node-click',$event)"></simpleTreeNode>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "simpleTreeNode",
  data() {
    return {
      prevCurrentNode:null
    };
  },
  props: {
    node: Object
  },
  methods: {
    expandNode(node) {
      node.open = !node.open;
    },
    onNodeClick(node) {
      console.log(this.prevCurrentNode)
      if (this.prevCurrentNode !== null) {
        this.prevCurrentNode.isCurrent=false
      }
      this.prevCurrentNode = node
      node.isCurrent = true;
      this.$emit("node-click", node);
    }
  }
};
</script>
<style lang="scss" scoped>
.ducky-simpletree-node {
  width: 100%;
  display: block;
}
.is-current {
  background-color: #f6f6f6;
}
.is-collapsed{
  height: 0px;
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
    box-sizing: border-box;
  }
  .ducky-simpletree-node__panel {
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }
}
</style>