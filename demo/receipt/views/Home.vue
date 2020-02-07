<template>
  <Layout
    title="Receipts"
    createBtn="Create Receipt"
    :collections="collections" />
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
