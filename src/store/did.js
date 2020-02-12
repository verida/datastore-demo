import { setRecipient } from '@src/helpers/VeridaTransmitter'

const { VUE_APP_DATASTORE_NAME } = process.env
const sessionKey = `VERIDA_SESSION_${VUE_APP_DATASTORE_NAME}`

const getAuthorizedDid = () => {
    const key = `${sessionKey}did`
    return localStorage.getItem(key)
}

const getRecipientDid = () => {
    const key = `${sessionKey}recipient-did`
    return localStorage.getItem(key)
}

const state = {
    authorized: window.ethereum.selectedAddress,
    recipient: null
}

const getters = {
    authorized (state) {
        if (!state.authorized) {
            state.authorized = getAuthorizedDid()
        }
        return state.authorized
    },
    recipient (state) {
        if (!state.recipient) {
            state.recipient = getRecipientDid()
        }
        return state.recipient
    },
    permitted (state, getters) {
        const { authorized, recipient } = getters
        return authorized && recipient
    }
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
    getters,
    mutations
}