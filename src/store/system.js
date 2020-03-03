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
    },
    sidebar: true,
    mobile: false
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
            [USER.NAME]: payload[USER.NAME] || '<unknown>'
        }
    },
    setSpinner (state, payload) {
        state.spinner = Object.assign(state.spinner, payload)
    },
    setSidebar (state, payload) {
        state.sidebar = payload || !state.sidebar
    },
    setMobile (state, payload) {
        state.mobile = payload
    }
};

export default {
    namespaced: true,
    state,
    mutations
}
