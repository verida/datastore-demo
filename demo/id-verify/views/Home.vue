<template>
  <Layout
    title="Identities"
    createBtn="Create Citizen Verification"
    :collections="collections" />
</template>

<script>
import Layout from '@components/Layout'

export default {
  name: 'home',
  components: {
    Layout
  },
  provide () {
    return {
      category: 'identity/kyc/AU',
      internalSubmit: this.submit
    }
  },
  data () {
    return {
      collections: [
        'identity/kyc/AU'
      ]
    }
  },
  methods: {
    async submit ({ saved, message }) {
      const itemStore = await window.veridaApp.openDatastore(`${this.category}/item`)
      const items = this.getRandomReceiptItems(saved.id)

      for(let i = 0; i < items.length; i++) {
        await itemStore.save(items[i])
        message.push(items[i])
      }
    }
  }
}
</script>
