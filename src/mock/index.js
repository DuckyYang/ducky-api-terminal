/*
 * @Author: your name
 * @Date: 2020-06-04 13:13:54
 * @LastEditTime: 2020-06-04 16:53:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ducky-api-terminal\src\mock\index.js
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
  for (const [,target] of Object.entries(item)) {
   
    Mock.mock(new RegExp('^' + target.url+'.*'),target.type,(options)=>{
      let param = {}

      if (target.type.toLowerCase() === 'get') {
        // if mock method need some params
        if (target.mock.params && target.mock.params.length > 0) {
          const p = utils.getParams(options.url)
          target.mock.params.forEach(key=>{
            param[key] = p[key]
          })
        }
      }
      // return default data
      return {
        data:target.mock.data(param),
        total:100,
        message:'success'
      }
    })
  }
});