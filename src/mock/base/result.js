class Result {
    /**
     * @param error_code
     * @param data
     * @param timeout
     * @returns {Promise<any>}
     */
    result (error_code, data, timeout = 200) {
        return data
    }
    /**
     * 成功返回
     * @param data
     * @param msg
     */
    success (data, msg = '成功') {
        return this.result(200, {
            success: true,
            error_code: 0,
            msg,
            data
        })
    }
    /**
     * 错误返回
     * @param msg
     * @param error_code
     * @returns {Promise<any>}
     */
    error (msg, error_code = 1001) {
        return this.result(200, {
            success: true,
            error_code,
            msg,
            data: null
        }, 2000)
    }
}

export default new Result()
