<!--
 * @Author: Ducky
 * @Date: 2020-05-26 19:59:35
 * @LastEditTime: 2020-05-26 21:57:27
 * @LastEditors: Ducky
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/components/TableLayout.vue
 * @
--> 
<template>
  <div class="ducky-layout-container__wrapper">
    <div class="ducky-layout-table__container" ref="container">
      <!-- Log Tool Bar -->
      <div class="ducky-layout-table__toolbar">
        <slot name="toolbar"></slot>
      </div>
      <!-- Log Data -->
      <div class="ducky-layout-table__data" :style="{height:dataHeight}">
        <slot :height="dataHeight"></slot>
      </div>
      <!-- Log Pager Bar -->
      <div class="ducky-layout-table__pager">
        <slot name="pager"></slot>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      dataHeight: 600
    };
  },
  mounted() {
    let _this = this;
    this.$nextTick(() => {
      this.dataHeight = this.$refs.container.clientHeight - 180;
    });
    window.onresize = function() {
      _this.dataHeight = _this.$refs.container.clientHeight - 180;
    };
  }
};
</script>
<style lang="scss" scoped>
.ducky-layout-table__container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .ducky-layout-table__toolbar {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    padding: 10px 0px 10px 20px;
    background-color: #fff;
    box-sizing: border-box;
    flex: 0;
    height: 60px;
  }
  .ducky-layout-table__data {
    background-color: #fff;
    width: 100%;
    margin-top: 20px;
    box-sizing: border-box;
    flex: 1;
  }
  .ducky-layout-table__pager {
    padding-left: 20px;
    height: 60px;
    text-align: left;
    width: 100%;
    background-color: #fff;
    margin-top: 20px;
    margin-bottom: 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
}
</style>