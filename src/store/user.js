import {Session, Local} from './storage'
export default {
    namespaced: true,
    state: {
        sessionId: Session.get('sessionId') || '',
        userName: Local.get('userName') || 'djc'

    },
    mutations: {
        setSessionId (state, id) {
            state.sessionId = id
            Session.set('sessionId', id)
        },
        removeSessionId (state) {
            state.sessionId = ''
            Session.remove('sessionId')
        }

    },
    getters: {
        userId (state) {
            return state.userInfo.id
        }
    }
}
