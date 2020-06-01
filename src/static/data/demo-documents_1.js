/*
 * @Author: Ducky
 * @Date: 2020-05-31 21:06:46
 * @LastEditTime: 2020-06-01 13:05:33
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/static/data/demo-documents_1.js
 * @
 */
export default [
    {
        id: 1,
        title: "Workflow 2.0",
        open: false,
        pid: 0,
    },
    {
        id: 2,
        title: "Task",
        open: true,
        pid: 1
    },
    {
        id: 3,
        title: "CreateTask",
        open: false,
        pid: 2,
        document:{
            id:1,
            path:['Workflow2.0','Task','CreateTask'],
            method:'POST',
            address:'http://oa.cnki.net/api/workflow2.0/task',
            headers:[
                {'accesstoken':'asdfafdsfsadfdsaf'},
            ],
            contentType:'json',
            params:null,
            body:'{"name":"hi ducky"}',
            response:'{"Code": 200,"Success": true,"Data": null,"Total": 0,"Message": "Request Success!"}'
        }
    },
    {
        id: 4,
        title: "GetTodoList",
        open: false,
        pid: 2,
        document:{
            id:2,
            path:['Workflow2.0','Task','GetTodoList'],
            method:'GET',
            address:'http://oa.cnki.net/api/workflow2.0/GetTodoList',
            headers:[
                {'accesstoken':'asdfafdsfsadfdsaf'},
            ],
            contentType:'',
            params:{
                pageIndex: 1,
                pageSize:30,
                query:''
            },
            body:'',
            response:'{"Code": 200,"Success": true,"Data": null,"Total": 0,"Message": "Request Success!"}'
        }
    },
    {
        id: 5,
        title: "EditTask",
        open: false,
        pid: 2,
        document:{
            id:3,
            path:['Workflow2.0','Task','EditTask'],
            method:'PUT',
            address:'http://oa.cnki.net/api/workflow2.0/{id}/EditTask',
            headers:[
                {'accesstoken':'asdfafdsfsadfdsaf'},
            ],
            contentType:'json',
            params: null, // url parameters
            body:'{"name":"hi ducky"}', // body parameter,json string or object
            response:'{"Code": 200,"Success": true,"Data": null,"Total": 0,"Message": "Request Success!"}'
        }
    },
    {
        id: 6,
        title: "CreateThread",
        open: false,
        pid: 2,
        document:{
            id:4,
            path:['Workflow2.0','Task','CreateThread'],
            method:'PUT',
            address:'http://oa.cnki.net/api/workflow2.0/{id}/CreateThread',
            headers:[
                {'accesstoken':'asdfafdsfsadfdsaf'},
            ],
            contentType:'form',
            params: null, // url parameters
            body:{
                name: 'hi ducky',
                userName:'ducky'
            }, // body parameter,json string or object
            response:'{"Code": 200,"Success": true,"Data": null,"Total": 0,"Message": "Request Success!"}'
        }
    },
    {
        id: 7,
        title: "HRManage",
        open: true,
        pid: 0
    },
    {
        id: 8,
        title: "AskForLeave",
        open: true,
        pid: 7,
    },
    {
        id: 9,
        title: "Add Request",
        open: false,
        pid: 8,
    },
    {
        id: 10,
        title: "AddAskForLeave",
        open: false,
        pid: 8,
    },
    {
        id: 11,
        title: "UpdateAskForLeave",
        open: false,
        pid: 8
    },
    {
        id: 12,
        title: "DeleteAskForLeave",
        open: false,
        pid: 8
    },
    {
        id: 13,
        title: "AddFiles",
        open: false,
        pid: 8,
    }, {
        id: 13,
        title: "AddTest",
        open: false,
        pid: 7
    },
    {
        id: 14,
        title: "Sale Manage",
        open: false,
        pid: 0,

    },
    {
        id: 15,
        title: 'AddSaleInfo',
        open: false,
        pid: 14
    }
]
