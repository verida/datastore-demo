<template>
  <Layout
    title="Identities"
    createBtn="Create Citizen Verification"
    :collections="collections" />
</template>

<script>
import Layout from '@components/Layout'

export default {
  name: 'home',
  components: {
    Layout
  },
  provide: {
    category: 'identity/kyc/AU'
  },
  data () {
    return {
      collections: [
        'identity/kyc/AU'
      ]
    }
  }
}
</script>
