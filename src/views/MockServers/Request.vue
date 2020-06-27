<!--
 * @Author: Ducky
 * @Date: 2020-06-07 09:28:23
 * @LastEditTime: 2020-06-26 19:37:28
 * @LastEditors: Ducky
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/views/MockServers/Request.vue
 * @
-->
<template>
  <div class="ducky-request-form">
    <!-- Request Name -->
    <div class="ducky-request-name">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item, index) in data.path" :key="index">{{
          item
        }}</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button
        @click="onReset"
        type="primary"
        size="small"
        style="position:absolute;right:80px;top:0;"
        >Reset</el-button
      >
      <el-button
        @click="onSave"
        type="primary"
        size="small"
        style="position:absolute;right:10px;top:0;"
        >Save</el-button
      >
    </div>
    <div class="ducky-request-info">
      <!-- Protocal and Reuqest Address -->
      <div class="ducky-request-info__address">
        <el-input
          placeholder="please input request address"
          v-model="data.address"
          class="input-with-select"
        >
          <el-select
            v-model="data.method"
            slot="prepend"
            placeholder="please choose method"
          >
            <el-option label="GET" value="GET"></el-option>
            <el-option label="POST" value="POST"></el-option>
            <el-option label="PUT" value="PUT"></el-option>
            <el-option label="DELETE" value="DELETE"></el-option>
          </el-select>
          <el-button slot="append">Send</el-button>
        </el-input>
      </div>
      <!-- Request Rules  -->
      <el-divider content-position="left">Request Rules</el-divider>
      <div class="ducky-request-info__rules">
        <el-button
          @click="onAddRule"
          style="margin-left:10px;"
          type="primary"
          size="small"
          >Add Rule</el-button
        >
        <el-link
          target="_blank"
          href="https://github.com/nuysoft/Mock/wiki/Syntax-Specification"
          :underline="false"
          type="primary"
          icon="el-icon-s-promotion"
          >learn mock rules</el-link
        >
        <el-table
          :data="data.rules"
          :height="defaultRuleTableHeight"
          border
          style="width: 100%;margin-top:5px;"
        >
          <el-table-column prop="key" label="Rule">
            <el-input slot-scope="scope" v-model="scope.row.key"></el-input>
          </el-table-column>
          <el-table-column prop="value" label="Value">
            <el-input slot-scope="scope" v-model="scope.row.value"></el-input>
          </el-table-column>
          <el-table-column fixed="right" label width="100">
            <template slot-scope="scope">
              <el-button
                @click="onRemoveRule(scope.row)"
                type="danger"
                size="mini"
                >Remove</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- Server Response -->
      <el-divider content-position="left">Response Message</el-divider>
      <div class="ducky-response-info">
        <ducky-json-editor
          v-bind="jsonEditorData"
          :jsonString="data.response"
        ></ducky-json-editor>
      </div>
    </div>
  </div>
</template>
<script>
import utils from "../../plugin/utils";
export default {
  data() {
    return {
      data: {
        id: -1,
        path: [],
        method: "GET",
        address: "",
        rules: [{ id: utils.uuid(), key: "", value: "" }],
        response: "",
      },
      defaultMethod: "GET",
      jsonEditorData: {
        height: 280,
        configs: {
          mainMenuBar: false,
        },
        jsonString: "",
      },
    };
  },
  props: {
    node: Object,
  },
  methods: {
    onSave() {
      this.$message({
        message: "the request has been saved!",
        type: "success",
      });
    },
    onReset() {
      this.data = {
        id: -1,
        path: [],
        method: "GET",
        address: "",
        rules: [{ id: utils.uuid(), key: "", value: "" }],
        contentType: "params",
        params: [{ id: utils.uuid(), key: "", value: "" }], // url parameters
        body: [{ id: utils.uuid(), key: "", value: "" }], // body parameter
        json: "", // json parameter
        response: "",
      };
      this.$nextTick(() => {
        this.$message({
          message: "the request has been reset!",
          type: "success",
        });
      });
    },
    onAddRule() {
      this.data.rules.push({ id: utils.uuid(), key: "", value: "" });
    },
    onRemoveRule(row) {
      let index = this.data.rules.findIndex((x) => x.id === row.id);
      this.data.rules.splice(index, 1);
    },
  },
  computed: {
    defaultRuleTableHeight() {
      return this.data.rules.length * 65 + 50;
    },
  },
  watch: {
    node: function() {
      if (this.node.document) {
        let document = this.node.document;
        utils.assign(this.data, document);
      }
    },
  },
  created() {
    if (this.node.document) {
      let document = this.node.document;
      utils.assign(this.data, document);
    }
  },
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
  .ducky-request-name:after {
    content: ".";
    height: 0;
    width: 0;
    // display:block;
    clear: both;
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
    .ducky-request-info__rules {
      width: 100%;
      padding-bottom: 20px;
      a {
        display: inline-block;
        vertical-align: bottom;
        font-size: 14px;
      }
    }
  }
}
</style>
