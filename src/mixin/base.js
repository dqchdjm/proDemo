/**
 * Created by jianchun.dai on 2018/12/26.
 *
 */
import {mapGetters, mapMutations} from 'vuex'
import Home from "@a/home";

export default {
    data () {
        return {

        }
    },
    computed: {// 计算属性
        ...mapGetters('user', ['sessionId']),  
        pageData () {
            return {
                title: this.$route.meta.title 
            }
        }
    },
    watch: {// 观察属性

    },
    methods: {// 方法
        ...mapMutations('user', ['setSessionId','setSessionName'])

    },
    // 路由守卫
    beforeRouteEnter (to, from, next) {
        // 在渲染该组件的对应路由被 confirm 前调用
        // 不！能！获取组件实例 `this`
        // 因为当守卫执行前，组件实例还没被创建
        next((vm) => {
        })
    },
    beforeRouteUpdate (to, from, next) {
        // 在当前路由改变，但是该组件被复用时调用
        // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
        // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
        // 可以访问组件实例 `this`
        next()
    },
    beforeRouteLeave (to, from, next) {
        // 导航离开该组件的对应路由时调用
        // 可以访问组件实例 `this`
        next()
    },
    // 生命周期
    beforeCreate () {
        console.log('beforeCreate 创建前状态===============》')
    },
    created () {
        console.log(this.sessionId)
    },
    beforeMount () {
    },
    mounted () {
        Home.home({ id: "4"}).then(d => {
            console.log(d);
            this.setSessionName(d.data.title)
          });
    },
    beforeUpdate () {
    },
    updated () {
    },
    activated () {
    },
    beforeDestroy () {
    },
    destroyed () {
    },
    errorCaptured (h, err) {
        console.log(h, err)
    }
}
