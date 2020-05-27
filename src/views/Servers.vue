<!--
 * @Author: Ducky
 * @Date: 2020-05-24 15:08:50
 * @LastEditTime: 2020-05-27 13:21:59
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/views/ApiRegiste.vue
 * @
-->
<template>
  <ducky-table-layout>
    <template #toolbar>
      <el-select v-model="value" placeholder="please choose...">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
      <el-input
        placeholder="please input..."
        v-model="input3"
        class="ducky-tool-input"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button-group class="ducky-tool-buttons">
        <el-button type="primary">Refresh</el-button>
        <el-button type="primary">Reset</el-button>
        <el-button type="primary" @click="dialogFormVisible = true"
          >Add API Server</el-button
        >
      </el-button-group>
    </template>
    <template v-slot="prop">
      <el-table
        :data="tableData"
        :height="prop.height"
        style="width: 100%"
        :fit="true"
      >
        <el-table-column fixed prop="name" label="Name"></el-table-column>
        <el-table-column prop="host" label="Host"></el-table-column>
        <el-table-column
          prop="contentType"
          label="ContentType"
        ></el-table-column>
        <el-table-column
          prop="defaultHeaders"
          label="Default Headers"
        ></el-table-column>
        <el-table-column prop="enableRequest" label="Enable Request">
          <template slot-scope="scope">
            <el-switch
              @change="onRowEnableRequest(scope.row)"
              v-model="scope.row.enableRequest"
              active-color="#13ce66"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="Operation">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              @click="onRowEdit(scope.$index, scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="onRowDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="API Server" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="Name" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Host" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="ContentType" :label-width="formLabelWidth">
            <el-select v-model="form.region">
              <el-option
                label="application/json"
                value="application/json"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="Enable Request" :label-width="formLabelWidth">
            <el-switch v-model="form.value" active-color="#13ce66"></el-switch>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="dialogFormVisible = false"
            >OK</el-button
          >
        </div>
      </el-dialog>
    </template>
    <template #pager>
      <el-pagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="1000"
      ></el-pagination>
    </template>
  </ducky-table-layout>
</template>
<script>
import demoTableData from "../static/data/demo-apiserver.js";
export default {
  data() {
    return {
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
        value: false,
      },
      formLabelWidth: "120px",
      value: "",
      input3: "",
      tableData: demoTableData,
    };
  },
  methods: {
    onRowEnableRequest(api) {
      console.log(api);
    },
    onRowEdit(index, row) {
      console.log(index, row);
    },
    onRowDelete(index, row) {
      console.log(index, row);
    },
  },
  computed: {
    options() {
      return demoTableData.map((x) => {
        return {
          value: x.name,
          label: x.name,
        };
      });
    },
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
