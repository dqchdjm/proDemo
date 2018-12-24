class Result {
    /**
     * @param data
     * @param timeout
     * @returns {Promise<any>}
     */
    result (data, timeout = 200) {
        return data
    }
    /**
     * 成功返回
     * @param data
     * @param msg
     */
    success (data, msg = '成功') {
        return this.result({
            error_code: 0,
            msg,
            data
        }, 2000)
    }
    /**
     * 错误返回
     * @param msg
     * @param error_code
     * @returns {Promise<any>}
     */
    error (msg, error_code = 1001) {
        return this.result({
            error_code,
            msg,
            data: null
        }, 2000)
    }
}

export default new Result()
