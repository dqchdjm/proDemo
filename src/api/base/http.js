import Axios from 'axios'
// import Config from './config'
import Vue from 'vue'

class Http {
    constructor () {
        this.axios = Axios
        // this.axios = Axios.create(Config)  /* 正式调用接口时打开 */
        this.createGlobalInterceptor()
        this.cancel = null
        this.promiseArr = {}
    }

    /**
     * 创建全局拦截器
     */
    createGlobalInterceptor () {
        // 请求拦截
        this.addRequestInterceptor((params) => {
            if (this.promiseArr[params.url] && params._C) {
                this.promiseArr[params.url]({
                    msg: '因重复而取消',
                    url: params.url
                })
                this.promiseArr[params.url] = this.cancel
            } else {
                this.promiseArr[params.url] = this.cancel
            }
            return params
        }, (_error) => {

        })
        // 响应拦截
        this.addResponseInterceptor((json) => {
            const result = json.data
            // 接口错误提示信息全局统一拦截提示
            if (+result.error_code !== 0) {
                if (!json.config._E) {
                    return Promise.resolve(json)
                }
                Vue.prototype.$messageBox.alert(result.error_msg, '温馨提示')
                return Promise.reject(json)
            } else {
                return Promise.resolve(json)
            }
        }, (_error) => {
            const status = typeof _error.response === 'object' && _error.response.status
            switch (status) {
                case 401:
                    console.error('请登录系统!')
                    // const Store = require('@/store').default;
                    // Store.commit('REMOVE_USERINFO');
                    /* Vue.prototype.$alert('登录超时!', {
                        confirmButtonText: '确定',
                        callback: action => {
                            Router.push('/login');
                        },
                    }); */
                    break
                case 403:
                    // Vue.prototype.$message.error('无权限访问系统模块！');
                    break
                case 404:
                    console.error('不存在的接口!')
                    // Vue.prototype.$message.error('无权限访问系统模块！');
                    break
                case 500:
                    console.error(_error.response.data)
                    // TODO:需要提供好的界面展现  Router.push('/500')
                    break
                default:
                    break
            }
        })
    }
    /**
     * 添加请求拦截器
     * @param fn
     * @param error
     * @returns {number}
     */
    addRequestInterceptor (fn, error = () => {
    }) {
        return this.axios.interceptors.request.use(fn, (_error) => {
            error(_error)
            this.feedbackError(_error)
            return Promise.reject(_error)
        })
    }
    /**
     * 添加响应拦截器
     * @param fn
     * @param error
     * @returns {number}
     */
    addResponseInterceptor (fn, error = () => {
    }) {
        return this.axios.interceptors.response.use(fn, (_error) => {
            error(_error)
            this.feedbackError(_error)
            return Promise.reject(_error)
        })
    }

    /**
     * 错误反馈
     */
    feedbackError (_error) {
        // TODO 取不到请求 then 方法里的错误
        console.log('没有收集错误的接口！', _error)
    }

    /**
     * 创建取消令牌
     */
    createCancelToken () {
        const cancelToken = this.axios.CancelToken
        return cancelToken.source()
    }
    /**
     * get 请求
     * @param url
     * @param params
     * @returns {AxiosPromise}
     */
    get (url, params = {}, cfg = {}) {
        cfg = {
            ...cfg,
            _C: !params._C,
            _E: !params._E
        }
        delete params._C
        delete params._E
        params = {
            ...params,
            // user_id: Store.getters['user/userId'],
            channel_type: 'wap',
            _T: new Date().getTime()
        }
        return this.axios.get(url, {
            ...cfg,
            cancelToken: new Axios.CancelToken((cancel) => {
                this.cancel = cancel
            }),
            params
        })
    }

    /**
     * post 请求
     * @param url
     * @param params
     * @param cfg
     * @returns {AxiosPromise}
     */
    post (url, params = {}, cfg = {}) {
        cfg = {
            ...cfg,
            _C: !params._C,
            _E: !params._E, // 是否自动处理错误提示，params._E为true不处理，false自处理
            cancelToken: new Axios.CancelToken((cancel) => {
                this.cancel = cancel
            })
        }
        params.channel_type = 'wap'
        // params.user_id = Store.getters['user/userId']
        delete params._C
        delete params._E
        return this.axios.post(url, params, cfg)
    }
    /**
    * 自定义post 请求
    * @param url
    * @param params
    * @param cfg
    * @returns {AxiosPromise}
    */
    custom (url, params = {}, cfg = {}) {
        cfg = {
            ...cfg,
            _C: !params._C,
            _E: !params._E, // 是否自动处理错误提示，params._E为true不处理，false自处理
            cancelToken: new Axios.CancelToken((cancel) => {
                this.cancel = cancel
            })
        }
        params.channel_type = 'wap'
        delete params._C
        delete params._E
        return this.axios.post(url, params, cfg)
    }
}
export default Http
