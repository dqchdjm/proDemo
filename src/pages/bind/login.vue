<template>
  <div class="page">
    login
  </div>
</template>

<script>
import mixinBase from '@m/base'

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
    mounted () {
        console.log(this.pageData)
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style  lang="scss" scoped>

</style>
