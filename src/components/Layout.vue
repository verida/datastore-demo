<template>
  <b-container>
    <b-row>
      <b-col sm="12" md="6">
        <b-button variant="outline-success"
          v-if="!address || !recipient" @click="connect" :disabled="address && !recipient">
          {{ address && recipient ? 'Connected' : 'Connect Wallet' }}
        </b-button>
        <b-button variant="success" v-else @click="disconnect">
          Disconnect
        </b-button>
      </b-col>
      <did-statistics v-if="address" :img="true"
                      title="User DID" :text="`did:ethr:${address}`" />
    </b-row>
    <hr />
    <template v-if="address">
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
    <recepient-did @init-recepient="initRecipient" />
  </b-container>
</template>

<script>
import CreateModal from './CreateModal'
import RecepientDid from './RecepientDid'
import DidStatistics from './DidStatistics'
import Documents from './Documents'

import {
  connectVerida,
  isConnected,
  getRecipient,
  getAddress,
  logout,
  bind
} from '@src/helpers/VeridaTransmitter'

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
  data () {
    return {
      address: null,
      recipient: null,
      loaded: false
    }
  },
  methods: {
    async updateAddress() {
      this.loaded = false
      this.address = await getAddress()

      await this.$nextTick()
      await this.$refs.documents.initDatastore()

      this.loaded = true
    },
    initRecipient () {
      this.recipient = getRecipient()
    },
    async connect () {
      await bind(this.updateAddress, this.disconnect)
      await connectVerida()
      await this.updateAddress()
      this.$bvModal.show('recepient-did')
    },
    disconnect () {
      this.address = null
      this.recipient = null
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
