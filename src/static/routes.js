/*
 * @Author: Ducky
 * @Date: 2020-05-24 15:16:01
 * @LastEditTime: 2020-05-26 11:59:51
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: /ducky-ui/src/static/routes.js
 * @
 */ 

const Routes = [
    {
      path:'/',
      name:'DashBoard',
      component: ()=>import('../views/DashBoard.vue'),
      meta:{
        id:1,
        cnName:'工作台',
        icon:'el-icon-s-home'
      }
    },
    {
      path:'/Logs',
      name:'Logs',
      component:()=>import( '../views/Logs.vue' ),
      meta:{
        id:2,
        cnName:'接口日志',
        icon:'el-icon-s-data'
      }
    },
    {
      path:'/Registe',
      name:'ApiRegiste',
      component:()=>import( '../views/ApiRegiste.vue' ),
      meta:{
        id:3,
        cnName:'接口注册',
        icon:'el-icon-s-promotion'
      }
    },
    {
      path:'/Documents',
      name:'ApiDocument',
      component:()=>import( '../views/ApiDocument.vue' ),
      meta:{
        id:4,
        cnName:'接口文档',
        icon:'el-icon-document'
      }
    },
    {
      path:'/MockServer',
      name:'MockServer',
      component:()=>import( '../views/MockServer.vue' ),
      meta:{
        id:5,
        cnName:'Mock服务',
        icon:'el-icon-s-platform'
      }
    },
    {
      path:'/Users',
      name:'Users',
      component:()=>import( '../views/Users.vue' ),
      meta:{
        id:6,
        cnName:'用户管理',
        icon:'el-icon-s-custom'
      }
    },
    {
      path:'/settings',
      name:'Settings',
      component:()=>import('../views/Settings.vue'),
      meta:{
        id:7,
        cnName:'系统设置',
        icon:'el-icon-setting'
      }
    }
  ]
export default Routes