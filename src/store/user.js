import {Session, Local} from './storage'
export default {
    namespaced: true,
    state: {
        sessionId: Session.get('sessionId') || '',
        sessionName: Session.get('sessionName') || '',
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
        },
        setSessionName (state, id) {
            state.sessionName = id
            Session.set('sessionName', id)
        },
        removeSessionName (state) {
            state.sessionId = ''
            Session.remove('sessionName')
        },
    },
    getters: {
        userId (state) {
            return state.userInfo.id
        }
    }
}
