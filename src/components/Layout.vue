<template>
  <b-container class="my-4">
    <b-row>
      <b-col cols="12" sm="6">
        <b-button variant="outline-success" @click="disconnect" class="mb-3" size="lg">
          Disconnect
        </b-button>
      </b-col>
      <did-statistics :img="true" title="User DID" :text="`did:ethr:${authorized}`" />
    </b-row>
    <hr />
    <template>
      <b-row>
        <did-statistics title="Recipient DID" :text="recipient" />
        <b-col cols="12" sm="6">
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
    <recipient-did @confirm="did => recipient = did" :closable="!recipient" />
  </b-container>
</template>

<script>
import RecipientDid from './RecipientDid'
import CreateModal from './CreateModal'
import DidStatistics from './DidStatistics'
import Documents from './Documents'

import {
  connectVerida,
  logout,
  bind,
  getAddress
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
    RecipientDid
  },
  data () {
    return {
      loaded: false,
      authorized: null,
      recipient: null
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
    },
    async disconnect () {
      await logout()
      await this.$router.push({ name: 'connect' })
    }
  },
  async beforeMount() {
    await this.connect()
  },
  mounted () {
    this.$bvModal.show('recipient-did')
  }
}
</script>
