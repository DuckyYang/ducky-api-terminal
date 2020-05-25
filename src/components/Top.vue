<!--
 * @Author: Ducky
 * @Date: 2020-05-24 16:09:34
 * @LastEditTime: 2020-05-25 13:19:11
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: /ducky-ui/src/components/Top.vue
 * @
-->
<template>
  <div class="ducky-layout-top">
    <!-- Collapse Navigation -->
    <i
      class="ducky-collapse el-icon-s-unfold"
      title="click to collapse navigaion"
      @click="onCollapse"
      v-if="navCollapsed"
    ></i>
    <i
      class="ducky-collapse el-icon-s-fold"
      title="click to collapse navigaion"
      @click="onCollapse"
      v-else
    ></i>
    <div class="ducky-user-center">
      <!-- Top Right Menu -->
      <!-- User Avatar -->
      <span class="ducky-user-avatar">
        <img src="@/assets/logo.png" alt srcset />
      </span>
      <!-- Message Center -->
      <span class="ducky-message-center">
        <i class="el-icon-message-solid"></i>
        <span class="tips"></span>
      </span>
      <!-- Top Right Menu End -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    onCollapse() {
      this.$store.commit("navCollapse");
    },
  },
  computed: {
    navCollapsed() {
      return this.$store.state.navCollapsed;
    },
  },
};
</script>
<style lang="scss" scoped>
$base-color: #3498db;

.ducky-collapse {
  width: 40px;
  margin-left: 20px;
  font-size: 28px;
  cursor: pointer;
  color: $base-color;
}
.ducky-user-center {
  width: 200px;
  height: 60px;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  .ducky-user-avatar {
    width: 50px;
    height: 50px;
    margin-right: 20px;
    border: 1px solid $base-color;
    border-radius: 5px;
    cursor: pointer;
    img {
      width: 50px;
    }
  }
  .ducky-message-center {
    width: 50px;
    height: 50px;
    font-size: 28px;
    line-height: 50px;
    text-align: center;
    margin-right: 20px;
    color: $base-color;
    position: relative;
    .tips {
      position: absolute;
      width: 5px;
      height: 5px;
      background-color: red;
      border-radius: 50%;
      right: 8px;
      top: 8px;
    }
  }
}
</style>
