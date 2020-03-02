<template>
    <div class="main">
        <div class="shadow--main">
            <div class="container-layout" />
            <action-panel />
            <fade-loader v-if="!connected" class="spinner"
                size="80px" :width="2" color="#14BFF1" />
            <div class="layout" v-else>
                <component :is="$route.params.mode" ref="content"/>
            </div>
        </div>
    </div>
</template>

<script>
import ActionPanel from '@/components/ActionPanel'
import List from '@/components/modes/List'
import Create from '@/components/modes/Create'
import Inbox from '@/components/modes/Inbox'
import { FadeLoader } from '@saeris/vue-spinners'

import {
    connectVerida,
    bind, logout
} from '@src/helpers/VeridaTransmitter'

export default {
    name: 'Layout',
    components: {
        List,
        Create,
        Inbox,
        ActionPanel,
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
            await bind(this.connect, this.disconnect)
            await connectVerida()
        },
        async connect () {
            this.connected = true
        },
        async disconnect () {
            await logout()
            await this.$router.push({ name: 'connect' })
        }
    }
}
</script>
