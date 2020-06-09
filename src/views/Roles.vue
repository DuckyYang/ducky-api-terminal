<!--
 * @Author: Ducky
 * @Date: 2020-06-08 19:51:15
 * @LastEditTime: 2020-06-09 15:19:53
 * @LastEditors: Ducky Yang
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/views/Roles.vue
 * @
-->
<template>
  <div class="ducky-default-layout__container">
    <el-button type="primary" size="small" @click="onAddRole"
      >Add Role</el-button
    >
    <div>
      <ducky-tree :data="data">
        <template #title="slotProp">
          <el-table  :data="[slotProp.node]" :show-header="false">
            <el-table-column prop="title" width="280">
              <template slot-scope="scope">
                <span style="display:block;">{{scope.row.title}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="menu" width="280">
              <template slot-scope="scope">
                <span style="display:block;">{{scope.row.menu}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="view" width="180">
              <template slot-scope="scope">
                <el-switch
                  v-if="typeof scope.row.view === 'boolean'"
                  v-model="scope.row.view"
                  active-color="#13ce66"
                >
                </el-switch>
                <span v-else>{{scope.row.view}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="operate" width="180">
               <template slot-scope="scope">
                <el-switch
                  v-if="typeof scope.row.operate === 'boolean'"
                  v-model="scope.row.operate"
                  active-color="#13ce66"
                >
                </el-switch>
                <span v-else>{{scope.row.operate}}</span>
              </template>
            </el-table-column>
            <el-table-column min-width="180"></el-table-column>
          </el-table>
        </template>
      </ducky-tree>
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
          id:utils.uuid(),
          title:'role',
          menu:'menu',
          view:'view',
          operate: 'operate',
          children:[]
        },
        {
          id: utils.uuid(),
          title: "admin",
          menu:'',
          view: "",
          operate: "",
          children: [
            {
              id: utils.uuid(),
              title: "",
              menu:'Dash Board',
              view: true,
              operate: true,
            },
            {
              id: utils.uuid(),
              title: "",
               menu:'Logs',
              view: true,
              operate: true,
            },
          ],
        },
        {
          id: utils.uuid(),
          title: "user",
          menu:'',
          view: "",
          operate: "",
          children: [
            {
              id: utils.uuid(),
              title: "",
              menu:'Dash Board',
              view: true,
              operate: true,
            },
            {
              id: utils.uuid(),
              title: "",
               menu:'Logs',
              view: true,
              operate: false,
            },
          ],
        },
      ],
    };
  },
  methods: {
    onAddRole() {},
    transform() {},
  },
};
</script>
<style lang="scss">
.el-table__row td{
  border-right: 1px solid #f6f6f6;
}
</style>
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
