/*
 * @Author: Ducky
 * @Date: 2020-06-26 18:58:49
 * @LastEditTime: 2020-06-27 14:07:56
 * @LastEditors: Ducky
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/components/index.js
 * @
 */ 

const UI ={
    install(Vue){
        /** Layout  */
        Vue.component('ducky-layout',()=>import('./layout/Layout'))
        Vue.component('ducky-table-layout',()=>import('./layout/TableLayout'))
        Vue.component('ducky-card-layout',()=>import('./layout/CardLayout'))
        /** Card */
        Vue.component('ducky-card-row',()=>import('./card/CardRow'))
        Vue.component('ducky-card',()=>import('./card/Card'))

        /** simple tree */
        Vue.component('ducky-simple-tree',()=>import('./simple-tree/SimpleTree'))
        /** tree */
        Vue.component('ducky-tree',()=>import('./layout/CardLayout'))
        /** json editor */
        Vue.component('ducky-json-editor',()=>import('./json-editor/JsonEditor'))
        /** navigator */
        Vue.component('ducky-left-navigator',()=>import('./navigator/Navigation'))
        Vue.component('ducky-top-navigator',()=>import('./navigator/Top'))
        Vue.component('ducky-tab-navigator',()=>import('./navigator/Tabs'))
    }
}

export default UI