<!--
 * @Author: Ducky
 * @Date: 2020-05-24 15:30:51
 * @LastEditTime: 2020-05-27 13:36:03
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: /ducky-ui/src/components/Navigation.vue
 * @
-->
<template>
    <el-menu
      class="el-menu-vertical"
      :collapse-transition="false"
      background-color="#545c64"
      text-color="#fff"
      :default-active="activeIndex"
      router
      :collapse="collapsed"
      :style="{ width: navWidth }"
    >
      <el-menu-item
        v-for="item in Routes"
        :key="item.meta.id"
        :index="item.path"
      >
        <i :class="item.meta.icon"></i>
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
</template>
<script>
import Routes from "../router/routes";

export default {
  data() {
    return {
      Routes: Routes,
      navCollapsedCls: "",
      navWidth: "240px",
      activeIndex: "",
    };
  },
  computed: {
    collapsed() {
      return this.$store.state.navCollapsed;
    },
  },
  watch: {
    $route: function(to) {
      this.activeIndex = to.path;
    },
    collapsed() {
      this.navWidth = this.collapsed ? "64px" : "240px";
    },
  },
  created() {
    this.activeIndex = this.$route.path;
  },
};
</script>
<style lang="scss" scoped>
.el-menu {
  border: 0;
  height: 100%;
  padding-right: 20px;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
