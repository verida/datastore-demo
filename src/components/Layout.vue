<template>
  <div>
    <navbar />
    <documents ref="documents" :collections="collections" />
    <create-modal />
  </div>
</template>

<script>
import CreateModal from './CreateModal'
import DidStatistics from './DidStatistics'
import Documents from './Documents'
import Navbar from './Navbar'

import LayoutMixin from '@src/mixins/layout'

import { bindInbox } from '@src/helpers/VeridaTransmitter'

import { createNamespacedHelpers } from 'vuex'

export default {
  name: 'Layout',
  props: [
    'collections',
    'title'
  ],
  mixins: [
    LayoutMixin
  ],
  components: {
    Navbar,
    Documents,
    DidStatistics,
    CreateModal
  },
  methods: {
    handleInbox (payload) {
      const { sentBy, message } = payload
      this.$bvToast.toast(`Sent from: ${sentBy.did}`, {
        title: message,
        variant: 'primary',
        solid: true
      })
    },
    async connect() {
      bindInbox(this.handleInbox)
      await this.$nextTick()
      await this.$refs.documents.initDatastore()
      this.setSpinner({ [this.SPINNER.DATA]: false })
    }
  }
}
</script>
