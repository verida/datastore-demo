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
                      title="User DID" :text="`did:ethr: ${address}`" />
    </b-row>
    <hr />
    <template v-if="address">
      <b-row>
        <did-statistics title="Recipient DID" :text="recipient" />
        <b-col sm="12" md="6">
          <slot name="action-panel" />
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
          <b-table v-if="loaded" hover :items="list" :fields="headers" />
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
import { address, init } from 'helpers/VeridaTransmitter'

import { createNamespacedHelpers } from 'vuex'
import DidStatistics from "./DidStatistics";
const { mapGetters: mapSchemaGetters } = createNamespacedHelpers('schema')

export default {
  name: 'HelloWorld',
  props: [
    'collections',
    'title',
  ],
  inject: [
    'category'
  ],
  components: {
    DidStatistics,
    CreateModal,
    RecepientDid
  },
  data () {
    return {
      address: null,
      recipient: null,
      list: [],
      headers: null,
      loaded: false,
      store: {}
    }
  },
  computed: {
    ...mapSchemaGetters(['fields']),
  },
  methods: {
    getActionName (key) {
      const name = key.split('/')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join('')

      return `update${name}List`
    },
    async initDatastore () {
      this.store = {}
      for(let i = 0; i < this.collections.length; i++) {
        const key = this.collections[i]
        const datastore = await window.veridaApp.openDatastore(key)
        this.$set(this.store, key, datastore)
      }
      await this.enableWatcher(this.category, 'updateList')
    },
    async updateList () {
      this.list = await this.store[this.category].getMany()
    },
    async initList () {
      this.list = await this.store[this.category].getMany()
      const { properties } = await this.fields(this.category)
      this.headers = Object.keys(properties)
    },
    async updateAddress (recipient) {
      this.loaded = false
      this.address = await address()
      this.recipient = recipient

      await this.initDatastore()
      await this.initList()

      this.loaded = true
    },
    disconnect () {
      this.address = null
      this.recipient = null
      window.veridaApp.disconnect()
      window.veridaApp = null
      localStorage.removeItem('did')
    },
    async enableWatcher (category, onInstanceChange) {
      const database = await this.store[category].getDb()
      const instance = await database.getInstance()
      const handler = this.hasOwnProperty(onInstanceChange) ? this[onInstanceChange] : () => {}
      instance.changes({
        since: 'now',
        live: true,
        include_docs: true
      }).on('change', handler)
    }
  },
  async mounted() {
    const did = localStorage.getItem('did')
    if (did) {
      await init()
      this.updateAddress(did)
    }
  }
}
</script>
