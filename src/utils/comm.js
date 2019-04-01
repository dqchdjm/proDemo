
class Utils {
    alert () {
        console.log(1)
    }
    /**
     * 获取剩余时间
     * @param isDay  是否天数转换成小时  ture=》是
     * @param startTime
     * @param endTime
     * @returns {{d: number, h: number, m: number, s: number}}
     */
    getRemainTime (startTime, endTime, isDay) {
        startTime = new Date(startTime).getTime()
        endTime = new Date(endTime).getTime()
        if (endTime.toString().length === 10) {
            endTime *= 1000
        }

        const t = endTime - startTime
        const r = { d: 0, h: 0, m: 0, s: 0 }

        if (t > 0) {
            r.d = Math.floor(t / 1000 / 3600 / 24)
            r.h = Math.floor(t / 1000 / 60 / 60 % 24)
            r.m = Math.floor(t / 1000 / 60 % 60)
            r.s = Math.floor(t / 1000 % 60)
        }
        if (isDay) {
            if (r.d > 0) {
                r.h += r.d * 24
                r.h = r.h > 99 ? 99 : r.h
            }
        }
        for (const k in r) {
            if (r.hasOwnProperty(k)) {
                r[k] = r[k] < 10 ? `0${r[k]}` : `${r[k]}`
            }
        }
        return r
    }

    /**
     * 格式化时间
     * @param time
     * @returns {{d: number, h: number, m: number, s: number}}
     */
    fixedTime (time) {
        const t = +time
        if (isNaN(time)) return {}
        const r = { d: 0, h: 0, m: 0, s: 0 }
        if (t > 0) {
            r.d = Math.floor(t / 1000 / 3600 / 24)
            r.h = Math.floor(t / 1000 / 60 / 60 % 24)
            r.m = Math.floor(t / 1000 / 60 % 60)
            r.s = Math.floor(t / 1000 % 60)
        }
        for (const k in r) {
            if (r.hasOwnProperty(k)) {
                r[k] = r[k] < 10 ? `0${r[k]}` : `${r[k]}`
            }
        }
        return r
    }
    /**
     * 是否对象属性
     * @param obj
     * @param key
     * @returns {boolean | *}
     */
    hasOwn (obj, key) {
        return this.hasOwnProperty.call(obj, key)
    }
    /**
     * 是否空对象
     * @param obj
     * @returns {boolean | *}
     */
    hasEemptyObject (obj) {
        return JSON.stringify(obj) == '{}'
    }
    /**
     * 是否 VNode
     * @param node
     * @returns {boolean|boolean|*}
     */
    isVNode (node) {
        return node !== null && typeof node === 'object' && this.hasOwn(node, 'componentOptions')
    }
    /**
     * 获取页面中的 popup-wrap
     * @returns {Element}
     */
    getPopupWrap (page) {
        let r = Array.prototype.indexOf.call(page.$el.classList, 'page')
        let r2 = Array.prototype.indexOf.call(page.$el.classList, 'pages')
        while (r === -1 && r2 === -1) {
            page = page.$parent
            r = Array.prototype.indexOf.call(page.$el.classList, 'page')
            r2 = Array.prototype.indexOf.call(page.$el.classList, 'pages')
        }
        page = page.$el
        let popupWrap = page.querySelector('.popup-wrap')
        if (!popupWrap) {
            popupWrap = document.createElement('div')
            popupWrap.classList.add('popup-wrap')
            page.appendChild(popupWrap)
        }
        return popupWrap
    }
    esetCoolie(key,value,cb){
        storage.setItem(('cok_'+key),value);
        Cookies.set(key,value, { expires: 1 });
        if(cb){
          cb();
        }
    }
    getCoolie(key){
        let value = Cookies.get(key);
        if(!value){
          value = storage.getItem('cok_'+key);
        }
        return value;
    }
}

export default new Utils()
