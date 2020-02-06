<template>
  <b-container>
    <b-row>
      <b-col>
        <b-button variant="outline-success" v-if="!address" v-b-modal.recepient-did>
          Connect Wallet
        </b-button>
        <b-button variant="secondary" v-else @click="disconnect">
          Disconnect
        </b-button>
      </b-col>
    </b-row>
    <hr />
    <template v-if="address">
      <b-row>
        <b-col cols="12" class="connection-statistics">
          <div> Address: {{ address }} </div>
          <div> Recipient: {{ recipient }} </div>
        </b-col>
      </b-row>
      <hr />
      <b-row>
        <b-col cols="12" class="mt-3 d-flex">
          <div class="d-flex justify-content-between align-items-center w-100">
            <h5 class="my-4 text-info">Receipts</h5>
            <b-button variant="info" v-b-modal.create-receipt>Create</b-button>
            <create-receipt />
          </div>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-table hover :items="list" :fields="headers" />
        </b-col>
      </b-row>
    </template>
    <recepient-did @update-address="updateAddress" />
  </b-container>
</template>

<script>
import RecepientDid from '@/components/RecepientDid'
import { address } from 'helpers/VeridaTransmitter'
import CreateReceipt from "./CreateReceipt";

import { createNamespacedHelpers } from 'vuex'
const { mapGetters: mapSchemaGetters } = createNamespacedHelpers('schema')

export default {
  name: 'HelloWorld',
  components: {
    CreateReceipt,
    RecepientDid
  },
  data () {
    return {
      address: null,
      recipient: null,
      list: [],
      headers: null,
      category: 'shopping/receipt',
    }
  },
  computed: {
    ...mapSchemaGetters(['fields']),
  },
  async beforeMount () {
    const { properties } = await this.fields(this.category)
    this.headers = Object.keys(properties)
  },
  methods: {
    async updateAddress (recipient) {
      this.address = await address()
      this.recipient = recipient

      const store = await window.veridaApp.openDatastore(this.category)
      this.list = await store.getMany()

      this.enableWatcher(store)
    },
    disconnect () {
      this.address = null
      this.recipient = null
      window.veridaApp.disconnect()
      window.veridaApp = null
    },
    async enableWatcher (store) {
      const database = await store.getDb()
      const instance = await database.getInstance()

      instance.changes({
        since: 'now',
        live: true,
        include_docs: true
      }).on('change', async () => {
        this.list = await store.getMany()
      })
    }
  }
}
</script>