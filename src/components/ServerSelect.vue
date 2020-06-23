<!--
 * @Description: 
 * @Version: 1.0
 * @Author: Ducky Yang
 * @Date: 2020-06-23 18:53:03
 * @LastEditors: Ducky
 * @LastEditTime: 2020-06-23 21:46:16
-->
<template>
  <div>
    <div class="ducky-tools">
      <el-input
        v-model="filterKey"
        suffix-icon="el-icon-search"
        placeholder="please input server name"
      ></el-input>
    </div>
    <ducky-simple-tree :data="data" :simple="true" :filter="filterKey" @node-click="onNodeClick">
      <template #title="slotProp">
        <div class="ducky-server">
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
            @click.stop
            class="ducky-server-menu"
          >
            <el-dropdown trigger="click" @command="onServerMenuClick">
              <span class="el-dropdown-link">
                <i class="el-icon-more"></i>
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-if="slotProp.node.isServer"
                  :command="{ node: slotProp.node, type: 0 }"
                >Add Collection</el-dropdown-item>
                <el-dropdown-item :command="{ node: slotProp.node, type: 1 }">Add Request</el-dropdown-item>
                <el-dropdown-item
                  v-if="!slotProp.node.isServer"
                  :command="{ node: slotProp.node, type: 2 }"
                >Remove</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </template>
    </ducky-simple-tree>
    <el-dialog :visible.sync="addCollectionFromVisible" :title="collectionFormTitle">
      <el-form :model="collectionForm" :rules="rules" ref="collectionForm">
        <el-form-item label="Name" prop="name">
          <el-input v-model="collectionForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCollectionFromVisible = false">Cancel</el-button>
        <el-button v-if="collectionForm.type === 0" type="primary" @click="onAddCollection">Add</el-button>
        <el-button v-if="collectionForm.type === 1" type="primary" @click="onAddRequest">Add</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import documents from "../api/documents";
import servers from "../api/servers";
export default {
  data() {
    return {
      currentNode: null,
      origin: [],
      data: [],
      filterKey: "",
      addCollectionFromVisible: false,
      collectionFormTitle: "",
      collectionForm: {
        serverId: "",
        collectionId: "",
        type: 0,
        name: ""
      },
      rules: {
        name: [
          { required: true, message: "please input name", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    onNodeClick(node) {
      // the last stage node
      if (!node.isServer && !node.isCollection) {
        this.currentNode = node;
      }
    },
    onServerMenuClick(data) {
      switch (data.type) {
        case 0:
        case 1:
          this.onShowCollectionForm(data);
          break;
        case 2:
          this.onRemoveCollectionOrRequest(data);
          break;
        default:
          break;
      }
    },
    onShowCollectionForm(data) {
      this.collectionForm.type = data.type;
      this.collectionForm.serverId = data.node.isServer
        ? data.node.id
        : data.node.pid;
      this.collectionForm.collectionId = data.node.isCollection
        ? data.node.id
        : "";
      if (data.type === 0) {
        this.collectionFormTitle = "Add Collection";
      } else {
        this.collectionFormTitle = "Add Request";
      }
      this.addCollectionFromVisible = true;
    },
    onRemoveCollectionOrRequest(data) {
      let msg = "";
      if (data.node.isCollection) {
        msg = "confirm to remove this collection?";
      } else {
        msg = "confirm to remove this request?";
      }
      this.$confirm(msg, "Warnning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning"
      }).then(() => {
        documents.remove(data.node.id);
        this.getServers();
      }).catch(r=>r);
    },
    onAddCollection() {
      this.$refs.collectionForm.validate(valid => {
        if (valid) {
          // add collection
          servers
            .addCollection(
              this.collectionForm.serverId,
              this.collectionForm.name
            )
            .then(() => {
              this.getServers();
              this.addCollectionFromVisible = false;
              this.collectionForm.name = "";
            })
            .catch(r => r);
        }
      });
    },
    onAddRequest() {
      this.$refs.collectionForm.validate(valid => {
        if (valid) {
          servers
            .addRequest(
              this.collectionForm.serverId,
              this.collectionForm.name,
              this.collectionForm.collectionId
            )
            .then(() => {
              this.getServers();
              this.addCollectionFromVisible = false;
              this.collectionForm.name = "";
            })
            .catch(r => r);
        }
      });
    },
    getServers() {
      documents
        .get()
        .then(response => {
          this.origin = response.data;
          this.data = response.data;
        })
        .catch(r => r);
    }
  },
  mounted() {
    this.getServers();
  }
};
</script>
<style lang="scss" scoped>
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
.ducky-server {
  height: 40px;
  line-height: 40px;
  position: relative;
  .ducky-server-menu {
    position: absolute;
    top: 0px;
    right: 5px;
    height: 40px;
    line-height: 40px;
  }
}
</style>
