<template>
  <div>
    <navbar :navigation="navigation" :authorized="authorized" />
    <documents ref="documents"
      :collections="collections"
      :loaded="loaded" />
    <create-modal />
  </div>
</template>

<script>
import CreateModal from './CreateModal'
import DidStatistics from './DidStatistics'
import Documents from './Documents'
import Navbar from './Navbar'

import {
  connectVerida,
  bind,
  getAddress
} from '@src/helpers/VeridaTransmitter'

export default {
  name: 'Layout',
  props: [
    'collections',
    'title',
    'navigation'
  ],
  components: {
    Navbar,
    Documents,
    DidStatistics,
    CreateModal
  },
  data () {
    return {
      loaded: false,
      authorized: null
    }
  },
  methods: {
    async updateAddress() {
      await this.$nextTick()
      await this.$refs.documents.initDatastore()
      this.loaded = true
    },
    async connect () {
      this.loaded = false
      await bind(this.updateAddress, this.disconnect)
      await connectVerida()
      this.authorized = await getAddress()
    }
  },
  async beforeMount() {
    await this.connect()
  }
}
</script>
