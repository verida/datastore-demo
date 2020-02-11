<template>
  <b-container>
    <b-row>
      <b-col sm="12" md="6">
        <b-button variant="outline-success" v-if="!address" v-b-modal.recepient-did>
          Connect Wallet
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
      <b-row>
        <b-col cols="12" class="mt-3 d-flex">
          <div class="d-flex justify-content-between align-items-center w-100">
            <h5 class="my-4 text-info">{{ title }}</h5>
            <create-modal :did="recipient" />
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-table
            v-for="key in collections" :key="key"
            v-if="loaded" hover :items="list[key]" :fields="headers[key]" />
          <div v-else>Loading ...</div>
        </b-col>
      </b-row>
    </template>
    <recepient-did @update-address="updateAddress" />
  </b-container>
</template>

<script>
import CreateModal from './CreateModal';
import RecepientDid from './RecepientDid'
import DidStatistics from './DidStatistics'

import {
  connectVerida,
  isConnected,
  getRecipient,
  getAddress,
  logout,
  bind
} from '@src/helpers/VeridaTransmitter'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters: mapSchemaGetters } = createNamespacedHelpers('schema')

export default {
  name: 'Layout',
  props: [
    'collections',
    'title',
  ],
  components: {
    DidStatistics,
    CreateModal,
    RecepientDid
  },
  data () {
    return {
      loaded: false,

      address: null,
      recipient: null,

      headers: {},
      store: {},
      list: {}
    }
  },
  computed: {
    ...mapSchemaGetters(['fields']),
  },
  methods: {
    async initDatastore () {
      this.store = {}
      this.list = {}
      this.headers = {}

      for(let i = 0; i < this.collections.length; i++) {
        const key = this.collections[i]
        const datastore = await window.veridaApp.openDatastore(key)

        this.$set(this.list, key, [])
        this.$set(this.store, key, datastore)
        this.$set(this.headers, key, [])

        await this.initList(key)
        await this.enableWatcher(key, 'updateList')
      }
    },
    async updateList (key) {
      this.list[key] = await this.store[key].getMany()
    },
    async initList (key) {
      this.list[key] = await this.store[key].getMany()
      const { properties } = await this.fields(key)
      this.headers[key] = Object.keys(properties)
    },
    async updateAddress () {
      await bind(this.updateAddress, this.disconnect)
      await connectVerida()

      this.loaded = false
      this.address = await getAddress()
      this.recipient = getRecipient()

      await this.initDatastore()

      this.loaded = true
    },
    disconnect () {
      this.address = null
      this.recipient = null
      logout()
    },
    async enableWatcher (category) {
      const database = await this.store[category].getDb()
      const instance = await database.getInstance()

      instance.changes({
        since: 'now',
        live: true,
        include_docs: true
      }).on('change', async () => await this.updateList(category))
    }
  },
  beforeMount () {
    const did = isConnected()
    if (did) {
      this.updateAddress()
    }
  }
}
</script>
