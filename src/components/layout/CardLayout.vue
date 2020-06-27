<!--
 * @Author: your name
 * @Date: 2020-05-27 12:46:06
 * @LastEditTime: 2020-05-27 13:08:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ducky-api-terminal\src\ducky-ui\layout\CardLayout.vue
-->
<template>
  <div class="ducky-layout-card">
    <!-- wrap layout -->
    <div class="ducky-layout-card__wrapper">
        <slot></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.ducky-layout-card {
  width: 100%;
  height: 100%;
  padding: 20px 20px 0;
  background-color: #f0f2f5;
  box-sizing: border-box;
  overflow-y: auto;
}
</style>
