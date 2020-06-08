<!--
 * @Author: your name
 * @Date: 2020-05-26 11:59:28
 * @LastEditTime: 2020-06-08 13:39:18
 * @LastEditors: Ducky Yang
 * @Description: In User Settings Edit
 * @FilePath: \ducky-api-terminal\src\views\Settings.vue
-->
<template>
  <div class="ducky-default-container">
    <!-- Roles & Auth -->
    <el-divider content-position="left">Roles & Auth</el-divider>
    <div class="ducky-settings-rolesauth">
      <el-button
        class="ducky-settings-rolesauth__add"
        type="primary"
        size="mini"
        @click="onAddRole"
        >Add Role</el-button
      >
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="role" label="Role" width="180">
        </el-table-column>
        <el-table-column prop="auth" label="Auth" min-width="180">
        </el-table-column>
        <el-table-column label="" width="240">
          <template slot-scope="scope">
            <el-button @click="onRoleEdit(scope.row)" type="primary" size="mini"
              >Edit</el-button
            >
            <el-button
              @click="onRoleRemove(scope.row)"
              type="danger"
              size="mini"
              >Remove</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog :show-close="false" center :visible.sync="addRoleDialog">
        <el-form>
          <el-form-item label="活动名称">
            <el-input autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button>取 消</el-button>
          <el-button type="primary"
            >确 定</el-button
          >
        </div>
      </el-dialog>
    </div>
    <!-- API Warn Setting -->
    <el-divider content-position="left">API Warn</el-divider>
    <div class="ducky-settings-apiwarn"></div>
    <!-- Mock Server -->
    <el-divider content-position="left">Mock Server</el-divider>
    <div class="ducky-settings-mockserver"></div>
  </div>
</template>
<script>
import utils from "../plugin/utils";
export default {
  data() {
    return {
        addRoleDialog:false,
      tableData: [
        {
          id: 1,
          role: "admin",
          auth: utils.serialize([
            {
              id: 1,
              name: "DashBoard",
              view: true,
              operate: true,
            },
          ]),
        },
        {
          id: 2,
          role: "user",
          auth: utils.serialize([
            {
              id: 1,
              name: "DashBoard",
              view: true,
              operate: false,
            },
            {
              id: 2,
              name: "Logs",
              view: true,
              operate: false,
            },
            {
              id: 3,
              name: "Servers",
              view: false,
              operate: false,
            },
            {
              id: 4,
              name: "Documents",
              view: true,
              operate: false,
            },
          ]),
        },
      ],
    };
  },
  methods: {
    onRoleEdit(row) {
      console.log(row);
    },
    onRoleRemove(row) {
      console.log(row);
    },
    onAddRole() {
        this.addRoleDialog =true
    },
  },
};
</script>
<style lang="scss" scoped>
.ducky-default-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
  background-color: #ffffff;
  padding: 0 10px;
  .ducky-settings-rolesauth,
  .ducky-settings-apiwarn,
  .ducky-settings-mockserver {
    width: 100%;
  }
  .ducky-settings-rolesauth {
    .ducky-settings-rolesauth__add {
      margin-left: 20px;
      margin-bottom: 10px;
    }
  }
}
</style>
