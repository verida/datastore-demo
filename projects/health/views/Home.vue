<template>
  <div>
    <navigation />
    <div class="shadow--footer" />
    <div class="shadow--middle" />
    <div class="main">
      <div class="shadow--main">
        <b-container>
          <action-panel />
          <div class="layout" v-if="connected">
            <component :is="$route.params.mode" />
          </div>
          <fade-loader v-else class="spinner"
            size="80px"
            width="2"
            color="#fff"/>
        </b-container>
      </div>
    </div>
    <sidebar />
  </div>
</template>

<script>
import List from '@/components/List'
import Create from '@/components/Create'
import ActionPanel from '@/components/ActionPanel'
import Navigation from '@/components/Navigation'
import Sidebar from '@/components/Sidebar';

import { FadeLoader } from '@saeris/vue-spinners'

import {
  connectVerida,
  disconnect
} from '@src/helpers/VeridaTransmitter'

export default {
  name: 'home',
  components: {
    Sidebar,
    Navigation,
    ActionPanel,
    List, Create,
    FadeLoader
  },
  data () {
    return {
      connected: false
    }
  },
  async beforeMount () {
    await this.init()
  },
  methods: {
    async init () {
      await connectVerida(this.connect, this.disconnect)
    },
    connect () {
      this.connected = true
    },
    disconnect () {

    }
  }
}
</script>
