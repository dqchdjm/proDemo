import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const routerInstance = new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: (resolve) => require(['@p/index.vue'], resolve)
        },
        {
            path: '/login',
            name: 'login',
            meta: {
                title: '登录'
            },
            component: (resolve) => require(['@p/bind/login.vue'], resolve)
        }
    ]
})
routerInstance.beforeEach((to, from, next) => {
    next()
})
routerInstance.afterEach((to, from) => {
})
export default routerInstance
