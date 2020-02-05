import Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate/dist/vee-validate.full.esm'

import App from './App.vue'
import router from './router'
import store from './store'

import '@/assets/scss/index.scss'

import * as _ from 'underscore'

Vue.use(BootstrapVue)
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

extend('did', value => {
  if (/^0x[a-zA-Z0-9]{40}$/.test(value)) {
    return true;
  }

  return "The entered value doesn't match the format did:[chain]:0x[numbers]";
});

window._ = _

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
