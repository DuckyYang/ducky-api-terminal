<!--
 * @Author: your name
 * @Date: 2020-05-28 12:30:22
 * @LastEditTime: 2020-06-01 20:25:04
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
      >
        <span :style="{paddingLeft: (node.level+1)*15+'px'}">
          <slot name="title" :node="node"></slot>
        </span>
      </span>
      <!-- <span
        @click="onNodeClick(node)"
        class="ducky-simpletree-node__title"
        :class="{'is-current': node.isCurrent}"
        v-else
      >
        <span :style="{paddingLeft: (node.level+1)*15+'px'}">
          
          <slot name="title" :node="node"></slot>
        </span>
      </span> -->
      <!-- else render node's child nodes -->
      <div
        class="ducky-simpletree-node__panel"
        v-show="node.open"
        v-for="(child, index) in node.children"
        :key="index"
      >
        <simple-tree-node :node="child">
          <template #title="slotProp">
             <slot name="title" :node="slotProp.node"></slot>
          </template>
        </simple-tree-node>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "simple-tree-node",
  data() {
    return {};
  },
  props: {
    node: Object
  },
  inject: ["setCurrentNode"],
  methods: {
    onNodeClick(node) {
      this.setCurrentNode(node)
    }
  },
  created() {}
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
    box-sizing: border-box;
    span {
      display: block;
      width: 100%;
      box-sizing: border-box;
    }
  }
  .ducky-simpletree-node__panel {
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }
}
</style>