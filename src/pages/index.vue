<template>
  <div v-title="pageData.title" class="page left-enter-active">
    <p>{{ctitle}}</p>
    <div>
      <img v-for="(item, index) in list" :key="index" :src="item">
      <i class="icon f-icon"></i>
      <i class="icon1 f-icon"></i>
    </div>
    <div class="hello">
      <h1>{{ msg }}</h1>
    <linker :to="`/login`" >
      <h2>Essential Links</h2>
    </linker>
      <initLodding />
      <!-- <img src="~@/assets/logo.png" alt=""> -->
    </div>
  </div>
</template>

<script>
import Home from '@a/home'
import ut from '@u/comm'
import mixinBase from '@m/base'
import {mapMutations, mapState} from 'vuex'

export default {
    name: 'index',
    mixins: [mixinBase],
    data () {
        return {
            list: [],
            ctitle: '',
            msg: 'ssssssssssssss'
        }
    },
    computed: {
        ...mapState('user', ['sessionId'])
    },
    methods: {
        ...mapMutations('user', ['setSessionId'])

    },
    created () {
        console.log(this.pageData)
    },
    mounted () {
        console.log(this.$route)
        console.log(ut)
        this.setSessionId(1)

        // this.$utils.comm.alert()
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>
.hello {
  background: url("~@/assets/logo.png");
  h1,
  h2 {
    font-weight: normal;
    font-size: 32px;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
}
.icon {
  &:before {
    content: '\e611';

  }
}
.icon1 {
  &:before {
    content: '\eabe';

  }
}
</style>
