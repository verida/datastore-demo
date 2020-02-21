import {SPINNER, USER} from '../constants/spinner'

const state = {
    category: null,
    internalSubmit: () => {},
    buttons: [],
    user: {
        [USER.ADDRESS]: null,
        [USER.NAME]: null
    },
    spinner: {
        [SPINNER.DATA]: true,
        [SPINNER.NAVIGATION]: true
    }
};

const mutations = {
    init (state, payload) {
        Object.assign(state, payload)
    },
    setActions (state, payload) {
        state.buttons = payload
    },
    initUser (state, payload) {
        state.user = {
            [USER.ADDRESS]: payload[USER.ADDRESS],
            [USER.NAME]: payload[USER.NAME] || 'Name Surname'
        }
    },
    setSpinner (state, payload) {
        state.spinner = Object.assign(state.spinner, payload)
    }
};

export default {
    namespaced: true,
    state,
    mutations
}
