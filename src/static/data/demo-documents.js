/*
 * @Author: your name
 * @Date: 2020-05-28 11:00:58
 * @LastEditTime: 2020-05-28 21:52:16
 * @LastEditors: Ducky
 * @Description: In User Settings Edit
 * @FilePath: /ducky-api-terminal/src/static/data/demo-documents.js
 */

export default [
  {
    title: "Workflow 2.0",
    open: false,
    children: [{
      title: "Task",
      open: true,
      children: [
        {
          title: "CreateTask",
          open: false,
          children: [],
        }, {
          title: "GetTodoList",
          open: false,
          children: [],
        }, {
          title: "GetTaskList",
          open: false,
          children: [],
        }, {
          title: "GetCreateMan",
          open: false,
          children: [],
        },
      ]
    }],
  },
  {
    title: "HRManage",
    open: true,
    children: [
      {
        title: "AskForLeave",
        open: true,
        children: [
          {
            title: "Add Request",
            open: false,
            children: [],
          }, {
            title: "AddAskForLeave",
            open: false,
            children: [],
          }, {
            title: "UpdateAskForLeave",
            open: false,
            children: [],
          }, {
            title: "DeleteAskForLeave",
            open: false,
            children: [],
          }, {
            title: "AddFiles",
            open: false,
            children: [],
          },
        ],
      },
      {
        title: "AddTest",
        open: false,
        children: [],
      },
    ],
  },
  {
    title: "Sale Manage",
    open: false,
    children: [
      {
        title: 'AddSaleInfo',
        open: false,
        children: [],
      }
    ],
  },
];
