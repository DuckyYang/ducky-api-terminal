<!--
 * @Author: Ducky
 * @Date: 2020-05-24 15:01:09
 * @LastEditTime: 2020-05-27 13:20:50
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/views/DashBoard.vue
 * @
-->
<template>
  <ducky-card-layout>
    <ducky-card-row>
      <ducky-card :col="3">
        <ve-line
          width="100%"
          height="100%"
          :data="chartData"
          :settings="chartSettings"
        ></ve-line>
      </ducky-card>
      <ducky-card :col="3">
        <ve-ring width="100%" height="100%" :data="chartData1"></ve-ring>
      </ducky-card>
      <ducky-card :col="3">
        <ve-bar width="100%" height="100%" :data="chartData3"></ve-bar>
      </ducky-card>
    </ducky-card-row>
    <ducky-card-row>
      <ducky-card :col="1">
        <ve-waterfall
          width="100%"
          height="100%"
          :data="chartData2"
        ></ve-waterfall>
      </ducky-card>
    </ducky-card-row>
    <ducky-card-row>
      <ducky-card :col="2">
        <ve-pie width="100%" height="100%" :data="chartData4"></ve-pie>
      </ducky-card>
      <ducky-card :col="2">
        <ve-ring width="100%" height="100%" :data="chartData1"></ve-ring>
      </ducky-card>
    </ducky-card-row>
  </ducky-card-layout>
</template>
<script>
export default {
  data() {
    this.chartSettings = {
      axisSite: { right: ["下单率"] },
      yAxisType: ["KMB", "percent"],
      yAxisName: ["数值", "比率"],
    };
    return {
      chartData: {
        columns: ["日期", "访问用户", "下单用户", "下单率"],
        rows: [
          { 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "1/6", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 },
        ],
      },
      chartData1: {
        columns: ["日期", "访问用户"],
        rows: [
          { 日期: "1/1", 访问用户: 1393 },
          { 日期: "1/2", 访问用户: 3530 },
          { 日期: "1/3", 访问用户: 2923 },
          { 日期: "1/4", 访问用户: 1723 },
          { 日期: "1/5", 访问用户: 3792 },
          { 日期: "1/6", 访问用户: 4593 },
        ],
      },
      chartData2: {
        columns: ["活动", "时间", "时间1", "时间2", "时间3"],
        rows: [
          { 活动: "吃饭", 时间: 40, 时间1: 4, 时间2: 4, 时间3: 4 },
          { 活动: "睡觉", 时间: 10, 时间1: 4, 时间2: 4, 时间3: 4 },
          { 活动: "打豆豆", 时间: 5, 时间1: 4, 时间2: 4, 时间3: 4 },
          { 活动: "上网", 时间: 5, 时间1: 4, 时间2: 4, 时间3: 4 },
          { 活动: "聊天", 时间: 5, 时间1: 4, 时间2: 4, 时间3: 4 },
          { 活动: "打游戏", 时间: 5, 时间1: 4, 时间2: 4, 时间3: 4 },
          { 活动: "写代码", 时间: 5, 时间1: 4, 时间2: 4, 时间3: 4 },
          { 活动: "看书", 时间: 5, 时间1: 4, 时间2: 4, 时间3: 4 },
        ],
      },
      chartData3: {
        columns: ["日期", "访问用户", "下单用户", "下单率"],
        rows: [
          { 日期: "1/1", 访问用户: 1393, 下单用户: 1093, 下单率: 0.32 },
          { 日期: "1/2", 访问用户: 3530, 下单用户: 3230, 下单率: 0.26 },
          { 日期: "1/3", 访问用户: 2923, 下单用户: 2623, 下单率: 0.76 },
          { 日期: "1/4", 访问用户: 1723, 下单用户: 1423, 下单率: 0.49 },
          { 日期: "1/5", 访问用户: 3792, 下单用户: 3492, 下单率: 0.323 },
          { 日期: "1/6", 访问用户: 4593, 下单用户: 4293, 下单率: 0.78 },
        ],
      },
      chartData4: {
        columns: ["日期", "访问用户"],
        rows: [
          { 日期: "1/1", 访问用户: 1393 },
          { 日期: "1/2", 访问用户: 3530 },
          { 日期: "1/3", 访问用户: 2923 },
          { 日期: "1/4", 访问用户: 1723 },
          { 日期: "1/5", 访问用户: 3792 },
          { 日期: "1/6", 访问用户: 4593 },
        ],
      },
    };
  }
};
</script>
