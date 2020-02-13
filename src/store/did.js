import { getSignature, getRecipientDid } from '@src/helpers/LocalStorage'

const state = {
    authorized: null,
    signature: getSignature(),
    recipient: getRecipientDid()
}

const mutations = {
    setAuthorized (state, payload) {
        state.authorized = payload
    },
    setRecipient (state, payload) {
        state.recipient = payload
    }
}

export default {
    namespaced: true,
    state,
    mutations
}