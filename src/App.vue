<template>
  <div id="app" class="ignore">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
import ut from '@u/index'
export default {
    name: 'App',
    data () {
        return {}
    },
    mounted () {
        ut.alert()
        let i = 0
        console.log(i)
    }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
/* 在不想要把px转换为vw的时候，首先在对应的元素（html）中添加配置中指定的类名.ignore或.hairlines(.hairlines一般用于设置border-width:0.5px的元素中)： */

.ignore {
  border: 2px solid #000;
}
</style>
