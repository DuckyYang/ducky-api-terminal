<!--
 * @Author: Ducky
 * @Date: 2020-05-24 16:12:52
 * @LastEditTime: 2020-06-05 17:04:40
 * @LastEditors: Ducky Yang
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/components/Tabs.vue
 * @
-->
<template>
  <div class="ducky-tab-container">
    <!-- Move Tab Prev -->
    <span class="ducky-tab-prev" @click="onTabPrev">
      <i class="el-icon-d-arrow-left"></i>
    </span>
    <!-- Tab Container -->
    <div
      ref="tabs"
      class="ducky-tab-items"
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
import "../plugin/array";
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
<style lang="scss" scoped>
$tab-border-color: #f6f6f6;
$tab-hover-color:#f6f6f6;
.ducky-tab-container {
  flex: 0;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #f6f6f6;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.1);
  position: relative;
  padding: 0 50px 0 50px;
  box-sizing: border-box;
  .ducky-tab-prev,
  .ducky-tab-next {
    display: inline-block;
    position: absolute;
    width: 50px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    box-sizing: border-box;
    font-size: 20px;
    cursor: pointer;
    z-index: 999;
    background-color: #ffffff;
  }
  .ducky-tab-prev:hover,
  .ducky-tab-next:hover {
    background-color: $tab-hover-color;
  }
  .ducky-tab-prev {
    left: 0;
    border-right: 1px solid $tab-border-color;
  }
  .ducky-tab-next {
    right: 0;
    border-left: 1px solid $tab-border-color;
  }
  .ducky-tab-items {
    position: absolute;
    display: inline-block;
    width: 100%;
    height: 50px;
    line-height: 50px;
    white-space: nowrap;
    box-sizing: border-box;
    z-index: 998;
    transition: all .2s;
    .ducky-tab{
        display: inline-block;
        box-sizing: border-box;
        height: 50px;
        line-height: 54px;
        text-align: center;
        padding: 0 20px;
        border-right: 1px solid $tab-border-color;
        cursor: pointer;
        font-size: 14px;
        transition: all .2s;
        position: relative;
        i{
            margin-left: 5px;
            box-sizing: border-box;
            border: 1px solid #fff;
        }
        i:hover{
            border: 1px solid #ccc;
            border-radius: 50%;
            color: #fff;
            background-color: #ccc;
        }
    }
    .ducky-tab:hover{
        i{
            border: 1px solid #f6f6f6;
        }
        background-color:#f6f6f6;
    }
    .ducky-tab::after{
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 2px;
        border-radius: 0;
        background-color: #292B34;
        transition: all .3s;
        -webkit-transition: all .3s;
    }
    .ducky-tab:hover::after{
        width: 100%;
    }
    
  }
}
</style>
