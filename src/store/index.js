/**
 * Created by jianchun.dai on 2018/12/27.
 *
 */

import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        // global
        user
    }
})
