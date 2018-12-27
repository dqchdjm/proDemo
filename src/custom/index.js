/**
 * Created by henian.xu on 2017/10/24.
 *
 */

import Vue from 'vue'
import './directive' // 自定义指令
import * as Utils from '@u'
import * as Api from '@a'

Vue.prototype.$api = Api
Vue.prototype.$http = Api.Http
Vue.prototype.$utils = Utils
Vue.prototype.$bus = new Vue()
