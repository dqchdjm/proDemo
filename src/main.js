// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './utils/flex.js' // 高清解决方案
import Vue from 'vue'
import App from './App'
import router from './router'
import './mock'
import '@/assets/style/app.scss'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})
