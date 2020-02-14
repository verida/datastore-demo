import Vue from 'vue'
import Vuex from 'vuex'

import receipt from  './receipt'
import schema from './schema'
import modal from './modal'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    receipt,
    schema,
    modal
  }
})
