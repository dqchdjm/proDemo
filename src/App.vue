<template>
  <div id="app"  class="pages">
        <transition :name="transitionName">
          <navigation>
              <router-view/>
          </navigation>
        </transition>
  </div>
</template>

<script>

export default {
    name: 'App',
    data () {
        return {
            transitionName: 'left'
        }
    },
    created () {
        this.$navigation.on('forward', (to, from) => {
            this.transitionName = 'left'
            // console.log('forward to', to, 'from ', from)
        })

        this.$navigation.on('back', (to, from) => {
            this.transitionName = 'right'
            // console.log('back to', to, 'from ', from)
        })
    }
}
</script>
