<!--
 * @Author: Ducky
 * @Date: 2020-05-31 14:13:49
 * @LastEditTime: 2020-05-31 15:18:16
 * @LastEditors: Ducky
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/ducky-ui/components/json-editor/JsonEditor.vue
 * @
--> 
<template>
  <div
    class="ducky-json-editor"
    style="margin-top:5px;"
    :style="{height:height+'px'}"
    ref="jsonEditor"
  ></div>
</template>
<script>
import jsonEditor from "jsoneditor/dist/jsoneditor";
import "jsoneditor/dist/jsoneditor.css";
export default {
  data() {
    return {
      jsonEditor,
      defaultConfigs: {
        mode: "text",
        indentation: 2,
        search: false,
        enableSort: false,
        mainMenuBar: true,
        statusBar: false,
        enableTransform: false,
        navigationBar: false
      },
      json: null
    };
  },
  props: {
    jsonString: String,
    height: Number,
    configs: Object
  },
  methods: {
    format() {
      this.jsonEditor.format();
    },
    compact() {
      this.jsonEditor.compact();
    },
    getText() {
      return this.jsonEditor.getText();
    }
  },
  mounted() {
    let container = this.$refs.jsonEditor;
    // combine editor configs
    if (this.configs) {
      for (const config in this.configs) {
        if (Object.prototype.hasOwnProperty.call(this.configs, config)) {
          this.defaultConfigs[config] = this.configs[config];
        }
      }
    }

    this.jsonEditor = new jsonEditor(container, this.defaultConfigs);
    if (this.jsonString) {
      try {
        this.json = JSON.parse(this.jsonString);
      } catch {
        throw Error("jsonString is not a valid json text");
      }
      this.jsonEditor.set(this.json);
    }
  }
};
</script>
<style lang="scss">
.jsoneditor-menu {
  background-color: #409eff;
  border-bottom: 1px solid #409eff;
}
.jsoneditor {
  border: 1px solid #dcdfe6;
}
.jsoneditor-statusbar {
  background-color: #f6f6f6;
}
.jsoneditor-contextmenu .jsoneditor-menu li button.jsoneditor-selected,
.jsoneditor-contextmenu .jsoneditor-menu li button.jsoneditor-selected:hover {
  background-color: #409eff;
}
</style>