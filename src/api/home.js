import Http from './base/http'

class Home extends Http {
    constructor () {
        super()
        this.url = '/api/livebroadcast'
    }
    home () {
        return super.get('/api/RedEnvelope/index', {id: 10})
    }
    users () {
        return super.get('/users')
    }
    login () {
        return super.post('/login')
    }
}

export default new Home()
