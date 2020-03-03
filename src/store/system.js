import {SPINNER, USER} from '../constants/spinner'

const state = {
    info: null,
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
    sidebar: false,
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
    },
    setRecipientInfo (state, data) {
        const { data: items } = data;
        state.info = _.first(items)
        console.log("Received the following extended profile data:", requestedProfileData);
    }
};

export default {
    namespaced: true,
    state,
    mutations
}
