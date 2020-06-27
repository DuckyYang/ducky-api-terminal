<!--
 * @Author: Ducky
 * @Date: 2020-05-24 15:09:14
 * @LastEditTime: 2020-06-27 19:10:02
 * @LastEditors: Ducky
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/views/Request/Index.vue
 * @
-->
<template>
  <!-- default layout -->
  <div class="ducky-default-container">
    <!-- left -->
    <div class="ducky-default-container__left">
      <server-select @request-click="onRequestClick" ref="request"></server-select>
    </div>
    <!-- right -->
    <div class="ducky-default-container__right">
      <request-detail
        @request-save="onRequestSaved"
        @request-remove="onRequestRemoved"
        v-if="currentRequest !== null"
        :request="currentRequest"
      ></request-detail>
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
import RequestDetail from "./Detail";
import ServerSelect from "./ServerSelect";

export default {
  data() {
    return {
      currentRequest: null,
    };
  },
  components: {
    "request-detail": RequestDetail,
    'server-select': ServerSelect
  },
  methods: {
    onRequestClick(data) {
      this.currentRequest = data.request;
    },
    onRequestSaved() {
      this.$refs.request.reload();
    },
    onRequestRemoved(){
      this.$refs.request.reload();
    },
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
