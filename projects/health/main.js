import Vue from 'vue'

import App from './App'
import router from '@/router'
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
import '@/assets/scss/styles.scss'
