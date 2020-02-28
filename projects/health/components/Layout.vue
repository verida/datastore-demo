<template>
    <div class="main">
        <div class="shadow--main">
            <b-container>
                <action-panel />
                <fade-loader v-if="!connected"
                     class="spinner"
                     size="80px" :width="2" color="#fff" />
                <div class="layout" v-else>
                    <component :is="$route.params.mode" ref="content"/>
                </div>
            </b-container>
        </div>
    </div>
</template>

<script>
import ActionPanel from '@/components/ActionPanel'
import List from '@/components/modes/List'
import Create from '@/components/modes/Create'
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
