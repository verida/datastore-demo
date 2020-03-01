<template>
  <Layout title="Receipts" :collections="collections" />
</template>

<script>
import Layout from '@src/components/Layout'
import CreateModalMixin from '@src/mixins/create-modal'

import { createNamespacedHelpers } from 'vuex'
const { mapMutations: mapSystemMutations } = createNamespacedHelpers('system')
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
      inboxBind: false,
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
    async requestProfile () {
      if (!this.inboxBind) {
        this.inboxBind = true;
        console.log("inboxBind");
        // Define a callback function that handles inbox messages
        let cb = function(message) {
          let dataItems = message.data.data;
          if (dataItems.length) {
            let requestedProfileData = dataItems[0];
            console.log("Received the following extended profile data:", requestedProfileData);
          }
        }

        window.veridaApp.inbox.on('newMessage', cb);
      }

      // Generate a request for a user's email from their private profile
      let emailRequest = {
          "requestSchema": "profile/private",
          "filter": {
              "key": "email"
          }
      };

      // TODO: Put this in a modal
      let userDid = "did:ethr:0xb42bc405e47dc1e17110dc9849ed405636f2e7f6";

      await window.veridaApp.outbox.send(userDid, "/schemas/inbox/type/dataRequest", emailRequest, "Requesting access to your email");
    }
  }
}
</script>
