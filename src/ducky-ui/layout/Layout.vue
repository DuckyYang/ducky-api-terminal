<!--
 * @Author: your name
 * @Date: 2020-05-27 12:02:40
 * @LastEditTime: 2020-05-27 12:35:55
 * @LastEditors: Please set LastEditors
 * @Description:  Default layout contains `Left view` and `Right view`,and `Right view` contains `Top view`,`Tab view` and `Main View` 
 * @FilePath: \ducky-api-terminal\src\ducky-ui\components\layout\Layout.vue
-->
<template>
  <!-- Default layout contains `Left view` and `Right view`,and `Right view` contains `Top view`,`Tab view` and `Main View` -->
  <div class="ducky-layout">
    <!-- Left view -->
    <div class="ducky-layout-left" :class="navCollapsedCls">
      <slot name="left"></slot>
    </div>
    <!-- Right view -->
    <div class="ducky-layout-right">
      <!-- Top -->
      <div class="ducky-layout-top">
        <slot name="top"></slot>
      </div>
      <!-- Tab view -->
      <div class="ducky-layout-tabs">
        <slot name="tab"></slot>
      </div>
      <!-- View's Container -->
      <div class="ducky-layout-main">
        <div class="ducky-layout-container">
          <slot></slot>
        </div>
      </div>
    </div>
    <!-- <div class="ducky-layout-footer"></div> -->
  </div>
</template>
<script>
export default {
    data(){
        return{}
    },
    props:{
        navCollapsed: Boolean
    },
    computed:{
        navCollapsedCls(){
            return this.navCollapsed ? 'ducky-layout-left-min' :''
        }
    }
}
</script>
<style lang="scss" scoped>
$border-color:#f6f6f6;

.ducky-layout {
    height: 100%;
    width: 100%;
    display: flex;
    display: -webkit-flex;
    flex-wrap: nowrap;
    flex-direction: row;
    box-sizing: border-box;
    flex-flow: row;
    .ducky-layout-left {
      width: 220px;
      height: 100%;
      overflow: hidden;
    }
    .ducky-layout-left-min {
      width: 64px;
    }
    .ducky-layout-right {
      flex: 1;
      height: 100%;
      flex-direction: column;
      overflow: hidden;
      position: relative;
      .ducky-layout-top {
        width: 100%;
        height: 60px;
        display: flex;
        flex: 0;
        flex-direction: row;
        border-bottom: 1px solid $border-color;
        box-sizing: border-box;
      }
      .ducky-layout-main {
        width: 100%;
        flex: 1;
        overflow: hidden;
        background-color: #cccccc;
        position: absolute;
        top: 110px;
        bottom: 0;
        .ducky-layout-container{
          height: 100%;
          width: 100%;
          overflow-y: auto;
          .ducky-layout-container__wrapper{
            width: 100%;
            height: 100%;
            padding: 20px 20px 0;
            background-color: #f0f2f5;
            box-sizing: border-box;
            overflow-y: auto;
          }
        }
      }
      .ducky-layout-bottom {
        height: 60px;
        width: 100%;
        flex: 0;
        background-color: #ddd;
      }
    }
  }
</style>