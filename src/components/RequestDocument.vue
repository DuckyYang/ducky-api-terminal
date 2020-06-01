<!--
 * @Author: Ducky
 * @Date: 2020-05-31 20:52:37
 * @LastEditTime: 2020-06-01 16:52:26
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/components/RequestDocument.vue
 * @
--> 
<template>
  <div class="ducky-request-form">
    <!-- Request Name -->
    <div class="ducky-request-name">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>Workflow2.0</el-breadcrumb-item>
        <el-breadcrumb-item>Task</el-breadcrumb-item>
        <el-breadcrumb-item>AddTask</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button @click="onReset" type="primary" size="small" style="position:absolute;right:80px;top:0;">Reset</el-button>
      <el-button @click="onSave" type="primary" size="small" style="position:absolute;right:10px;top:0;">Save</el-button>
    </div>
    <div class="ducky-request-info">
      <!-- Protocal and Reuqest Address -->
      <div class="ducky-request-info__address">
        <el-input
          placeholder="please input request address"
          v-model="address"
          class="input-with-select"
        >
          <el-select v-model="defaultMethod" slot="prepend" placeholder="please choose method">
            <el-option label="GET" value="GET"></el-option>
            <el-option label="POST" value="POST"></el-option>
            <el-option label="PUT" value="PUT"></el-option>
            <el-option label="DELETE" value="DELETE"></el-option>
          </el-select>
          <el-button slot="append">Send</el-button>
        </el-input>
      </div>
      <!-- Request Headers  -->
      <el-divider content-position="left">Request Headers</el-divider>
      <div class="ducky-request-info__headers">
        <el-button style="margin-left:10px;" type="primary" size="small">Add Header</el-button>
        <el-table
          :data="tableData"
          :height="defaultHeaderTableHeight"
          border
          style="width: 100%;margin-top:5px;"
        >
          <el-table-column prop="Name" label="Header Name">
            <el-input slot-scope="scope" v-model="scope.row.Name"></el-input>
          </el-table-column>
          <el-table-column prop="Value" label="Value">
            <el-input slot-scope="scope" v-model="scope.row.Value"></el-input>
          </el-table-column>
          <el-table-column fixed="right" label width="100">
            <template>
              <el-button type="danger" size="mini">Remove</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- Request Parameters, json Or form-urlencoded -->
      <el-divider content-position="left">Request Parameters</el-divider>
      <div class="ducky-request-info__parameters">
        <el-tabs stretch value="json" @tab-click="onTabClick">
           <el-tab-pane label="params" name="params">
            <el-button style="margin-left:10px;" type="primary" size="small">Add Parameter</el-button>
            <el-table
              :data="tableData2"
              :height="defaultParamTableHeight"
              border
              style="width:100%;margin-top:5px;"
              ref="paramTable"
            >
              <el-table-column prop="Name" label="Key">
                <el-input slot-scope="scope" v-model="scope.row.Name"></el-input>
              </el-table-column>
              <el-table-column prop="Value" label="Value">
                <el-input slot-scope="scope" v-model="scope.row.Value"></el-input>
              </el-table-column>
              <el-table-column fixed="right" label width="100">
                <template>
                  <el-button type="danger" size="mini">Remove</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="json" name="json">
            <el-button
              style="margin-left:10px;"
              type="primary"
              @click="formatJson"
              size="mini"
            >Format</el-button>
            <el-button size="mini" type="primary" @click="compactJson">Compact</el-button>
            <el-button size="mini" type="primary" @click="getJson">Get Value</el-button>
            <ducky-json-editor v-bind="jsonEditorData" ref="jsonEditor"></ducky-json-editor>
          </el-tab-pane>
          <el-tab-pane label="form-urlencoded" name="form">
            <el-button style="margin-left:10px;" type="primary" size="small">Add Parameter</el-button>
            <el-table
              :data="tableData1"
              :height="defaultBodyTableHeight"
              border
              style="width:100%;margin-top:5px;"
              ref="bodyTable"
            >
              <el-table-column prop="Name" label="Key">
                <el-input slot-scope="scope" v-model="scope.row.Name"></el-input>
              </el-table-column>
              <el-table-column prop="Value" label="Value">
                <el-input slot-scope="scope" v-model="scope.row.Value"></el-input>
              </el-table-column>
              <el-table-column fixed="right" label width="100">
                <template>
                  <el-button type="danger" size="mini">Remove</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- Server Response -->
      <el-divider content-position="left">Response Message</el-divider>
      <div class="ducky-response-info">
        <ducky-json-editor v-bind="jsonEditorData" :jsonString="responseData"></ducky-json-editor>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      defaultMethod: "GET",
      address: "",
      tableData: [
        {
          Name: "accesstoken",
          Value: "abcdefghijklmn"
        }
      ],
      tableData1: [
        {
          Name: "ID",
          Value: "11"
        }
      ],
      tableData2: [
        {
          Name: "ID",
          Value: "11"
        }
      ],
      jsonEditorData: {
        height: 280,
        configs: {
          mainMenuBar: false
        },
        jsonString: ""
      },
      responseData:
        '{"Code":200,"Success":true,"Data":null,"Total":0,"Message":"Request Success!"}'
    };
  },
  props:{
    node:Object
  },
  methods: {
    onTabClick(tab) {
      if (tab.name === "form") {
        this.$nextTick(() => {
          this.$refs.bodyTable.doLayout();
        });
      }
      if (tab.name === "params") {
        this.$nextTick(() => {
          this.$refs.paramTable.doLayout();
        });
      }
    },
    formatJson() {
      this.$refs.jsonEditor.format();
    },
    compactJson() {
      this.$refs.jsonEditor.compact();
    },
    getJson() {
      console.log(this.$refs.jsonEditor.getText());
    },
    onSave(){
        this.$message({message:'the request has been saved!',type: 'success'})
    },
    onReset(){
        this.$message({message:'the request has been reset!',type:'success'})
    }
  },
  computed: {
    defaultHeaderTableHeight() {
      return this.tableData.length * 65 + 50;
    },
    defaultBodyTableHeight() {
      return this.tableData1.length * 65 + 50;
    },
    defaultParamTableHeight() {
      return this.tableData2.length * 65 + 50;
    }
  },
  created(){
    
  }
};
</script>
<style lang="scss" scoped>
.ducky-request-form {
  width: 100%;
  // height: 100%;
  box-sizing: border-box;
  padding: 10px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  border-left: 1px solid #dcdfe6;
  .ducky-request-name {
    width: 100%;
    height: 38px;
    line-height: 38px;
    box-sizing: border-box;
    padding-top: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #dcdfe6;
    position: relative;
    
  }
  .ducky-request-name:after{
      content: '.';
      height: 0;
      width: 0;
      // display:block; 
      clear:both;
      visibility: hidden;
    }
  .ducky-request-info {
    display: flex;
    flex-direction: column;
    padding-right: 20px;
    .ducky-request-info__address {
      width: 100%;
      height: 40px;
      line-height: 40px;
      .el-select {
        width: 120px;
      }
    }
    .ducky-request-info__headers {
      width: 100%;
      padding-bottom: 20px;
    }
    .ducky-request-info__parameters {
      width: 100%;
      border: 1px solid #dcdfe6;
      box-sizing: border-box;
    }
  }
}
</style>