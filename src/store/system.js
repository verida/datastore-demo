const state = {
    category: null,
    internalSubmit: () => {},
    buttons: []
};

const mutations = {
    init (state, payload) {
        Object.assign(state, payload)
    },
    setActions (state, payload) {
        state.buttons = payload
    }
};

export default {
    namespaced: true,
    state,
    mutations
}
