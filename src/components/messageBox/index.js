/**
 * Created by henian.xu on 2018/2/2.
 * 弹出框组件
 */

import Vue from 'vue'
import main from './main'
import {comm} from '@u'

const MainConstructor = Vue.extend(main)
let instance, currentMsg
const msgQueue = []
const defaults = {
    show: false,
    showCancelBtn: false,
    cancelBtnText: '取消',
    showConfirmBtn: true,
    confirmBtnText: '确认',

    showInput: false,
    inputValue: '',

    closeTime: 2000,
    closeTimer: 0,

    delayConfirm: 0,
    delayConfirmTimer: 0,

    action: '',
    showCloseBtn: false
    // callback: null,
}

function getPage () {
    let page = document.querySelector('#app>[class*="-enter-active"].page')
    page = page || document.querySelector('#app>.page')
    return page
}

function getPopupWrap (page) {
    if (!page) {
        page = getPage()
    }
    const popup = document.createElement('div')
    popup.classList.add('popup-wrap')
    page.appendChild(popup)
    return popup
}

function getMountNode () {
    const node = document.createElement('div')
    const page = getPage()
    let popup = page.querySelector('.popup-wrap')
    if (!popup) {
        popup = getPopupWrap(page)
    }
    popup.appendChild(node)
    return node
}

const defaultCallback = (action) => {
    if (!currentMsg) return
    const cbFn = currentMsg.callback
    if (typeof cbFn === 'function') {
        if (instance.showInput) {
            cbFn(instance.inputValue, action)
        } else {
            cbFn(action)
        }
    }
    const resolve = currentMsg.resolve
    const reject = currentMsg.reject
    if (resolve) {
        if (action === 'confirm') {
            if (instance.showInput) {
                resolve(instance.inputValue, action)
            } else {
                resolve(action)
            }
        } else if ((action === 'cancel' || action === 'close') && reject) {
            reject(action)
        }
    }
}

function initInstance () {
    const instance = new MainConstructor({})
    return instance
}

function showNextMsg () {
    if (!instance) {
        instance = initInstance()
    }
    instance.action = ''
    const isInBody = instance.$el && document.body.compareDocumentPosition(instance.$el) !== 20
    if ((instance.show && !isInBody) || !msgQueue.length) return
    currentMsg = msgQueue.shift()
    const options = currentMsg.options
    for (const key in options) {
        if (options.hasOwnProperty(key)) {
            instance[key] = options[key]
        }
    }

    // 如果没有 callback 选用 Promise
    if (options.callback === undefined) {
        instance.callback = defaultCallback
    }
    const oldCbFn = instance.callback
    instance.callback = (action, instance) => {
        oldCbFn(action, instance)
        showNextMsg()
    }

    if (comm.isVNode(instance.message)) {
        instance.$slots.default = [instance.message]
        instance.message = null
    } else {
        delete instance.$slots.default
    }

    if (!instance.$el) {
        instance.$mount(getMountNode())
    } else if (isInBody) {
        getPopupWrap().appendChild(instance.$el)
    }
    // console.log(document.body.compareDocumentPosition(instance.$el));
    instance.show = true
}

function MessageBox (options, cbFn) {
    if (Vue.prototype.$isServer) return
    if (options.callback && !cbFn) {
        cbFn = options.callback
    }
    if (typeof Promise !== 'undefined') {
        return new Promise((resolve, reject) => {
            msgQueue.push({
                options: {
                    ...defaults,
                    ...MessageBox.defaults,
                    ...options
                },
                callback: cbFn,
                resolve,
                reject
            })
            showNextMsg()
        })
    } else {
        msgQueue.push({
            options: {
                ...defaults,
                ...MessageBox.defaults,
                ...options
            },
            callback: cbFn
        })
        showNextMsg()
    }
}

MessageBox.noTag = true
MessageBox.names = 'messageBox'
MessageBox.defaults = {}

MessageBox.setDefaults = (defaults) => {
    MessageBox.defaults = defaults
}

MessageBox.alert = (message, title = '', options) => {
    if (typeof title === 'object') {
        options = title
        title = ''
    }
    return MessageBox({
        title,
        message,
        $type: 'alert',
        ...options
    })
}
MessageBox.confirm = (message, title = '', options) => {
    if (typeof title === 'object') {
        options = title
        title = ''
    }
    return MessageBox({
        title,
        message,
        $type: 'confirm',
        showCancelBtn: true,
        ...options
    })
}
MessageBox.prompt = (message, title = '', options) => {
    if (typeof title === 'object') {
        options = title
        title = ''
    }
    return MessageBox({
        title,
        message,
        $type: 'prompt',
        showCancelBtn: true,
        showInput: true,
        ...options
    })
}
MessageBox.tips = (message, options) => {
    return MessageBox({
        message,
        $type: 'tips',
        ...options
    })
}

export default MessageBox
export {MessageBox}
