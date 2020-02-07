export const DID = 'did'
export const CUSTOMER_DID = 'customer'

const state = {
    [DID]: null,
    [CUSTOMER_DID]: null,
}

const mutations = {
    setDid: (state, data) => state[data.user] = data.did
}

export default {
    namespaced: true,
    state,
    mutations
}
