<!--
 * @Author: your name
 * @Date: 2020-05-28 12:30:22
 * @LastEditTime: 2020-05-28 21:30:41
 * @LastEditors: Ducky
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
      >{{ node.title }}</span>
      <span @click="expandNode(node)" class="ducky-simpletree-node__title" v-else>
        <i :class="node.open ? 'el-icon-caret-bottom' : 'el-icon-caret-right'"></i>
        {{ node.title }}
        <i class="el-icon-plus"></i>
      </span>
      <!-- else render node's child nodes -->
      <div
        class="ducky-simpletree-node__panel"
        :style="{ paddingLeft: (node.level + 1) * 10 + 'px' }"
        v-for="(child, index) in node.children"
        :key="index"
        v-show="node.open"
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
    return {};
  },
  props: {
    node: Object
  },
  methods: {
    expandNode(node) {
      node.open = !node.open;
    },
    onNodeClick(node) {
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
    padding-left: 10px;
    box-sizing: border-box;
    overflow: hidden;
  }
}
</style>