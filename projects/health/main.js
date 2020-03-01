import Vue from 'vue'

import App from './App'
import router from '@/router'
import store from '@src/store'

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

import '@src/assets/scss/index.scss'
import '@/assets/scss/styles.scss'
