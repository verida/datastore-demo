<template>
  <Layout title="Identities" :collections="collections" />
</template>

<script>
import Layout from '@src/components/Layout'
import CreateModalMixin from '@src/mixins/create-modal'

import { createNamespacedHelpers } from 'vuex'
const { mapMutations: mapSystemMutations } = createNamespacedHelpers('system')

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
  beforeMount () {
    this.setActions(this.navigation)
  },
  methods: {
    ...mapSystemMutations([ 'setActions' ]),
    createVerification () {
      this.showModal(category)
    }
  }
}
</script>
