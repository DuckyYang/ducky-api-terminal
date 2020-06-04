/*
 * @Author: Ducky
 * @Date: 2020-05-27 19:20:49
 * @LastEditTime: 2020-06-04 14:16:26
 * @LastEditors: Please set LastEditors
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/static/data/demo-logs.js
 * @
 */
export default [{
  id: 1,
  host: 1 + 'oa.cnki.net',
  route: 'api/workflow2.0/task/create',
  method: 'post',
  headers: 'accesstoken=xxx;',
  request: '{"name":"a test task","user":"ducky"}',
  response: '{"success":true,"content":"xxx","message":"request success!","total":0}',
  requestTime: '2020-06-01 13:00:00',
  application: 'workflow2.0',
  isError: false,
  error: '',
  duration: 60
}]