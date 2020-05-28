<!--
 * @Author: Ducky
 * @Date: 2020-05-24 15:09:14
 * @LastEditTime: 2020-05-28 17:02:25
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
        <el-input
          suffix-icon="el-icon-search"
          placeholder="please input server name"
        ></el-input>
      </div>
      <ducky-simple-tree :data="data"></ducky-simple-tree>
    </div>
    <!-- right -->
    <div class="ducky-default-container__right"></div>
  </div>
</template>
<script>
import demoData from "../static/data/demo-documents";
export default {
  data() {
    return {
      data: demoData,
    };
  },
  methods: {
    onItemClick() {
      console.log(this.$refs.item);
    },
    onItem1Click() {
      console.log(this.$refs.item.$refs.item);
    },
    onItem2Click() {
      console.log(this.$refs.item.$refs.item.$refs.item);
    },
  },
};
</script>
<style lang="scss" scoped>
.ducky-default-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  overflow-y: auto;
  .ducky-default-container__left {
    width: 280px;
    height: 100%;
    background-color: #fff;
    box-sizing: border-box;
    .ducky-tools {
      width: 100%;
      height: 60px;
      padding: 10px 10px 0;
      box-sizing: border-box;
    }
  }
  .ducky-default-container__right {
    width: 100%;
    height: 100%;
    flex: 1;
    background-color: gold;
  }
}
</style>
