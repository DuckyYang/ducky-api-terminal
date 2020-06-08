<!--
 * @Author: Ducky
 * @Date: 2020-06-08 19:51:15
 * @LastEditTime: 2020-06-08 21:59:58
 * @LastEditors: Ducky
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/views/Roles.vue
 * @
--> 
<template>
  <div class="ducky-default-layout__container">
    <el-button type="primary" size="small" @click="onAddRole">Add Role</el-button>
    <div>
      <ducky-simple-tree :data="data" :simple="false">
        <template #title="slotProp">{{slotProp.node.title}}</template>
      </ducky-simple-tree>
    </div>
  </div>
</template>
<script>
import utils from "../plugin/utils";
export default {
  data() {
    return {
      data: [
        {
          id: utils.uuid(),
          title: "admin",
          children: [
            {
              id: utils.uuid(),
              title: "Dash Board",
              view: true,
              operate: true
            },
            {
              id: utils.uuid(),
              title: "Logs",
              view: true,
              operate: true
            }
          ]
        },
        {
          id: utils.uuid(),
          title: "user",
          children: [
            {
              id: utils.uuid(),
              title: "Dash Board",
              view: true,
              operate: true
            },
            {
              id: utils.uuid(),
              title: "Logs",
              view: true,
              operate: true
            }
          ]
        }
      ]
    };
  },
  methods: {
    onAddRole() {},
    transform() {}
  }
};
</script>
<style lang="scss" scoped>
.ducky-default-layout__container {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: #ffffff;
  button {
    margin: 10px 0 10px 10px;
  }
}
</style>