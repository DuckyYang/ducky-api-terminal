/*
 * @Author: your name
 * @Date: 2020-06-04 14:11:09
 * @LastEditTime: 2020-06-04 14:15:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ducky-api-terminal\vue.config.js
 */ 
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://local.oa.cnki.net", //代理接口
        changeOrigin: true,
        pathRewrite: {
          "^/api": "", //代理的路径
        },
      },
    },
  },
};
