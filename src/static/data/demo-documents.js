/*
 * @Author: your name
 * @Date: 2020-05-28 11:00:58
 * @LastEditTime: 2020-05-28 17:14:20
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ducky-api-terminal\src\static\data\demo-documents.js
 */

export default [
  {
    title: "Workflow 2.0",
    open: false,
    children: [],
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
    children: [],
  },
];
