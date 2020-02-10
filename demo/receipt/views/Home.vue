<template>
  <Layout
    title="Receipts"
    :collections="collections">
    <b-button variant="info">
      Send Coupon
    </b-button>
    <b-button variant="info">
      Request...
    </b-button>
    <b-button variant="info" v-b-modal.create-modal>
      Create Receipt
    </b-button>
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
