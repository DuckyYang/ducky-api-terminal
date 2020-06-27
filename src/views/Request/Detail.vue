<!--
 * @Author: Ducky
 * @Date: 2020-05-31 20:52:37
 * @LastEditTime: 2020-06-27 10:33:03
 * @LastEditors: Ducky
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/views/Request/Detail.vue
 * @
-->
<template>
  <div class="ducky-request-form">
    <!-- Request Name -->
    <div class="ducky-request-name">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item v-for="(item, index) in data.path" :key="index">
          {{
          item
          }}
        </el-breadcrumb-item>
      </el-breadcrumb>
      <el-button
        @click="onRemove"
        type="danger"
        size="small"
        style="position:absolute;right:160px;top:0;"
      >Remove</el-button>
      <el-button
        @click="onReset"
        type="primary"
        size="small"
        style="position:absolute;right:80px;top:0;"
      >Reset</el-button>
      <el-button
        @click="onSave"
        type="primary"
        size="small"
        style="position:absolute;right:10px;top:0;"
      >Save</el-button>
    </div>
    <div class="ducky-request-info">
      <!-- Protocal and Reuqest Address -->
      <div class="ducky-request-info__address">
        <el-input
          placeholder="please input request address"
          v-model="data.address"
          class="input-with-select"
        >
          <el-select v-model="data.method" slot="prepend" placeholder="please choose method">
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
        <el-button
          @click="onAddHeader"
          style="margin-left:10px;"
          type="primary"
          size="small"
        >Add Header</el-button>
        <el-table
          :data="data.headers"
          :height="defaultHeaderTableHeight"
          border
          style="width: 100%;margin-top:5px;"
        >
          <el-table-column prop="key" label="Header Name">
            <el-input slot-scope="scope" v-model="scope.row.key"></el-input>
          </el-table-column>
          <el-table-column prop="value" label="Value">
            <el-input slot-scope="scope" v-model="scope.row.value"></el-input>
          </el-table-column>
          <el-table-column fixed="right" label width="100">
            <template slot-scope="scope">
              <el-button @click="onRemoveHeader(scope.row)" type="danger" size="mini">Remove</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- Request Parameters, json Or form-urlencoded -->
      <el-divider content-position="left">Request Parameters</el-divider>
      <div class="ducky-request-info__parameters">
        <el-tabs stretch :value="data.contentType" @tab-click="onTabClick">
          <el-tab-pane label="params" name="params">
            <el-button
              @click="onAddParameter"
              style="margin-left:10px;"
              type="primary"
              size="small"
            >Add Parameter</el-button>
            <el-table
              :data="data.params"
              :height="defaultParamTableHeight"
              border
              style="width:100%;margin-top:5px;"
              ref="paramTable"
            >
              <el-table-column prop="key" label="Key">
                <el-input slot-scope="scope" v-model="scope.row.key"></el-input>
              </el-table-column>
              <el-table-column prop="value" label="Value">
                <el-input slot-scope="scope" v-model="scope.row.value"></el-input>
              </el-table-column>
              <el-table-column fixed="right" label width="100">
                <template slot-scope="scope">
                  <el-button @click="onRemoveParam(scope.row)" type="danger" size="mini">Remove</el-button>
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
            <ducky-json-editor v-bind="jsonEditorData" :jsonString="data.json" ref="jsonEditor"></ducky-json-editor>
          </el-tab-pane>
          <el-tab-pane label="form-urlencoded" name="form">
            <el-button
              @click="onAddBodyParam"
              style="margin-left:10px;"
              type="primary"
              size="small"
            >Add Parameter</el-button>
            <el-table
              :data="data.body"
              :height="defaultBodyTableHeight"
              border
              style="width:100%;margin-top:5px;"
              ref="bodyTable"
            >
              <el-table-column prop="key" label="Key">
                <el-input slot-scope="scope" v-model="scope.row.key"></el-input>
              </el-table-column>
              <el-table-column prop="value" label="Value">
                <el-input slot-scope="scope" v-model="scope.row.value"></el-input>
              </el-table-column>
              <el-table-column fixed="right" label width="100">
                <template slot-scope="scope">
                  <el-button @click="onRemoveBodyParam(scope)" type="danger" size="mini">Remove</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>
      </div>
      <!-- Server Response -->
      <el-divider content-position="left">Response Message</el-divider>
      <div class="ducky-response-info">
        <ducky-json-editor v-bind="jsonEditorData" :jsonString="data.response"></ducky-json-editor>
      </div>
    </div>
  </div>
</template>
<script>
import utils from "../../plugin/utils";
import api from "../../api/index";
export default {
  data() {
    return {
      data: {
        id: utils.uuid(),
        path: [],
        method: "GET",
        address: "",
        headers: [{ id: utils.uuid(), key: "", value: "" }],
        contentType: "params",
        params: [{ id: utils.uuid(), key: "", value: "" }], // url parameters
        body: [{ id: utils.uuid(), key: "", value: "" }], // body parameter
        json: "", // json parameter
        response: ""
      },
      defaultMethod: "GET",
      jsonEditorData: {
        height: 280,
        configs: {
          mainMenuBar: false
        },
        jsonString: ""
      }
    };
  },
  props: {
    request: Object
  },
  methods: {
    onTabClick(tab) {
      this.data.contentType = tab.name;
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
    getJson() {},
    onSave() {
      if (this.data.contentType === 'json') {
        this.data.json = this.$refs.jsonEditor.getText();
      }
      api.request
        .update(this.data.id, this.data)
        .then(() => {
          // notify parent component to update requests list
          this.$emit('request-save');
          this.$message({
            message: "the request save successfully!",
            type: "success"
          });
        })
        .catch(r => r);
    },
    onReset() {
      this.data = {
        path: [],
        method: "GET",
        address: "",
        headers: [{ id: utils.uuid(), key: "", value: "" }],
        contentType: "params",
        params: [{ id: utils.uuid(), key: "", value: "" }], // url parameters
        body: [{ id: utils.uuid(), key: "", value: "" }], // body parameter
        json: "", // json parameter
        response: ""
      };
      this.$nextTick(() => {
        this.$message({
          message: "the request has been reset!",
          type: "success"
        });
      });
    },
    onAddHeader() {
      this.data.headers.push({ id: utils.uuid(), key: "", value: "" });
    },
    onRemoveHeader(row) {
      let index = this.data.headers.findIndex(x => x.id === row.id);
      this.data.headers.splice(index, 1);
    },
    onAddParameter() {
      this.data.params.push({ id: utils.uuid(), key: "", value: "" });
    },
    onRemoveParam(row) {
      let index = this.data.params.findIndex(x => x.id === row.id);
      this.data.params.splice(index, 1);
    },
    onAddBodyParam() {
      this.data.body.push({ id: utils.uuid(), key: "", value: "" });
    },
    onRemoveBodyParam(row) {
      let index = this.data.body.findIndex(x => x.id === row.id);
      this.data.body.splice(index, 1);
    },
    onRemove() {
      this.$confirm(
        "Please confirm whether to remove the current request!",
        "Warning",
        {
          confirmButtonText: "OK",
          cancelButtonText: "Cancel",
          type: "warning"
        }
      )
        .then(() => {
          api.request
            .remove(this.data.id)
            .then(() => {
              this.$emit('request-removed');
              this.$message({
                type: "success",
                message: "remove successfully!"
              });
            })
            .catch(r => r);
        })
        .catch(() => {});
    }
  },
  computed: {
    defaultHeaderTableHeight() {
      return this.data.headers.length * 65 + 50;
    },
    defaultBodyTableHeight() {
      return this.data.body.length * 65 + 50;
    },
    defaultParamTableHeight() {
      return this.data.params.length * 65 + 50;
    }
  },
  watch: {
    request: function() {
      if (this.request) {
        utils.assign(this.data, this.request);
      }
    }
  },
  created() {
    if (this.request) {
      utils.assign(this.data, this.request);
    }
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
