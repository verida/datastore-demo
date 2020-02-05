import VeridaApp from 'verida-datastore';
import Vue from 'vue'
import Vuex from 'vuex'
import receipt from  './receipt'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    receipt,
    state: {
      datastore: null,
      veridaApp: null
    },
    mutations: {
      setDataStore(state, datastore) {
        state.datastore = datastore;
      }
    },
    actions: {
      async initDataStore({commit}) {
        let web3Provider = await VeridaApp.WalletHelper.connectWeb3('ethr');
        if (!web3Provider) {
          throw "Unable to locate valid web3 provider";
        }
        const address = await VeridaApp.WalletHelper.getAddress('ethr');
        const veridaApp = new VeridaApp("Verida Demo Application", 'ethr', address, web3Provider, {});
        const datastore = await veridaApp.openDatastore("receipt");
        commit('setDatastore', datastore);
      }
    },
  }
})
