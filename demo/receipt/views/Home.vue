<template>
  <Layout
    title="Receipts"
    :collections="collections">
    <template v-slot:action-panel>
      <div class="connection-statistics__action-panel">
        <b-button variant="outline-info" size="sm" v-b-modal.create-modal>
          Send Coupon
        </b-button>
        <b-button variant="outline-info" size="sm">
          Request...
        </b-button>
        <b-button variant="info" size="sm" v-b-modal.create-modal>
          Create Receipt
        </b-button>
      </div>
    </template>
  </Layout>
</template>

<script>
import Layout from '@components/Layout'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters: mapItemGetters } = createNamespacedHelpers('receipt')

export default {
  name: 'home',
  components: {
    Layout
  },
  provide () {
    return {
      category: 'shopping/receipt',
      internalSubmit: this.submit
    }
  },
  computed: {
    ...mapItemGetters(['getRandomReceiptItems'])
  },
  data () {
    return {
      collections: [
        'shopping/receipt',
        'shopping/receipt/item'
      ]
    }
  },
  methods: {
    async submit ({ saved, message }) {
      const itemStore = await window.veridaApp.openDatastore(`shopping/receipt/item`)
      const items = this.getRandomReceiptItems(saved.id)

      for(let i = 0; i < items.length; i++) {
        await itemStore.save(items[i])
        message.push(items[i])
      }
    }
  }
}
</script>
