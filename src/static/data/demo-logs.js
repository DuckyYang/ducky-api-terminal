/*
 * @Author: Ducky
 * @Date: 2020-05-27 19:20:49
 * @LastEditTime: 2020-06-03 22:22:18
 * @LastEditors: Ducky
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/static/data/demo-logs.js
 * @
 */
const data = function () {
  let result = []
  for (let index = 0; index < 30; index++) {
    result.push({
      id: index,
      host: index + 'oa.cnki.net',
      route: 'api/workflow2.0/task/create',
      method: 'post',
      headers: 'accesstoken=xxx;',
      request: '{"name":"a test task","user":"ducky"}',
      response: '{"success":true,"content":"xxx","message":"request success!","total":0}',
      requestTime: '2020-06-01 13:00:00',
      application: 'workflow2.0',
      isError: false,
      error: '',
      duration: index % 2 + index / 2
    })

  }
  return result
}
export default data