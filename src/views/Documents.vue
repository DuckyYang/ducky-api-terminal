<!--
 * @Author: Ducky
 * @Date: 2020-05-24 15:09:14
 * @LastEditTime: 2020-06-09 22:34:20
 * @LastEditors: Ducky
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
        <el-input
          v-model="filterKey"
          suffix-icon="el-icon-search"
          placeholder="please input server name"
        ></el-input>
      </div>
      <ducky-simple-tree :data="data" :simple="true" :filter="filterKey" @node-click="onNodeClick">
        <template #title="slotProp">
          <div style="height:40px;line-height:40px;position:relative;">
            <i
              v-if="slotProp.node.children.length > 0"
              :class="
                slotProp.node.open
                  ? 'el-icon-caret-bottom'
                  : 'el-icon-caret-right'
              "
            ></i>
            {{ slotProp.node.title }}
            <div
              v-if="slotProp.node.children.length > 0"
              @click.stop="onNodeMenu(slotProp.node)"
              style="position:absolute;top:0px;right:5px;height:40px;line-height:40px;"
            >
              <i class="el-icon-more"></i>
              <div
                v-if="slotProp.node.children.length > 0"
                style="position:absolute;top:40px;right:0px;width:180px;z-index:999;"
              >
                <span>Add Request</span>
              </div>
            </div>
          </div>
        </template>
      </ducky-simple-tree>
    </div>
    <!-- right -->
    <div class="ducky-default-container__right">
      <request-document v-if="currentNode !== null" :node="currentNode"></request-document>
      <div class="no-data" v-else>
        <dl>
          <dt>
            <img src="@/assets/no-data.png" alt />
          </dt>
          <dd style="text-align:center;font-size:14px;">choose a request</dd>
        </dl>
      </div>
    </div>
  </div>
</template>
<script>
// import demoData from "../static/data/demo-documents";
import RequestDoc from "../components/RequestDocument";
import data from "../static/data/demo-documents_1";
export default {
  data() {
    return {
      origin: data,
      data: data,
      currentNode: null,
      filterKey: ""
    };
  },
  components: {
    "request-document": RequestDoc
  },
  methods: {
    onNodeClick(node) {
      // the last stage node
      if (!node.children || node.children.length === 0) {
        this.currentNode = node;
      }
    },
    onNodeMenu(node) {
      console.log(node);
    }
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
    .no-data {
      height: 100%;
      width: 100%;
      background-color: #fff;
      border-left: 1px solid #f6f6f6;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
