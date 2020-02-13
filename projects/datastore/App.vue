<template>
  <div id="app">
    <Home />
  </div>
</template>

<script>
import Home from '@/components/Home.vue'
import RecipientDid from '@src/components/RecipientDid'

export default {
  name: 'app',
  components: {
    RecipientDid,
    Home
  }
}
</script>
