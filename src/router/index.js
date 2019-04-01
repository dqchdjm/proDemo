import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
const routerInstance = new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            meta: {
                title: '首页'
            },
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
// router.beforeEach((to, from, next) => {
//     iView.LoadingBar.start();
//     if((!store.getters.userToken||!store.getters.userInfo)&&to.path!='/login'){
//       router.replace({
//         name: 'Login'
//       });
//       iView.LoadingBar.finish();
//       return;
//     }
//     document.title = (to.meta&&to.meta.title?(to.meta.title+'-'):'')+"资产评估系统";
//     next();
//   });
//   router.afterEach(route => {
//     iView.LoadingBar.finish();
//   });
export default routerInstance
