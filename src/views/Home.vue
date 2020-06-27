<!--
 * @Author: Ducky
 * @Date: 2020-05-23 09:04:22
 * @LastEditTime: 2020-06-26 19:17:34
 * @LastEditors: Ducky
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/views/Home.vue
 * @
-->
<template>
  <!-- Default layout support to render left,top,tab,main -->
  <ducky-layout :navCollapsed="collapsed">
    <template #left>
      <ducky-left-navigator ref="nav"></ducky-left-navigator>
    </template>
    <template #top>
      <ducky-top-navigator></ducky-top-navigator>
    </template>
    <template #tab>
      <ducky-tab-navigator></ducky-tab-navigator>
    </template>
    <template>
      <router-view />
    </template>
  </ducky-layout>
</template>
<script>
export default {
  data() {
    return {};
  },
  computed: {
    collapsed() {
      return this.$store.state.navCollapsed;
    },
    accesstoken() {
      return this.$store.state.accesstoken;
    }
  },
  watch: {
    accesstoken(val) {
      if (!val) {
        this.$router.push({ path: "/signin" });
      }
    }
  }
};
</script>
<style lang="scss" scope></style>
