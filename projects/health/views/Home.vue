<template>
  <div>
    <div class="shadow--footer" />
    <div class="shadow--middle" />
    <navigation />
    <layout />
    <sidebar />
  </div>
</template>

<script>
import Navigation from '@/components/Navigation'
import Sidebar from '@/components/Sidebar';
import Layout from '@/components/Layout'

export default {
  name: 'home',
  components: {
    Sidebar,
    Navigation,
    Layout
  },
  beforeRouteEnter (to, from, next) {
    to.path === '/' ? next('/note/create') : next()
  }
}
</script>
