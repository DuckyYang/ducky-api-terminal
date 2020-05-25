<!--
 * @Author: Ducky
 * @Date: 2020-05-24 15:10:09
 * @LastEditTime: 2020-05-25 22:00:24
 * @LastEditors: Ducky
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/views/Users.vue
 * @
--> 
<template>
  <div class="ducky-layout-container__wrapper">
    <div class="ducky-users-container" ref="users">
      <!-- Log Tool Bar -->
      <div class="ducky-users-toolbar">
        <el-select v-model="value" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
        <el-input placeholder="请输入内容" v-model="input3" class="ducky-tool-input">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button-group class="ducky-tool-buttons">
          <el-button type="primary">刷新</el-button>
          <el-button type="primary">重置</el-button>
        </el-button-group>
      </div>
      <!-- Log Data -->
      <div class="ducky-users-data">
        <el-table :data="tableData" :height="tableHeight" style="width: 100%" :fit="true">
          <el-table-column fixed prop="date" label="日期"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="province" label="省份"></el-table-column>
          <el-table-column prop="city" label="市区"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
          <el-table-column prop="zip" label="邮编"></el-table-column>
        </el-table>
      </div>
      <!-- Log Pager Bar -->
      <div class="ducky-users-pager">
        <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="1000" ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import demoTableData from "../static/data/demo-table.js";
export default {
  data() {
    return {
      tableHeight: 600,
      options: [
        {
          value: "选项1",
          label: "黄金糕"
        },
        {
          value: "选项2",
          label: "双皮奶"
        },
        {
          value: "选项3",
          label: "蚵仔煎"
        },
        {
          value: "选项4",
          label: "龙须面"
        },
        {
          value: "选项5",
          label: "北京烤鸭"
        }
      ],
      value: "",
      input3: "",
      tableData: demoTableData
    };
  },
  computed: {},
  mounted() {
    let _this = this;
    this.$nextTick(() => {
      this.tableHeight = this.$refs.users.clientHeight - 180;
    });
    window.onresize = function() {
      _this.tableHeight = _this.$refs.users.clientHeight - 180;
    };
  }
};
</script>
<style lang="scss" scoped>
.ducky-users-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .ducky-users-toolbar {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    padding: 10px 0px 10px 20px;
    background-color: #fff;
    box-sizing: border-box;
    flex: 0;
    height: 60px;

    .ducky-tool-input {
      margin-left: 20px;
      width: 280px;
    }
    .ducky-tool-buttons {
      margin-left: 20px;
    }
  }
  .ducky-users-data {
    background-color: #fff;
    width: 100%;
    margin-top: 20px;
    box-sizing: border-box;
    flex: 1;
  }
  .ducky-users-pager {
    padding-left: 20px;
    height: 60px;
    text-align: left;
    width: 100%;
    background-color: #fff;
    margin-top: 20px;
    margin-bottom: 20px;
    box-sizing: border-box;
    display: flex;
    align-items: center;
  }
}
</style>