/*
 * @Author: Ducky
 * @Date: 2020-05-24 15:16:01
 * @LastEditTime: 2020-06-08 20:02:48
 * @LastEditors: Ducky
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/router/routes.js
 * @
 */ 

const Routes = [
    {
      path:'/',
      name:'DashBoard',
      component: ()=>import('../views/DashBoard'),
      meta:{
        id:1,
        cnName:'工作台',
        icon:'el-icon-s-home'
      }
    },
    {
      path:'/logs',
      name:'Logs',
      component:()=>import( '../views/Logs' ),
      meta:{
        id:2,
        cnName:'接口日志',
        icon:'el-icon-s-data'
      }
    },
    {
      path:'/servers',
      name:'Servers',
      component:()=>import( '../views/Servers' ),
      meta:{
        id:3,
        cnName:'接口列表',
        icon:'el-icon-s-promotion'
      }
    },
    {
      path:'/documents',
      name:'Documents',
      component:()=>import( '../views/Documents' ),
      meta:{
        id:4,
        cnName:'接口文档',
        icon:'el-icon-document'
      }
    },
    {
      path:'/MockServer',
      name:'MockServer',
      component:()=>import( '../views/MockServer' ),
      meta:{
        id:5,
        cnName:'Mock服务',
        icon:'el-icon-s-platform'
      }
    },
    {
      path:'/Users',
      name:'Users',
      component:()=>import( '../views/Users' ),
      meta:{
        id:6,
        cnName:'用户管理',
        icon:'el-icon-s-custom'
      }
    },
    {
      path:'/roles',
      name:'Roles',
      component:()=>import('../views/Roles'),
      meta:{
        id:7,
        cnName:'角色管理',
        icon:'el-icon-s-platform'
      }
    },
    {
      path:'/settings',
      name:'Settings',
      component:()=>import('../views/Settings'),
      meta:{
        id:8,
        cnName:'系统设置',
        icon:'el-icon-setting'
      }
    }
  ]
export default Routes