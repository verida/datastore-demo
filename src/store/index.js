import Vue from 'vue'
import Vuex from 'vuex'

import receipt from  './receipt'
import schema from './schema'
import system from './system'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    receipt,
    schema,
    system
  }
})
