<!--
 * @Author: Ducky
 * @Date: 2020-05-24 15:10:09
 * @LastEditTime: 2020-06-12 13:04:23
 * @LastEditors: Ducky Yang
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
      >
        <el-button
          slot="append"
          icon="el-icon-search"
          @click="onSearch"
        ></el-button>
      </el-input>
      <el-button-group class="ducky-tool-buttons">
        <el-button type="primary">Refresh</el-button>
        <el-button type="primary">Add User</el-button>
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
            <span>{{scope.row.enabled === 1 ? 'enabled' : 'not enabled'}}</span>
          </template>
        </el-table-column>
         <el-table-column
          prop="role"
          label="Role"
          width="140"
        ></el-table-column>
        <el-table-column label="Operation" min-width="140">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="mini"
              @click="onEditUser(scope.row)"
              >Edit</el-button
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
        :total="1000"
      ></el-pagination>
    </template>
  </ducky-table-layout>
</template>
<script>
// import demoTableData from "../static/data/demo-users";
import user from "../api/users";
export default {
  data() {
    return {
      roles: [
        {
          key: "all",
          value: "",
        },
        {
          key: "admin",
          value: "admin",
        },
        {
          key: "user",
          value: "user",
        },
      ],
      role: "",
      input3: "",
      tableData: [],
      total: 0,
      pageIndex: 1,
      pageSize: 10,
      filterKey: "",
    };
  },
  methods: {
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
    getPagerData() {
      user
        .getUsers(this.filterKey, this.role, this.pageIndex, this.pageSize)
        .then((response) => {
          this.tableData = response.data;
          this.total = response.total;
        });
    },
    onEditUser(row) {
      console.log(row);
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
