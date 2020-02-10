<template>
  <Layout
    title="Identities"
    :collections="collections">
    <template v-slot:actions>
      <b-button variant="info" v-b-modal.create-modal>
        Create Citizen Verification
      </b-button>
    </template>
  </Layout>
</template>

<script>
import Layout from '@components/Layout'

export default {
  name: 'home',
  components: {
    Layout
  },
  provide: {
    category: 'identity/kyc/AU',
    internalSubmit: () => {}
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
