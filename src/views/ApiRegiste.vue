<!--
 * @Author: Ducky
 * @Date: 2020-05-24 15:08:50
 * @LastEditTime: 2020-05-26 12:59:14
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: /ducky-ui/src/views/ApiRegiste.vue
 * @
-->
<template>
  <div class="ducky-layout-container__wrapper">
    <div class="ducky-api-container" ref="api">
      <!-- Log Tool Bar -->
      <div class="ducky-api-toolbar">
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
      </div>
      <!-- Log Data -->
      <div class="ducky-api-data">
        <el-table
          :data="tableData"
          :height="tableHeight"
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
        </el-table>
      </div>
      <!-- Log Pager Bar -->
      <div class="ducky-api-pager">
        <el-pagination
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="1000"
        ></el-pagination>
      </div>
    </div>
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
          <el-switch v-model="form.value" active-color="#13ce66"> </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false"
          >OK</el-button
        >
      </div>
    </el-dialog>
  </div>
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
      tableHeight: 600,
      value: "",
      input3: "",
      tableData: demoTableData,
    };
  },
  methods: {
    onRowEnableRequest(api) {
      console.log(api);
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
  mounted() {
    let _this = this;
    this.$nextTick(() => {
      this.tableHeight = this.$refs.api.clientHeight - 180;
    });
    window.onresize = function() {
      _this.tableHeight = _this.$refs.api.clientHeight - 180;
    };
  },
};
</script>
<style lang="scss" scoped>
.ducky-api-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  .ducky-api-toolbar {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    padding: 10px 5px;
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
  .ducky-api-data {
    background-color: #fff;
    width: 100%;
    margin-top: 20px;
    box-sizing: border-box;
    flex: 1;
  }
  .ducky-api-pager {
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
