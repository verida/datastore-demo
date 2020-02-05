<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import Home from '@/components/Home.vue'
import RecepientDid from '@/components/RecepientDid'

export default {
  name: 'app',
  components: {
    RecepientDid,
    Home
  }
}
</script>
