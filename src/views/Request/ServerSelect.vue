<!--
 * @Description: 
 * @Version: 1.0
 * @Author: Ducky Yang
 * @Date: 2020-06-23 18:53:03
 * @LastEditors: Ducky
 * @LastEditTime: 2020-06-27 19:11:40
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
    <ducky-simple-tree
      :data="requests"
      :simple="true"
      :filter="filterKey"
      @node-click="onNodeClick"
    >
      <template #title="slotProp">
        <div class="ducky-server">
          <i
            v-if="slotProp.node.isServer || slotProp.node.isCollection"
            :class="
              slotProp.node.open
                ? 'el-icon-caret-bottom'
                : 'el-icon-caret-right'
            "
          ></i>
          <span
            v-if="slotProp.node.request && slotProp.node.request.method"
            :class="'ducky-method '+slotProp.node.request.method"
          >{{slotProp.node.request.method}}</span>
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
                  v-if="!slotProp.node.isServer && slotProp.node.isCollection"
                  :command="{ node: slotProp.node, type: 2 }"
                >Remove</el-dropdown-item>
                <el-dropdown-item
                  v-if="!slotProp.node.isServer && !slotProp.node.isCollection"
                  :command="{ node: slotProp.node, type: 3 }"
                >Remove</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </template>
    </ducky-simple-tree>
    <el-dialog :visible.sync="addCollectionFormVisible" :title="collectionFormTitle">
      <el-form :model="collectionForm" :rules="rules" ref="collectionForm">
        <el-form-item label="Name" prop="name">
          <el-input v-model="collectionForm.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCollectionFormVisible = false">Cancel</el-button>
        <el-button v-if="collectionForm.type === 0" type="primary" @click="onAddCollection">Add</el-button>
        <el-button v-if="collectionForm.type === 1" type="primary" @click="onAddRequest">Add</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import api from "../../api/index";
import cache from "../../plugin/cache";
export default {
  data() {
    return {
      currentRequest: null,
      requests: [],
      filterKey: "",
      addCollectionFormVisible: false,
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
    onNodeClick(request) {
      // the last stage node
      if (!request.isServer && !request.isCollection) {
        this.currentRequest = request;
        this.$emit("request-click", request);
      }
      // save tree node status
      let opened = cache.get("open-servers");
      if (!opened) {
        opened = [];
      }
      if (request.open) {
        opened.push(request.id);
      } else {
        opened.remove(x => x === request.id);
      }
      cache.set("open-servers", opened);
    },
    onServerMenuClick(data) {
      switch (data.type) {
        case 0:
        case 1:
          this.onShowCollectionForm(data);
          break;
        case 2:
          this.onRemoveCollection(data);
          break;
        case 3:
          this.onRemoveRequest(data);
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
      this.addCollectionFormVisible = true;
    },
    onRemoveCollection(data) {
      let msg = "confirm to remove this collection?";
      this.$confirm(msg, "Warnning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning"
      })
        .then(() => {
          api.collections.remove(data.node.id);
        })
        .catch(r => r);
    },
    onRemoveRequest(data) {
      let msg = "confirm to remove this collection?";
      this.$confirm(msg, "Warnning", {
        confirmButtonText: "OK",
        cancelButtonText: "Cancel",
        type: "warning"
      })
        .then(() => {
          api.request.remove(data.node.id);
        })
        .catch(r => r);
    },
    onAddCollection() {
      this.$refs.collectionForm.validate(valid => {
        if (valid) {
          // add collection
          api.servers
            .addCollection(
              this.collectionForm.serverId,
              this.collectionForm.name
            )
            .then(() => {
              this.addCollectionFormVisible = false;
              this.collectionForm.name = "";
              this.getRequests();
            })
            .catch(r => r);
        }
      });
    },
    onAddRequest() {
      this.$refs.collectionForm.validate(valid => {
        if (valid) {
          api.collections
            .addRequest(
              this.collectionForm.collectionId,
              this.collectionForm.name
            )
            .then(() => {
              this.addCollectionFormVisible = false;
              this.collectionForm.name = "";
              this.getRequests();
            })
            .catch(r => r);
        }
      });
    },
    getRequests() {
      api.request
        .get()
        .then(response => {
          let opened = cache.get("open-servers");
          response.data.forEach(x => {
            if (opened.some(item => item === x.id)) {
              x.open = true;
            }
          });
          this.requests = response.data;
        })
        .catch(r => r);
    },
    reload(){
      this.getRequests();
    }
  },
  mounted() {
    this.getRequests();
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
  .ducky-method {
    font-size: 12px;
    border-radius: 3px;
    box-sizing: border-box;
    border-width: 1px;
    border-style: solid;
    padding: 2px 4px;
    &.GET {
      border-color: #e1f3d8;
      background-color: #f0f9eb;
      color: #67c23a;
    }
    &.POST {
      border-color: #d9ecff;
      background-color: #ecf5ff;
      color: #409eff;
    }
    &.DELETE {
      border-color: #fde2e2;
      background-color: #fef0f0;
      color: #f56c6c;
    }
    &.PUT {
      border-color: #faecd8;
      background-color: #fdf6ec;
      color: #e6a23c;
    }
  }
}
</style>
