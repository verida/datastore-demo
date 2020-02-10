import Vue from 'vue'

import App from './App.vue'
import router from './router'
import store from './store'

import * as _ from 'underscore'
import '../../plugins'

window._ = _

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import '@/assets/scss/index.scss'
