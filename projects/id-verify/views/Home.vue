<template>
  <Layout title="Identities" :collections="collections">
    <template v-slot:actions>
      <b-button
          variant="info" size="sm"
          v-b-modal.create-modal
          @click="createVerification">
        Create Citizen Verification
      </b-button>
    </template>
  </Layout>
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
      collections: [category]
    }
  },
  methods: {
    createVerification () {
      this.showModal(category)
    }
  }
}
</script>
