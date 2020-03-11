const state = {
    patient: {
        did: null,
        info: null
    },
    cards: null
};

const getters = {
    identified: (state) => state.cards !== null
}

const mutations = {
    setPatientDid (state, payload) {
        state.patient.did = payload
    },
    setPatientInfo (state, payload) {
        state.patient.info = payload
    },
    setPatientCards (state, payload) {
        state.cards = payload
    },
    resetPatient (state) {
        state.cards = null
        state.patient = {
            did: null,
            info: null
        }
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    getters
}
