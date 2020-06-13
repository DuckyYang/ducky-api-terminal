<!--
 * @Author: Ducky
 * @Date: 2020-05-24 15:10:09
 * @LastEditTime: 2020-06-13 20:22:35
 * @LastEditors: Ducky
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/views/Users.vue
 * @
-->
<template>
  <ducky-table-layout>
    <template #toolbar>
      <el-select
        v-model="role"
        placeholder="please choose role"
        @change="onRoleChange"
      >
        <el-option key="" label="all" value=""></el-option>
        <el-option
          v-for="item in roles"
          :key="item.value"
          :label="item.key"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input
        placeholder="please input something..."
        v-model="filterKey"
        class="ducky-tool-input"
        @keyup.enter="onSearch"
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="onSearch"
        ></el-button>
      </el-input>
      <el-button-group class="ducky-tool-buttons">
        <el-button @click="onRefresh" type="primary">Refresh</el-button>
        <el-button @click="onShowAddUserForm" type="primary">Add User</el-button>
        <!-- Add User Layer -->
        <el-dialog :visible.sync="addUserLayerVisible" title="Add User">
          <el-form :model="addUserForm" :rules="rules" ref="addUserForm">
            <el-form-item label="Name" prop="name">
              <el-input
                v-model="addUserForm.name"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="Email" prop="email">
              <el-input
                v-model="addUserForm.email"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="Mobile" prop="mobile">
              <el-input
                v-model="addUserForm.mobile"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="Role" prop="role">
              <el-select
                v-model="addUserForm.role"
                placeholder="please choose role"
              >
                <el-option
                  v-for="item in roles"
                  :key="item.value"
                  :label="item.key"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="Password" prop="password">
              <el-input
                v-model="addUserForm.password"
                autocomplete="off"
                show-password
              ></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="addUserLayerVisible = false">Cancel</el-button>
            <el-button
              v-if="addUserForm.id === ''"
              type="primary"
              @click="onAddUser"
              >Add</el-button
            >
            <el-button v-else type="primary" @click="onEditUser">Edit</el-button>
          </div>
        </el-dialog>
      </el-button-group>
    </template>
    <template v-slot="prop">
      <el-table
        ref="table"
        :data="tableData"
        :height="prop.height"
        style="width: 100%"
        :fit="true"
      >
        <el-table-column prop="id" label="ID" width="120">
          <template slot-scope="scope">
            <div
              style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;"
            >
              {{ scope.row.id }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="Name" width="100"></el-table-column>
        <el-table-column
          prop="email"
          label="Email"
          width="200"
        ></el-table-column>
        <el-table-column
          prop="mobile"
          label="Mobile"
          width="140"
        ></el-table-column>
        <el-table-column prop="locked" label="Locked" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.locked === 0">unlock</span>
            <span v-else style="color:red;">locked</span>
          </template>
        </el-table-column>
        <el-table-column prop="enabled" label="Enabled" width="120">
          <template slot-scope="scope">
            <span v-if="scope.row.enabled === 1">enabled</span>
            <span v-else style="color:red;">disabled</span>
          </template>
        </el-table-column>
        <el-table-column prop="role" label="Role" width="140"></el-table-column>
        <el-table-column label="Operation" min-width="140">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" @click="onShowEditUserForm(scope.row)"
              >Edit</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click="onUnlockUser(scope.row)"
              >{{scope.row.locked === 1 ? 'unlock' : 'lock'}}</el-button
            >
            <el-button
              type="primary"
              size="mini"
              @click="onDisableUser(scope.row)"
              >{{scope.row.enabled === 1 ? 'disable' : 'enable'}}</el-button
            >
               <el-button
              type="danger"
              size="mini"
              @click="onRemoveUser(scope.row)"
              >Remove</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </template>
    <template #pager>
      <el-pagination
        @current-change="onPagerChange"
        @size-change="onPagerSizeChange"
        @prev-click="onPagerPrev"
        @next-click="onPagerNext"
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </template>
  </ducky-table-layout>
</template>
<script>
// import demoTableData from "../static/data/demo-users";
import user from "../api/users";
import roles from "../api/roles";
export default {
  data() {
    return {
      roles: [],
      role: "",
      tableData: [],
      total: 0,
      pageIndex: 1,
      pageSize: 10,
      filterKey: "",
      addUserLayerVisible: false,
      addUserForm: {
        id: "",
        name: "",
        email: "",
        mobile: "",
        role: "",
        password: "",
      },
      rules: {
        name: [
          { required: true, message: "please input name", trigger: "blur" },
        ],
        email: [
          { required: true, message: "please input email", trigger: "blur" },
        ],
        mobile: [
          { required: true, message: "please input mobile", trigger: "blur" },
        ],
        role: [
          {
            required: true,
            message: "please choose a role for user",
            trigger: "blur",
          },
        ],
        password: [
          { required: true, message: "please input password", trigger: "blur" },
        ],
      },
    };
  },
  methods: {
    onAddUser() {
      this.$refs.addUserForm.validate((valid) => {
        if (valid) {
          user
            .add(this.addUserForm)
            .then((response) => {
              this.tableData.push(response.data);
              this.$refs.addUserForm.resetFields();
              this.addUserForm.id = "";
              this.addUserLayerVisible = false;
            })
            .catch((r) => {
              this.$message({
                type: "error",
                message: r,
              });
            });
        }
      });
    },
    onEditUser() {
      this.$refs.addUserForm.validate((valid) => {
        if (valid) {
          user
            .edit(this.addUserForm.id, this.addUserForm)
            .then((response) => {
              console.log(response)
              this.$refs.addUserForm.resetFields();
              this.addUserLayerVisible = false;
            })
            .catch((r) => {
              this.$message({
                type: "error",
                message: r,
              });
            });
        }
      });
    },
    onRemoveUser(row){
      user.remove(row.id).then( () =>{
        // remove user from table
          this.getPagerData();
      }).catch(r=>r);
    },
    getPagerData() {
      user
        .getUsers(this.filterKey, this.role, this.pageIndex, this.pageSize)
        .then((response) => {
          this.tableData = response.data;
          this.total = response.total;
        });
    },
    onShowAddUserForm() {
      this.addUserForm.id = "";
      this.addUserLayerVisible = true;
    },
    onShowEditUserForm(user) {
      if (user) {
        this.addUserForm = user;
        this.addUserLayerVisible = true;
      }
    },
    onUnlockUser(row) {
      user.lock(row.id).then(()=>{
        this.getPagerData();
      }).catch(r=>r)
    },
    onDisableUser(row) {
      user.enable(row.id).then(()=>{
        this.getPagerData();
      }).catch(r=>r)
    },
    onRefresh() {
      this.pageIndex = 1;
      this.getPagerData();
    },
    onPagerChange(curPage) {
      this.pageIndex = curPage;
    },
    onPagerSizeChange(pageSize) {
      this.pageSize = pageSize;
    },
    onPagerPrev(curPage) {
      this.pageIndex = curPage;
    },
    onPagerNext(curPage) {
      this.pageIndex = curPage;
    },

    onSearch() {
      this.getPagerData();
    },
    onRoleChange() {
      this.getPagerData();
    },
  },

  watch: {
    pageIndex() {
      this.getPagerData();
    },
    pageSize() {
      this.getPagerData();
    },
  },
  created() {
    roles
      .getAll()
      .then((response) => {
        response.data.forEach((item) => {
          this.roles.push({
            key: item.role,
            value: item.role,
          });
        });
      })
      .catch((r) => r);
    this.getPagerData();
  },
};
</script>
<style lang="scss" scoped>
.ducky-tool-input {
  margin-left: 20px;
  width: 280px;
}
.ducky-tool-buttons {
  margin-left: 20px;
}
</style>
