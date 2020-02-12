<template>
  <Layout
    title="Receipts"
    :collections="collections">
    <template v-slot:actions>
      <b-button
        variant="outline-info" size="sm"
        v-b-modal.create-modal
        @click="sendCoupon">
        Send Coupon
      </b-button>
      <b-button variant="outline-info" size="sm">
        Request...
      </b-button>
      <b-button
        variant="info"
        size="sm"
        v-b-modal.create-modal
        @click="createReceipt">
        Create Receipt
      </b-button>
    </template>
  </Layout>
</template>

<script>
import Layout from '@src/components/Layout'
import CreateModalMixin from '@src/mixins/create-modal'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters: mapItemGetters } = createNamespacedHelpers('receipt')

export default {
  name: 'home',
  mixins: [
    CreateModalMixin
  ],
  components: {
    Layout
  },
  computed: {
    ...mapItemGetters(['getRandomReceiptItems'])
  },
  data () {
    return {
      collections: [
        'shopping/coupon',
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
    },
    sendCoupon () {
      this.showModal('shopping/coupon',() => {})
    },
    createReceipt () {
      this.showModal('shopping/receipt', this.submit)
    }
  }
}
</script>
