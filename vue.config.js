/*
 * @Author: your name
 * @Date: 2020-06-04 14:11:09
 * @LastEditTime: 2020-06-12 12:25:00
 * @LastEditors: Ducky Yang
 * @Description: In User Settings Edit
 * @FilePath: /ducky-api-terminal/vue.config.js
 */ 

module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "https://localhost:5001", //代理接口
        changeOrigin: true,
        secure: false,
        ws:true,
        pathRewrite: {
          "^/api": "", //代理的路径
        },
      },
    },
  },
};
