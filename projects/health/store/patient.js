const state = {
    did: null,
    cards: null
};

const getters = {
    identified: (state) => state.cards !== null
}

const mutations = {
    setPatientDid (state, payload) {
        state.did = payload
    },
    setPatientCards (state, payload) {
        state.cards = payload
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    getters
}
