<!--
 * @Author: Ducky
 * @Date: 2020-05-24 15:10:09
 * @LastEditTime: 2020-05-26 21:49:16
 * @LastEditors: Ducky
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/views/Users.vue
 * @
--> 
<template>
  <div class="ducky-layout-container__wrapper">
    <table-layout>
      <template #toolbar>
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
      </template>
      <template v-slot="prop">
        <el-table ref="table" :data="tableData" :height="prop.height" style="width: 100%" :fit="true">
          <el-table-column fixed prop="date" label="日期"></el-table-column>
          <el-table-column prop="name" label="姓名"></el-table-column>
          <el-table-column prop="province" label="省份"></el-table-column>
          <el-table-column prop="city" label="市区"></el-table-column>
          <el-table-column prop="address" label="地址"></el-table-column>
          <el-table-column prop="zip" label="邮编"></el-table-column>
        </el-table>
      </template>
      <template #pager>
        <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="1000"></el-pagination>
      </template>
    </table-layout>
  </div>
</template>
<script>
import demoTableData from "../static/data/demo-table.js";
import tableLayout from "../components/TableLayout.vue";
export default {
  data() {
    return {
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
  components: {
    "table-layout": tableLayout
  }
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