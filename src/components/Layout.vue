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
const { mapMutations: mapSystemMutations } = createNamespacedHelpers('system')

const configs = {
  type: '/schemas/inbox/type/dataRequest',
  message: 'Requesting access to your email',
  request: {
    'requestSchema': 'profile/private',
    'filter': { 'key': 'email' }
  }
}

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
    ...mapSystemMutations([ 'setRecipientInfo' ]),
    async connect() {
      bindInbox(this.setRecipientInfo)
      await this.$nextTick()
      await this.$refs.documents.initDatastore()
      this.setSpinner({ [this.SPINNER.DATA]: false })

      const did = 'did:ethr:0x4708df53C55CC332490F540307F64dD504b9deED'
      await window.veridaApp.outbox.send(did, configs.type, configs.request, configs.message, {});
    }
  }
}
</script>
