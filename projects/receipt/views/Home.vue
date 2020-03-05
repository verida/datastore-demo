<template>
  <div>
    <Layout title="Receipts" :collections="collections" />
    <RequestRecipient />
    <InboxToast />
  </div>
</template>

<script>
import Layout from '@src/components/Layout'
import CreateModalMixin from '@src/mixins/create-modal'

import RequestRecipient from '../components/modals/RequestRecipient'
import InboxToast from '../components/modals/InboxToast'

import { createNamespacedHelpers } from 'vuex'

const { mapMutations: mapSystemMutations } = createNamespacedHelpers('system')
const { mapGetters: mapItemGetters } = createNamespacedHelpers('receipt')

export default {
  name: 'home',
  mixins: [
    CreateModalMixin
  ],
  components: {
    InboxToast,
    RequestRecipient,
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
      ],
      navigation: [
        {
          title: 'Send Coupon',
          click: this.sendCoupon
        },
        {
          title: 'Create Receipt',
          click: this.createReceipt
        },
        {
          title: 'Request Profile',
          click: this.requestProfile
        }
      ]
    }
  },
  beforeMount () {
    this.setActions(this.navigation)
  },
  methods: {
    ...mapSystemMutations([ 'setActions' ]),
    async submit ({ saved, message }) {
      const itemStore = await window.veridaApp.openDatastore(`shopping/receipt/item`)
      const items = this.getRandomReceiptItems(saved.id)

      for(let i = 0; i < items.length; i++) {
        await itemStore.save(items[i])
        message.push(items[i])
      }
    },
    sendCoupon () {
      this.showModal('shopping/coupon')
    },
    createReceipt () {
      this.showModal('shopping/receipt', this.submit)
    },
    requestProfile () {
      this.$bvModal.show('request-recipient')
    }
  }
}
</script>
