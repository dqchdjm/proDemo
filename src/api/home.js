import Http from './base/http'

class Home extends Http {
    constructor () {
        super()
        this.url = '/api'
    }
    home (params) {
        return super.get(`${this.url}/getData`,params)
    }
    postHome (params) {
        return super.post(`${this.url}/postData`,params)
    }
}

export default new Home()
