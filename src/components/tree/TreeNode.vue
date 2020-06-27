<!--
 * @Description: 
 * @Version: 1.0
 * @Author: Ducky Yang
 * @Date: 2020-06-09 12:41:39
 * @LastEditors: Ducky Yang
 * @LastEditTime: 2020-06-09 13:06:53
--> 
<template>
  <div class="tree-table-row">
    <div class="tree-table-row__wrapper">
      <span
        @click="onNodeClick(node)"
        class="tree-table-row__title"
        :class="{ 'is-current': node.isCurrent }"
        v-show="node.visible"
      >
       <!-- :style="{ 'text-indent': (node.level + 1) * 15 + 'px' }" -->
        <span>
            <slot name="title"  :node="node"></slot>
        </span>
      </span>
      <el-collapse-transition>
        <div v-show="node.open">
          <div
            class="tree-table-row__panel"
            v-for="child in node.children"
            :key="child.id"
          >
            <tree-node :node="child">
              <template #title="slotProp">
                <slot name="title" :node="slotProp.node"></slot>
              </template>
            </tree-node>
          </div>
        </div>
      </el-collapse-transition>
    </div>
  </div>
</template>
<script>
export default {
  name: "tree-node",
  data() {
    return {};
  },
  props: {
    node: Object,
  },
  inject: ["setCurrentNode"],
  methods: {
    onNodeClick(node) {
      this.setCurrentNode(node);
    },
  },
  created() {},
};
</script>
<style lang="scss" scoped>
.tree-table-row {
  width: 100%;
  display: block;
}
.is-current {
  background-color: #f6f6f6;
}

.tree-table-row__wrapper {
  width: 100%;
  height: 100%;

  .tree-table-row__title {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
    box-sizing: border-box;
    span {
      display: block;
      width: 100%;
      box-sizing: border-box;
    }
  }
  .tree-table-row__title:hover {
    background-color: #f6f6f6;
  }
  .tree-table-row__panel {
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }
}
</style>
