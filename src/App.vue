<!--
 * @Author: Ducky
 * @Date: 2020-05-22 22:14:00
 * @LastEditTime: 2020-05-27 21:17:44
 * @LastEditors: Ducky
 * @Description: 
 * @FilePath: /ducky-api-terminal/src/App.vue
 * @
--> 
<template>
  <div id="app">
    <router-view/>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
export default {
   methods: {
    ...mapMutations(['changeScreenHeight'])
  },
  mounted () {
    window.onresize = () => {
      this.changeScreenHeight(document.documentElement.clientHeight)
    }
  }
}
</script>
<style lang="scss">

</style>
