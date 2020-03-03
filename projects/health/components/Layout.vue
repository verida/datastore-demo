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

import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('inbox')

import { bindInbox } from '@src/helpers/VeridaTransmitter'

import LayoutMixin from '@src/mixins/layout'

export default {
    name: 'Layout',
    mixins: [
        LayoutMixin
    ],
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
    methods: {
        ...mapActions([
            'getInboxAmount',
            'getInboxMessages'
        ]),
        async handleInbox () {
            await this.getInboxAmount()
            await this.getInboxMessages()
        },
        async connect () {
            await bindInbox(this.handleInbox)
            this.connected = true
        }
    }
}
</script>
