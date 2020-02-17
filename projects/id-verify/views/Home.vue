<template>
  <Layout title="Identities"
          :collections="collections"
          :navigation="navigation" />
</template>

<script>
import Layout from '@src/components/Layout'
import CreateModalMixin from '@src/mixins/create-modal'

const category = 'identity/kyc/AU'

export default {
  name: 'home',
  mixins: [
    CreateModalMixin
  ],
  components: {
    Layout
  },
  data () {
    return {
      collections: [category],
      navigation: [
        {
          title: 'Create Citizen Verification',
          click: this.createVerification
        }
      ]
    }
  },
  methods: {
    createVerification () {
      this.showModal(category)
    }
  }
}
</script>
