<template>
  <div v-title="pageData.title" class="page ">
    login
  </div>
</template>

<script>
import mixinBase from '@m/base'
import {mapMutations, mapState} from 'vuex'
// import {mapGetters, mapMutations, mapState} from 'vuex'

export default {
    name: 'login',
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
    mounted () {
        console.log(this.pageData)

        console.log(this)
        console.log(this.sessionId)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>

</style>
