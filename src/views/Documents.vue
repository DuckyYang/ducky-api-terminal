<!--
 * @Author: Ducky
 * @Date: 2020-05-24 15:09:14
 * @LastEditTime: 2020-06-01 17:18:16
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/views/Documents.vue
 * @
-->
<template>
  <!-- default layout -->
  <div class="ducky-default-container">
    <!-- left -->
    <div class="ducky-default-container__left">
      <div class="ducky-tools">
        <el-input suffix-icon="el-icon-search" placeholder="please input server name"></el-input>
      </div>
      <ducky-simple-tree :data="data" @node-click="onNodeClick">
        <template v-slot:title="prop">
          <span>{{prop.n.title}}</span>
        </template>
      </ducky-simple-tree>
    </div>
    <!-- right -->
    <div class="ducky-default-container__right">
      <request-document :node="node"></request-document>
    </div>
  </div>
</template>
<script>
// import demoData from "../static/data/demo-documents";
import RequestDoc from "../components/RequestDocument";
import data from '../static/data/demo-documents_1'
export default {
  data() {
    return {
      data: data,
      currentNode: null
    };
  },
  components: {
    "request-document": RequestDoc
  },
  methods:{
    onNodeClick(node) {
      // the last stage node
      if (!node.children || node.children.length === 0) {
        this.currentNode = node
      }
    },
  }
};
</script>
<style lang="scss" scoped>
.ducky-default-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  overflow: hidden;
  .ducky-default-container__left {
    width: 280px;
    height: 100%;
    background-color: #fff;
    box-sizing: border-box;
    position: relative;
    .ducky-tools {
      width: 100%;
      height: 60px;
      padding: 10px 10px 0;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
    }
    .ducky-simpletree {
      padding-top: 60px;
    }
  }
  .ducky-default-container__right {
    width: 100%;
    height: 100%;
    flex: 1;
    box-sizing: border-box;
    overflow-y: auto;
  }
}
</style>
