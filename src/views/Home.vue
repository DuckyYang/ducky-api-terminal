<!--
 * @Author: Ducky
 * @Date: 2020-05-23 09:04:22
 * @LastEditTime: 2020-05-27 13:43:01
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/views/Home.vue
 * @
-->
<template>
  <!-- Default layout support to render left,top,tab,main -->
  <ducky-layout :navCollapsed="collapsed">
    <template #left>
      <ducky-nav ref="nav"></ducky-nav>
    </template>
    <template #top>
      <ducky-top></ducky-top>
    </template>
    <template #tab>
      <ducky-tab></ducky-tab>
    </template>
    <template>
      <router-view />
    </template>
  </ducky-layout>
</template>
<script>
import Nav from "../components/Navigation";
import Top from "../components/Top";
import Tab from "../components/Tabs";
export default {
  data() {
    return {
    };
  },
  components: {
    "ducky-nav": Nav,
    "ducky-top": Top,
    "ducky-tab": Tab,
  },
  computed: {
    collapsed() {
      return this.$store.state.navCollapsed;
    },
  }
};
</script>
<style lang="scss" scope></style>
