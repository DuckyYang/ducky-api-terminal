<!--
 * @Author: Ducky
 * @Date: 2020-05-24 15:09:14
 * @LastEditTime: 2020-05-27 21:59:45
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
            <el-input suffix-icon="el-icon-search" placeholder="please input server name"></el-input>
        </div>
        <div class="ducky-server-list">

        </div>

        
    </div>
    <!-- right -->
    <div class="ducky-default-container__right"></div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.ducky-default-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  overflow-y: auto;
  .ducky-default-container__left{
      width: 360px;
      height: 100%;
      background-color: #fff;
      box-sizing: border-box;
      .ducky-tools{
          width: 100%;
          height: 60px;
          padding: 10px 10px 0;
          box-sizing: border-box;
      }
      .ducky-server-list{
          width: 100%;
          display: flex;
            flex-direction: column;
            flex-wrap: nowrap;
            
      }
  }
  .ducky-default-container__right{
      width: 100%;
      height: 100%;
      flex:1;
      background-color: gold;
  }

}
</style>