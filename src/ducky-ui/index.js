/*
 * @Author: your name
 * @Date: 2020-05-27 13:15:22
 * @LastEditTime: 2020-06-09 15:06:39
 * @LastEditors: Ducky Yang
 * @Description: In User Settings Edit
 * @FilePath: /ducky-api-terminal/src/ducky-ui/index.js
 */ 
import Layout from './components/layout/Layout'
import TableLayout from './components/layout/TableLayout'
import CardLayout from './components/layout/CardLayout'

import CardRow from './components/card/CardRow'
import Card from './components/card/Card'
import SimpleTree from './components/simpletree/SimpleTree'

import JsonEditor from './components/json-editor/JsonEditor'

import Tree from './components/tree/Tree'

const UI ={
    install(Vue){
        Vue.component('ducky-layout',Layout)
        Vue.component('ducky-table-layout',TableLayout)
        Vue.component('ducky-card-layout',CardLayout)

        Vue.component('ducky-card-row',CardRow)
        Vue.component('ducky-card',Card)
        Vue.component('ducky-simple-tree',SimpleTree)

        Vue.component('ducky-json-editor',JsonEditor)
        Vue.component('ducky-tree',Tree)
    }
}

export default UI