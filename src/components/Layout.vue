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

import { createNamespacedHelpers } from 'vuex'
const { mapMutations: mapSystemMutations } = createNamespacedHelpers('system')

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
      await this.$nextTick()
      await this.$refs.documents.initDatastore()
      this.setSpinner({ [this.SPINNER.DATA]: false })

      window.veridaApp.inbox.on('newMessage', this.setRecipientInfo);
    }
  }
}
</script>
