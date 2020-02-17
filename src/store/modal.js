const state = {
    category: null,
    internalSubmit: () => {}
};

const mutations = {
    init (state, payload) {
        Object.assign(state, payload)
    }
};

export default {
    namespaced: true,
    state,
    mutations
}
