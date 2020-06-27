<!--
 * @Author: your name
 * @Date: 2020-05-26 11:59:28
 * @LastEditTime: 2020-06-09 21:10:11
 * @LastEditors: Ducky
 * @Description: In User Settings Edit
 * @FilePath: /ducky-api-terminal/src/views/Settings.vue
-->
<template>
  <div class="ducky-default-container">
    <!-- API Warn Setting -->
    <el-divider content-position="left">API Warn</el-divider>
    <div class="ducky-settings-apiwarn">
      <el-form>
        <el-form-item label="API Warning Enabled">
          <el-switch v-model="apiWarngingEnabled" active-color="#13ce66"></el-switch>
        </el-form-item>
      </el-form>
    </div>
    <!-- Mock Server -->
    <!-- <el-divider content-position="left">Mock Server</el-divider>
    <div class="ducky-settings-mockserver">

    </div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      apiWarngingEnabled:true
    };
  },
  methods: {
  }
};
</script>
<style lang="scss" scoped>
.ducky-default-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  overflow: hidden;
  background-color: #ffffff;
  padding: 0 10px;
  .ducky-settings-rolesauth,
  .ducky-settings-apiwarn,
  .ducky-settings-mockserver {
    width: 100%;
  }
  .ducky-settings-rolesauth {
    .ducky-settings-rolesauth__add {
      margin-left: 20px;
      margin-bottom: 10px;
    }
  }
}
</style>
