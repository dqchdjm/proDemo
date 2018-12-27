/**
 * Created by jianchun.dai on 2018/12/26.
 *
 */

(function (doc, win) {
    win.globalVar.device = {
        // scale: scale,
        // dpr: dpr,
        // fontSize: fontSize,
        width: doc.documentElement.clientWidth,
        height: doc.documentElement.clientHeight,
        ...browserType()
    }
    console.log(win.globalVar.device)
})(document, window)

function browserType () {
    const userAgent = navigator.userAgent // 取得浏览器的userAgent字符串
    const isOpera = userAgent.indexOf('Opera') > -1 // 判断是否Opera浏览器
    const isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 && !isOpera // 判断是否IE浏览器
    const isIE11 = userAgent.indexOf('Trident') > -1 && userAgent.indexOf('rv:11.0') > -1
    const isEdge = userAgent.indexOf('Edge') > -1 && !isIE // 判断是否IE的Edge浏览器
    const isFF = userAgent.indexOf('Firefox') > -1 // 判断是否Firefox浏览器
    const isSafari = userAgent.indexOf('Safari') > -1 && userAgent.indexOf('Chrome') === -1 // 判断是否Safari浏览器
    const isChrome = userAgent.indexOf('Chrome') > -1 && userAgent.indexOf('Safari') > -1 // 判断Chrome浏览器
    const isUC = userAgent.indexOf('UCBrowser') > -1 // 判断UC浏览器
    const isMobile = !!userAgent.match(/AppleWebKit.*Mobile.*/) // || !!userAgent.match(/AppleWebKit/); // 是否为移动终端
    const isWeiXin = !!userAgent.match(/MicroMessenger/)
    const isQQ = isWeiXin ? false : !!userAgent.match(/MQQBrowser/)

    const res = {
        isWeiXin,
        isMobile,
        isQQ,
        browser: ''
    }
    // alert(userAgent);
    // console.log(isMobile, isWeiXin, userAgent);
    // alert(isMobile + ' -- ' + isWeiXin + ' -- ' + userAgent);
    if (isIE) {
        const reIE = new RegExp('MSIE (\\d+\\.\\d+);')
        reIE.test(userAgent)
        const fIEVersion = +parseFloat(RegExp['$1'])
        if (fIEVersion === 7) return 'IE7'
        else if (fIEVersion === 8) return 'IE8'
        else if (fIEVersion === 9) return 'IE9'
        else if (fIEVersion === 10) return 'IE10'
        else return 'IE7以下'// IE版本过低
    }
    if (isIE11) res.browser = 'IE11'
    if (isEdge) res.browser = 'Edge'
    if (isFF) res.browser = 'FF'
    if (isOpera) res.browser = 'Opera'
    if (isSafari) res.browser = 'Safari'
    if (isChrome) res.browser = 'Chrome'
    if (isUC) res.browser = 'UCBrowser'
    if (isWeiXin) res.browser = 'WeiXin'
    return res
}
