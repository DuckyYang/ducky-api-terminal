<!--
 * @Author: your name
 * @Date: 2020-05-28 11:21:07
 * @LastEditTime: 2020-05-29 18:51:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /ducky-api-terminal/src/ducky-ui/components/simpletree/SimpleTree.vue
-->
<template>
  <!-- tree root -->
  <div class="ducky-simpletree" role="tree">
    <!-- tree root node list -->
    <div class="ducky-simpletree-node" v-for="(node, index) in store.nodes" :key="index">
      <!-- tree node wrapper panel -->
      <div class="ducky-simpletree-node__wrapper">
        <!-- tree title -->
        <span class="ducky-simpletree-node__title" @click="expandNode(node)">
          <i :class="node.open ? 'el-icon-caret-bottom' : 'el-icon-caret-right'"></i>
          {{ node.title }}
          <i class="el-icon-plus"></i>
        </span>
        <!-- tree node children panel -->
        <div
          class="ducky-simpletree-node__panel"
          v-for="(child, index) in node.children"
          :key="index"
          v-show="node.open"
        >
          <simple-tree-node :node="child" @node-click="$emit('node-click',$event)"></simple-tree-node>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import simpleTreeNode from "./SimpleTreeNode";
import TreeStore from './model/tree-store'
export default {
  data(){
    return{
      store:null,
      isTree:true
    }
  },
  props: {
    data: Array
  },
  components: {
    "simple-tree-node": simpleTreeNode
  },
  methods: {
    expandNode(node) {
      node.open =!node.open
    }
  },
  created() {
    this.store = new TreeStore({
      data: this.data
    })
    console.log(this.store)
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
      box-sizing: border-box;
    }
    .ducky-simpletree-node__panel {
      width: 100%;
      box-sizing: border-box;
      overflow: hidden;
    }
  }
}
</style>
