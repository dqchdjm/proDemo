<template>
  <div id="app" class="ignore">
    <p>{{ctitle}}</p>
    <div>
      <img v-for="(item, index) in list" :key="index" :src="item">
      <i class="icon f-icon"></i>
    </div>
    <router-view/>
  </div>
</template>

<script>
import Home from '@a/home'
import ut from '@u/comm'
export default {
    name: 'App',
    data () {
        return {
            list: [],
            ctitle: ''
        }
    },
    mounted () {
        console.log(this.$route)
        console.log(ut)
        // ut.alert()
        // Home.home().then((d) => {
        //     console.log(d)
        // })
        Home.users().then(({ data }) => {
            console.log(data)
            this.ctitle = data.data.ctitle
            this.list = data.data.img
        })
        Home.login().then(({ data }) => {
            console.log(data)
        })
    }
}
</script>

<style lang="scss">
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
/* 在不想要把px转换为vw的时候，首先在对应的元素（html）中添加配置中指定的类名.ignore或.hairlines(.hairlines一般用于设置border-width:0.5px的元素中)： */

.ignore {
  border: 2px solid rgb(106, 153, 85);

}
.icon {
  &:before {
    content: '\e611';

  }
}
</style>
