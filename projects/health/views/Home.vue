<template>
  <div>
    <div class="shadow--footer" />
    <div class="shadow--middle" />
    <navigation />
    <layout />
    <sidebar />
    <div class="patient-layout" v-if="!identified" >
      <patient-did />
      <div class="patient-layout__loader">
        <ring-loader :size="150" color="white" />
        <div class="patient-layout__logo" />
      </div>
    </div>
  </div>
</template>

<script>
import { RingLoader } from '@saeris/vue-spinners'

import Navigation from '@/components/Navigation'
import Sidebar from '@/components/Sidebar'
import Layout from '@/components/Layout'
import PatientDid from '@/components/PatientDid'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters: mapPatientGetters } = createNamespacedHelpers('patient')

export default {
  name: 'home',
  components: {
    Sidebar,
    Navigation,
    Layout,
    PatientDid,
    RingLoader
  },
  computed: {
    ...mapPatientGetters([
      'identified'
    ])
  },
  beforeRouteEnter (to, from, next) {
    to.path === '/' ? next('/note/create') : next()
  }
}
</script>
