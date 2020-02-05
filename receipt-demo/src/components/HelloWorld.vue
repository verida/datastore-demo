<template>
  <b-container>
    <b-row>
      <b-col>
        <b-button variant="outline-success"
          :disabled="!!address"
          @click="connect">
          {{ address ? 'Connected' : 'Connect Wallet' }}
        </b-button>
      </b-col>
      <b-col v-if="address" class="text-success font-weight-bold">
        {{ address }}
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { init, address } from '@/helpers/VeridaTransmitter'

export default {
  name: 'HelloWorld',
  data () {
    return {
      address: null
    }
  },
  methods: {
    async connect () {
      await init()
      console.log(await address(), 'this.connected')
      this.address = await address()
    }
  }
}
</script>