const actions = {
    async createReceiptAction ({ commit }, { payload, datastore }) {
        const response = await datastore.save(payload);
        commit('createReceipt', response);
    }
}

export default actions
