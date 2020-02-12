<template>
  <b-container>
    <b-row>
      <b-col sm="12" md="6">
        <b-button variant="success" @click="disconnect">
          Disconnect
        </b-button>
      </b-col>
      <did-statistics :img="true" title="User DID" :text="`did:ethr:${authorized}`" />
    </b-row>
    <hr />
    <template>
      <b-row>
        <did-statistics title="Recipient DID" :text="recipient" />
        <b-col sm="12" md="6">
          <div class="connection-statistics__action-panel">
            <slot name="actions" />
          </div>
        </b-col>
      </b-row>
      <hr />
      <documents ref="documents"
        :collections="collections"
        :loaded="loaded" />
      <create-modal :did="recipient" />
    </template>
  </b-container>
</template>

<script>
import CreateModal from './CreateModal'
import RecepientDid from './RecepientDid'
import DidStatistics from './DidStatistics'
import Documents from './Documents'

const {
  mapGetters: userGetters
} = createNamespacedHelpers('did')

import {
  connectVerida,
  isConnected,
  getRecipient,
  getAddress,
  logout,
  bind
} from '@src/helpers/VeridaTransmitter'
import {createNamespacedHelpers} from "vuex";

export default {
  name: 'Layout',
  props: [
    'collections',
    'title',
  ],
  components: {
    Documents,
    DidStatistics,
    CreateModal,
    RecepientDid
  },
  computed: {
    ...userGetters(['recipient', 'authorized'])
  },
  data () {
    return {
      loaded: false
    }
  },
  methods: {
    async updateAddress() {
      this.loaded = false

      await this.$nextTick()
      await this.$refs.documents.initDatastore()

      this.loaded = true
    },
    async connect () {
      await bind(this.updateAddress, this.disconnect)
      await connectVerida()
      await this.updateAddress()
    },
    disconnect () {
      logout()
    }
  },
  async mounted () {
    const did = isConnected()
    if (did) {
      await this.connect()
    }
  }
}
</script>
