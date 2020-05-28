<!--
 * @Author: your name
 * @Date: 2020-05-28 12:30:22
 * @LastEditTime: 2020-05-28 17:01:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ducky-api-terminal\src\ducky-ui\components\simpletree\SimpleTreeNode.vue
-->
<template>
  <!-- node item -->
  <div class="ducky-simpletree-node">
    <div class="ducky-simpletree-node__wrapper">
      <!-- only render node's title if node doesn't have any child nodes -->
      <span
        class="ducky-simpletree-node__title"
        v-if="node.children.length === 0"
        >{{ node.title }}</span
      >
      <span class="ducky-simpletree-node__title" v-else>
        <i
          :class="node.open ? 'el-icon-caret-bottom' : 'el-icon-caret-right'"
        ></i
        >{{ node.title }} <i class="el-icon-plus"></i>
      </span>
      <!-- else render node's child nodes -->
      <div
        class="ducky-simpletree-node__panel"
        :style="{ paddingLeft: (node.level + 1) * 10 + 'px' }"
        v-for="(child, index) in node.children"
        :key="index"
      >
        <simpleTreeNode :node="child"></simpleTreeNode>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "simpleTreeNode",
  data() {
    return {};
  },
  props: {
    node: Object,
  },
};
</script>
