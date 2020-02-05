<template>
  <b-container>
    <b-row>
      <b-col>
        <b-button variant="outline-success" v-if="!address" v-b-modal.recepient-did>
          Connect Wallet
        </b-button>
        <b-button variant="outline-secondary" v-else @click="disconnect">
          Disconnect
        </b-button>
      </b-col>
      <b-col v-if="address" class="text-success font-weight-bold">
        <div>Address: {{ address }}</div>
        <div>Recipient: {{ recipient }}</div>
      </b-col>
    </b-row>
    <RecepientDid @update-address="updateAddress" />
  </b-container>
</template>

<script>
import RecepientDid from '@/components/RecepientDid'
import { address } from 'helpers/VeridaTransmitter'

export default {
  name: 'HelloWorld',
  components: {
    RecepientDid
  },
  data () {
    return {
      address: null,
      recipient: null
    }
  },
  methods: {
    async updateAddress (recipient) {
      this.address = await address()
      this.recipient = recipient
    },
    disconnect () {
      this.address = null
      this.recipient = null
      window.veridaApp.disconnect()
      window.veridaApp = null
    }
  }
}
</script>