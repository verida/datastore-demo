import Vue from 'vue'

import App from './App'
import router from '@/router'
import store from '@/store'

import '@src/plugins'

import _ from 'underscore'
import moment from 'moment'

window._ = _
window.moment = moment

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import '@/assets/scss/index.scss'
