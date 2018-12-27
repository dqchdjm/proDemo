// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import './utils/flex.js' // 高清解决方案
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import './mock'
import '@/assets/style/app.scss'
import components from './components' // 注册全局组件
import './custom' // 一些 vue 自定的杂项

Vue.config.productionTip = false

Vue.use(components)
/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})
