<!--
 * @Author: your name
 * @Date: 2020-05-27 12:49:57
 * @LastEditTime: 2020-05-27 13:08:38
 * @LastEditors: Please set LastEditors
 * @Description: render a card row layout,it's must use in CardLayout
 * @FilePath: \ducky-api-terminal\src\ducky-ui\components\Row.vue
-->
<template>
  <div class="ducky-card-row">
    <slot></slot>
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
.ducky-card-row {
  width: 100%;
  height: 400px;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
}
</style>
