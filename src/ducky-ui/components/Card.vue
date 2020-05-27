<!--
 * @Author: your name
 * @Date: 2020-05-27 12:53:29
 * @LastEditTime: 2020-05-27 13:12:10
 * @LastEditors: Please set LastEditors
 * @Description: render a card
 * @FilePath: \ducky-api-terminal\src\ducky-ui\components\Card.vue
-->
<template>
  <div class="ducky-card" :class="colCls">
    <div class="ducky-card-content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    col: Number,
  },
  computed: {
    colCls() {
      return "col" + this.col;
    },
  },
};
</script>
<style lang="scss" scoped>
.ducky-card {
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  .ducky-card-content {
    background-color: #ffffff;
    padding: 10px;
    width: 100%;
    height: 100%;
    border: 1px solid #f6f6f6;
    box-sizing: border-box;
  }
}
.ducky-card.col3 {
  width: 33.33%;
}
.ducky-card.col1 {
  width: 100%;
}
.ducky-card.col2 {
  width: 50%;
}
.ducky-card.col4 {
  width: 25%;
}
.ducky-card.col5 {
  width: 20%;
}
</style>
