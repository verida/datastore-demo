import Vue from 'vue'

import App from './App.vue'
import router from '@src/router'
import store from '@src/store'

import * as _ from 'underscore'
import '@src/plugins'

window._ = _

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import '@src/assets/scss/index.scss'
