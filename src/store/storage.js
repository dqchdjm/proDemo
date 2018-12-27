/**
 * Created by jianchun.dai on 2018/12/27.
 * storage
 */

class Storage {
    constructor (type = 'local', prefix = '') {
        this.store = type === 'local' ? window.localStorage : window.sessionStorage
        this.prefix = prefix
    }

    set (key, value, fn) {
        try {
            value = JSON.stringify(value)
        } catch (e) {
        }

        this.store.setItem(this.prefix + key, value)

        fn && fn()
    }

    get (key, fn) {
        if (!key) {
            throw new Error('没有找到key。')
        }
        if (typeof key === 'object') {
            throw new Error('key不能是一个对象。')
        }
        let value = this.store.getItem(this.prefix + key)
        if (value !== null) {
            try {
                value = JSON.parse(value)
            } catch (e) {
            }
        }

        return value
    }

    remove (key) {
        this.store.removeItem(this.prefix + key)
    }
}

const Local = new Storage()
const Session = new Storage('session')
export {Local, Session}
