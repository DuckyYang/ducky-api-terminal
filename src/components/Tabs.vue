<!--
 * @Author: Ducky
 * @Date: 2020-05-24 16:12:52
 * @LastEditTime: 2020-05-25 12:42:44
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: /ducky-ui/src/components/Tabs.vue
 * @
-->
<template>
  <div class="ducky-layout-tabs">
    <!-- Move Tab Prev -->
    <span class="ducky-tab-prev" @click="onTabPrev">
      <i class="el-icon-d-arrow-left"></i>
    </span>
    <!-- Tab Container -->
    <div
      ref="tabs"
      class="ducky-tabs-container"
      :style="{ left: tabLeft + 'px' }"
    >
      <span
        v-for="item in tabs"
        :key="item.meta.id"
        @click="onTabClick(item.meta.id)"
        class="ducky-tab"
        >{{ item.name
        }}<i class="el-icon-close" @click="onTabClose(item.meta.id)"></i
      ></span>
    </div>
    <!-- Move Tag Next -->
    <span class="ducky-tab-next" @click="onTabNext">
      <i class="el-icon-d-arrow-right"></i>
    </span>
  </div>
</template>
<script>
import "../css/ducky-ui/tab.scss";
import "../plugin/JsExt/ArrayExt.js";
export default {
  data() {
    return {
      tabLeft: 50,
      curTabIndex: 0,
      tabs: [],
      nextHistories: [],
    };
  },
  methods: {
    onTabClick(id) {
      const route = this.tabs.find((x) => x.meta.id === id);
      if (route) {
        this.$router.push({ path: route.path }).catch((x) => x);
      }
    },
    onTabClose(id) {
      this.tabs = this.tabs.remove((x) => x.meta.id === id);
    },
    onTabPrev() {
      if (this.nextHistories.length === 0) {
        this.tabLeft = 50;
        return;
      }
      let prev = this.nextHistories[this.nextHistories.length - 1];
      this.curTabIndex = prev;
      let nodes = this.$refs.tabs.childNodes;
      [].slice
        .call(nodes)
        .filter((item, index) => {
          return index === prev;
        })
        .forEachExt((item) => {
          this.tabLeft = -item.offsetLeft + 50;
          this.nextHistories.pop();
          return false;
        });
    },
    onTabNext() {
      // 需要减去两端预置按钮的宽度
      let viewWidth = window.innerWidth - 50;
      // 计算应该向前滚动的width
      let nodes = this.$refs.tabs.childNodes;
      [].slice
        .call(nodes)
        .filter((item, index) => {
          return index >= this.curTabIndex;
        })
        .forEachExt((item, index) => {
          let left = item.getBoundingClientRect().left;
          let right = item.getBoundingClientRect().right;
          let offsetLeft = item.offsetLeft;
          if (left < viewWidth && right > viewWidth) {
            this.nextHistories.push(this.curTabIndex);
            this.curTabIndex += index;
            this.tabLeft = -offsetLeft + 50;
            return false;
          }
        });
    },
  },
  watch: {
    $route: function(to) {
      if (
        !this.tabs.some((x) => {
          return x.meta.id === to.meta.id;
        })
      ) {
        this.tabs.push(to);
      }
    },
  },
  created() {
    this.tabs.push(this.$route);
  },
};
</script>
<style lang="scss" scoped></style>
