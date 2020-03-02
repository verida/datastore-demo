<template>
    <div class="main">
        <div class="shadow--main">
            <div class="container-layout">
                <fade-loader v-if="!connected"
                     class="spinner"
                     size="80px" :width="2" color="#fff" />
            </div>
            <action-panel />
            <div class="layout" v-if="connected">
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
    bind
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
        disconnect () {

        }
    }
}
</script>
