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
  </b-container>
</template>

<script>
import CreateModal from './CreateModal'
import RecepientDid from './RecepientDid'
import DidStatistics from './DidStatistics'
import Documents from './Documents'

const {
  mapGetters: userGetters,
  mapMutations: userMutations
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
    ...userGetters(['recipient', 'authorized']),
  },
  data () {
    return {
      loaded: false
    }
  },
  methods: {
    ...userMutations(['setRecipient', 'setAuthorized']),
    async updateAddress() {
      await this.$nextTick()
      await this.$refs.documents.initDatastore()
    },
    async connect () {
      this.loaded = false

      await bind(this.updateAddress, this.disconnect)
      await connectVerida()

      this.loaded = true
    },
    async disconnect () {
      await logout()
      this.setRecipient(null)
      this.setAuthorized(null)
      this.$router.push({ name: 'connect' })
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
