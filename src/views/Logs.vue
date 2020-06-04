<!--
 * @Author: Ducky
 * @Date: 2020-05-24 15:08:05
 * @LastEditTime: 2020-06-04 16:35:53
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/views/Logs.vue
 * @
-->
<template>
  <ducky-table-layout>
    <template #toolbar>
      <el-select v-model="value" placeholder="please choose server">
        <el-option
          v-for="item in servers"
          :key="item.name"
          :label="item.name"
          :value="item.name"
        ></el-option>
      </el-select>
      <el-input
        placeholder="please input search key"
        v-model="searchKey"
        class="ducky-tool-input"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button-group class="ducky-tool-buttons">
        <el-button type="primary">Refresh</el-button>
        <el-button type="primary">Reset</el-button>
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
        <el-table-column prop="host" label="host" width="120"></el-table-column>
        <el-table-column
          prop="method"
          label="method"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="route"
          label="route"
          width="280"
        ></el-table-column>
        <el-table-column prop="request" label="request" width="380">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              width="200"
              trigger="click"
              :content="scope.row.request"
            >
              <div slot="reference" class="ducky-table-row__content">
                {{ scope.row.request }}
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column prop="response" label="response" width="380">
          <template slot-scope="scope">
            <el-popover
              placement="top-start"
              width="200"
              trigger="click"
              :content="scope.row.response"
            >
              <div slot="reference" class="ducky-table-row__content">
                {{ scope.row.response }}
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="requestTime"
          label="request time"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="duration"
          label="duration"
          width="100"
        ></el-table-column>
        <el-table-column prop="error" label="error" width="100">
          <template slot-scope="scope">
            <el-popover
              v-if="scope.row.isError"
              placement="top-start"
              width="200"
              trigger="click"
              :content="scope.row.error"
            >
              <el-button slot="reference" type="danger" size="mini"
                >View</el-button
              >
            </el-popover>
            <span v-else></span>
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
import servers from "../static/data/demo-apiserver";

import api from "../api/logs";
export default {
  data() {
    return {
      servers: servers,
      value: servers[0].name,
      searchKey: "",
      tableData: [],
      pageIndex: 1,
      pageSize: 16,
      total: 0,
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
      api.getLogs.get("", this.pageIndex, this.pageSize).then((response) => {
          this.tableData = response.data
          this.total = response.total
      });
    },
  },
  watch: {
    pageIndex() {
      this.tableData = this.getPagerData();
    },
    pageSize() {
      this.tableData = this.getPagerData();
    },
  },
  beforeMount() {
    this.tableData = this.getPagerData();
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
.ducky-table-row__content {
  width: 100%;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  height: 24px;
}
</style>
