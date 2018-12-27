/**
 * Created by jianchun.dai on 2018/12/26.
 *
 */
import Vue from 'vue'

/**
 * 注册一个指令 来设置页面 标题
 */
Vue.directive('title', (el, binding) => {
    // 当绑定元素插入到 DOM 中。
    setTimeout(() => {
        document.title = binding.value || ''
    }, 100)
})
