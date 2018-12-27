/**
 * Created by jianchun.dai on 2018/12/26.
 * 常用验证规则
 */

const emailReg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
const mobileReg = /(^((166|198|199)|(15[^4])|(14[5-9])|17[0-3]|(17[5-8])|((13|18)[0-9]))\d{8}$)|(^(1749)\d{7}$)/

class Valid {
    /**
     * 确认密码验证
     * @param rule
     * @param value
     * @param callback
     * @param source
     * @param options
     */
    againPassword (rule, value, callback, source, options) {
        if (value !== this.formData.password) {
            callback(new Error(rule.message))
        } else {
            callback()
        }
    }

    /**
     * 手机验证
     * @param rule
     * @param value
     * @param callback
     * @param source
     * @param options
     */
    mobile (rule, value, callback, source, options) {
        if (!mobileReg.test(value)) {
            callback(new Error(rule.message))
        } else {
            callback()
        }
    }

    /**
     * 邮箱验证
     * @param rule
     * @param value
     * @param callback
     * @param source
     * @param options
     */
    email (rule, value, callback, source, options) {
        if (!emailReg.test(value)) {
            callback(new Error(rule.message))
        } else {
            callback()
        }
    }

    /**
     * 账号验证
     * @param rule
     * @param value
     * @param callback
     */
    account (rule, value, callback) {
        if (!emailReg.test(value) && !mobileReg.test(value)) {
            callback(new Error(rule.message))
        } else {
            callback()
        }
    }
}

export default new Valid()
