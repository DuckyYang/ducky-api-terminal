<!--
 * @Author: Ducky
 * @Date: 2020-06-08 19:51:15
 * @LastEditTime: 2020-06-16 15:40:10
 * @LastEditors: Ducky Yang
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/views/Roles.vue
 * @
-->
<template>
  <div class="ducky-default-layout__container">
    <el-button type="primary" size="small" @click="addRoleFormVisible = true"
      >Add Role</el-button
    >
    <div>
      <el-table
        :data="roles"
        style="width: 100%;"
        row-key="id"
        border
        default-expand-all
        :tree-props="{ children: 'children' }"
        @row-click="onRowClick"
        ref="role"
      >
        <el-table-column prop="role" label="Role Name" width="180">
        </el-table-column>
        <el-table-column prop="menu" label="Menu Name" width="180">
        </el-table-column>
        <el-table-column prop="menu_path" label="Menu Path" width="180">
        </el-table-column>
        <el-table-column prop="view" label="Viewable" min-width="180">
          <template slot-scope="scope">
            <el-switch
              v-if="scope.row.view !== ''"
              v-model="scope.row.view"
              active-color="#13ce66"
              @change="onViewAuthChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="operate" label="Operable" min-width="180">
          <template slot-scope="scope">
            <el-switch
              v-if="scope.row.operate !== ''"
              v-model="scope.row.operate"
              active-color="#13ce66"
              @change="onOperateAuthChange(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog title="Add Role" :visible.sync="addRoleFormVisible">
      <el-form :model="addRoleForm">
        <el-form-item label="Role Name">
          <el-input v-model="addRoleForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addRoleFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="onAddRole">Submit</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import utils from "../plugin/utils";
import roleAuths from "../api/role_auths";
import roles from "../api/roles";
export default {
  data() {
    return {
      roles: [],
      addRoleFormVisible: false,
      addRoleForm: {
        name: "", // role name
      },
    };
  },
  methods: {
    onAddRole() {
      if (this.addRoleForm.name) {
        roles
          .add(this.addRoleForm.name)
          .then(() => {
            this.addRoleForm.name = '';
            this.addRoleFormVisible = false;
            this.getRoleAuths();
          })
          .catch((r) => r);
      }
    },
    onRowClick(row) {
      this.$refs.role.toggleRowExpansion(row);
    },
    onViewAuthChange(row){
      roleAuths.changeViewAuth(row.id).then(()=>{}).catch(r=>r);
    },
    onOperateAuthChange(row){
      roleAuths.changeOperateAuth(row.id).then(()=>{}).catch(r=>r);
    },
    getRoleAuths() {
      roles
        .getAuths()
        .then((response) => {
          let root = response.data
            .map((x) => {
              return x.role;
            })
            .unique();
          this.roles = root.map((x) => {
            let role = {
              id: utils.uuid(),
              role: x,
              menu: "",
              menu_path: "",
              view: "",
              operate: "",
              children: response.data
                .filter((r) => r.role === x)
                .map((r) => {
                  let data = {
                    id: r.id,
                    role: "",
                    menu: r.menu,
                    menu_path: r.menu_path,
                    view: r.view === 1,
                    operate: r.operate === 1,
                  };
                  return data;
                }),
            };
            return role;
          });
        })
        .catch((r) => r);
    },
  },
  mounted() {
    this.getRoleAuths();
  },
};
</script>
<style lang="scss">
.el-table__row td {
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
