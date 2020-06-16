<!--
 * @Author: Ducky
 * @Date: 2020-05-24 15:08:50
 * @LastEditTime: 2020-06-16 21:12:25
 * @LastEditors: Ducky
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/views/Servers.vue
 * @
-->
<template>
  <ducky-table-layout>
    <template #toolbar>
      <el-input placeholder="please input..." v-model="filter" class="ducky-tool-input">
        <el-button slot="append" icon="el-icon-search" @click="onSearch"></el-button>
      </el-input>
      <el-button-group class="ducky-tool-buttons">
        <el-button type="primary" @click="onRefresh">Refresh</el-button>
        <el-button type="primary" @click="addServerFormVisible = true">Add Server</el-button>
      </el-button-group>
    </template>
    <template v-slot="prop">
      <el-table :data="tableData" :height="prop.height">
        <el-table-column prop="name" label="Name" width="240"></el-table-column>
        <el-table-column prop="baseUrl" label="BaseURL" width="360"></el-table-column>
        <el-table-column prop="defaultHeaders" label="Default Headers" width="300"></el-table-column>
        <el-table-column prop="order" label="Order" width="80"></el-table-column>
        <el-table-column prop="enabled" label="Enabled" width="120">
          <template slot-scope="scope">
            <el-switch
              @change="onRowEnableRequest(scope.row)"
              v-model="scope.row.enabled"
              :inactive-value="0"
              :active-value="1"
              active-color="#13ce66"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="Operation" min-width="180">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="onRowEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="onRowDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="API Server" :visible.sync="addServerFormVisible">
        <el-form :model="form" :rules="rules" ref="addServerForm">
          <el-form-item label="Name" prop="name">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
           <el-form-item label="BaseURL">
            <el-input v-model="form.baseUrl" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Default Headers">
            <el-input v-model="form.defautl_headers" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="Order">
            <el-input type="number" v-model.number="form.order" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addServerFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="onAddServer">OK</el-button>
        </div>
      </el-dialog>
    </template>
    <template #pager>
      <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
    </template>
  </ducky-table-layout>
</template>
<script>
import servers from "../api/servers";

export default {
  data() {
    return {
      addServerFormVisible: false,
      form: {
        id: "",
        name: "",
        defaultHeaders: "",
        order: 0,
        baseUrl:''
      },
      rules: {
        name: [
          { required: true, message: "please input name", trigger: "blur" }
        ]
      },
      tableData: [],
      pageIndex: 1,
      pageSize: 15,
      total: 0,
      filter: ""
    };
  },
  methods: {
    onSearch(){
      this.getPagerData();
    },
    onRefresh(){
      this.pageIndex= 1;
      this.getPagerData();
    },
    onRowEnableRequest(api) {
      console.log(api);
    },
    onRowEdit(index, row) {
      console.log(index, row);
    },
    onRowDelete(index, row) {
      console.log(index, row);
    },
    onAddServer() {
      this.$refs.addServerForm.validate(valid => {
        if (valid) {
          if (!this.form.id) {
            servers
              .add(this.form)
              .then(() => {
                this.$refs.addServerForm.resetFields();
                this.addServerFormVisible = false;
                this.getPagerData();
              })
              .catch(r => r);
          } else {
            servers
              .edit(this.form.id, this.form)
              .then(() => {
                this.getPagerData();
              })
              .catch(r => r);
          }
        }
      });
    },
    getPagerData() {
      servers
        .get(this.filter, this.pageIndex, this.pageSize)
        .then(response => {
          this.tableData = response.data;
          this.total=response.total;
        })
        .catch(r => r);
    }
  },
  computed: {
  },
  mounted() {
    this.getPagerData();
  }
};
</script>
<style lang="scss" scoped>
.ducky-tool-input {
  width: 280px;
}
.ducky-tool-buttons {
  margin-left: 20px;
}
</style>
