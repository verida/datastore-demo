import Vue from 'vue'
import Vuex from 'vuex'

import schema from '@src/store/schema'
import system from '@src/store/system'
import patient from  './patient'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        patient,
        schema,
        system
    }
})
