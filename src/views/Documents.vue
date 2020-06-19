<!--
 * @Author: Ducky
 * @Date: 2020-05-24 15:09:14
 * @LastEditTime: 2020-06-19 17:35:05
 * @LastEditors: Ducky Yang
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/views/Documents.vue
 * @
-->
<template>
  <!-- default layout -->
  <div class="ducky-default-container">
    <!-- left -->
    <div class="ducky-default-container__left">
      <div class="ducky-tools">
        <el-input
          v-model="filterKey"
          suffix-icon="el-icon-search"
          placeholder="please input server name"
        ></el-input>
      </div>
      <ducky-simple-tree
        :data="data"
        :simple="true"
        :filter="filterKey"
        @node-click="onNodeClick"
      >
        <template #title="slotProp">
          <div style="height:40px;line-height:40px;position:relative;">
            <i
              v-if="slotProp.node.children.length > 0"
              :class="
                slotProp.node.open
                  ? 'el-icon-caret-bottom'
                  : 'el-icon-caret-right'
              "
            ></i>
            {{ slotProp.node.title }}
            <div
              v-if="slotProp.node.isServer || slotProp.node.isCollection"
              @click.stop=""
              style="position:absolute;top:0px;right:5px;height:40px;line-height:40px;"
            >
              <el-dropdown trigger="click" @command="onShowCollectionForm">
                <span class="el-dropdown-link">
                  <i class="el-icon-more"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    v-if="slotProp.node.isServer"
                    :command="{ node: slotProp.node, type: 0 }"
                    >Add Collection</el-dropdown-item
                  >
                  <el-dropdown-item :command="{ node: slotProp.node, type: 1 }"
                    >Add Request</el-dropdown-item
                  >
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </template>
      </ducky-simple-tree>
      <el-dialog
        :visible.sync="addCollectionFromVisible"
        :title="collectionFormTitle"
      >
        <el-form :model="collectionForm" :rules="rules" ref="collectionForm">
          <el-form-item label="Name" prop="name">
            <el-input
              v-model="collectionForm.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addCollectionFromVisible = false"
            >Cancel</el-button
          >
          <el-button type="primary" @click="onAddCollection">Add</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- right -->
    <div class="ducky-default-container__right">
      <request-document
        v-if="currentNode !== null"
        :node="currentNode"
      ></request-document>
      <div class="no-data" v-else>
        <dl>
          <dt>
            <img src="@/assets/no-data.png" alt />
          </dt>
          <dd style="text-align:center;font-size:14px;">choose a request</dd>
        </dl>
      </div>
    </div>
  </div>
</template>
<script>
import RequestDoc from "../components/RequestDocument";
// import data from "../static/data/demo-documents_1";
import documents from "../api/documents";
import servers from "../api/servers";
export default {
  data() {
    return {
      origin: [],
      data: [],
      currentNode: null,
      filterKey: "",
      addCollectionFromVisible: false,
      collectionFormTitle: "",
      collectionForm: {
        serverId:'',
        collectionId:'',
        type: 0,
        name: "",
      },
      rules: {
        name: [
          { required: true, message: "please input name", trigger: "blur" },
        ],
      },
    };
  },
  components: {
    "request-document": RequestDoc,
  },
  methods: {
    onNodeClick(node) {
      // the last stage node
      if (!node.isServer && !node.isCollection) {
        this.currentNode = node;
      }
    },
    onShowCollectionForm(data) {
      this.collectionForm.type = data.type;
      if (data.type === 0) {
        this.collectionFormTitle = "Add Collection";
      } else {
        this.collectionFormTitle = "Add Request";
      }
      this.addCollectionFromVisible = true;
    },
    onAddCollection() {
      // add collection
      if (this.collectionForm.type === 0) {
        servers.addCollection()
      }
    },
  },
  mounted() {
    documents
      .get()
      .then((response) => {
        this.origin = response.data;
        this.data = response.data;
      })
      .catch((r) => r);
  },
};
</script>
<style lang="scss" scoped>
.ducky-default-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  box-sizing: border-box;
  overflow: hidden;
  .ducky-default-container__left {
    width: 280px;
    height: 100%;
    background-color: #fff;
    box-sizing: border-box;
    position: relative;
    .ducky-tools {
      width: 100%;
      height: 60px;
      padding: 10px 10px 0;
      box-sizing: border-box;
      position: absolute;
      top: 0;
      left: 0;
    }
    .ducky-simpletree {
      padding-top: 60px;
    }
  }
  .ducky-default-container__right {
    width: 100%;
    height: 100%;
    flex: 1;
    box-sizing: border-box;
    overflow-y: auto;
    .no-data {
      height: 100%;
      width: 100%;
      background-color: #fff;
      border-left: 1px solid #f6f6f6;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
