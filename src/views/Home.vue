<!--
 * @Author: Ducky
 * @Date: 2020-05-23 09:04:22
 * @LastEditTime: 2020-05-25 22:00:15
 * @LastEditors: Ducky
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/views/Home.vue
 * @
--> 
<template>
  <!-- Every components must be in `ducky-layout` class -->
  <div class="ducky-layout">
    <!-- Navigation -->
    <ducky-nav ref="nav"></ducky-nav>
    <!-- Main Content Container -->
    <div class="ducky-layout-right">
      <!-- Top Menus -->
      <ducky-top></ducky-top>
      <!-- Route's Tabs -->
      <ducky-tab></ducky-tab>
      <!-- View's Container -->
      <div class="ducky-layout-main">
        <div class="ducky-layout-container">
          <router-view />
        </div>
      </div>
    </div>
    <!-- <div class="ducky-layout-footer"></div> -->
  </div>
</template>
<script>
import "../css/ducky-ui/layout.scss";
import Nav from "../components/Navigation.vue";
import Top from "../components/Top.vue";
import Tab from "../components/Tabs.vue";
export default {
  components: {
    "ducky-nav": Nav,
    "ducky-top": Top,
    "ducky-tab": Tab
  },
  mounted() {}
};
</script>
<style lang="scss" scope>
</style>