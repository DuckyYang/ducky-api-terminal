/*
 * @Author: your name
 * @Date: 2020-06-04 13:13:54
 * @LastEditTime: 2020-06-04 22:09:22
 * @LastEditors: Ducky
 * @Description: In User Settings Edit
 * @FilePath: /ducky-api-terminal/src/mock/index.js
 */

import Mock from 'mockjs'
import utils from '../plugin/utils'

let configArray = [];

// 
const files = require.context('../api', true, /\.js$/);
files.keys().forEach((key) => {
  configArray = configArray.concat(files(key).default);
});

// registe all mock method
configArray.forEach((item) => {
  for (const [, target] of Object.entries(item)) {
    if (target.type === 'get') {
      target.type = 'post'
    }
    Mock.mock(target.url, target.type, (options) => {
      let param = {}
      // if mock method need some params
      if (target.mock.params && target.mock.params.length > 0) {
        const p = utils.parse(options.body)
        target.mock.params.forEach(key => {
          param[key] = p[key]
        })
      }
      // return default data
      return {
        Success:true,
        Message:'request successful',
        Content:target.mock.data(param),
        Total: 100,
        Count:0
      }
    })
  }
});