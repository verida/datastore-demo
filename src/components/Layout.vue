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

import {
  connectVerida,
  bind,
  getAddress
} from '@src/helpers/VeridaTransmitter'

import { createNamespacedHelpers } from 'vuex'
import {SPINNER, USER} from '../constants/spinner'
const {
  mapMutations: mapSystemMutations
} = createNamespacedHelpers('system')

export default {
  name: 'Layout',
  props: [
    'collections',
    'title'
  ],
  components: {
    Navbar,
    Documents,
    DidStatistics,
    CreateModal
  },
  data () {
    return {
      authorized: null
    }
  },
  methods: {
    ...mapSystemMutations([
      'initUser', 'setSpinner'
    ]),
    async updateAddress() {
      await this.$nextTick()
      await this.$refs.documents.initDatastore()
      this.setSpinner({ [SPINNER.DATA]: false })
    },
    async connect () {
      this.setSpinner({
        [SPINNER.DATA]: true,
        [SPINNER.NAVIGATION]: true
      })
      await bind(this.updateAddress, this.disconnect)
      await connectVerida()
      await this.loadUser()
    },
    async loadUser () {
      const did = await getAddress()
      const name = await window.profileManager.get('name')

      this.initUser({
        [USER.ADDRESS]: did,
        [USER.NAME]: name
      })
      this.setSpinner({
        [SPINNER.NAVIGATION]: false
      })
    }
  },
  async beforeMount() {
    await this.connect()
  }
}
</script>
