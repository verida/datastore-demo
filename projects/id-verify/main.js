import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

import * as _ from 'underscore'
import '@src/mixins/plugins'

window._ = _

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import '@src/assets/scss/index.scss'