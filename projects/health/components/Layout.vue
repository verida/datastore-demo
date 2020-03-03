<template>
    <div class="main">
        <div class="shadow--main">
            <div class="container-layout" />
            <action-panel />
            <fade-loader class="spinner" v-if="connecting || !loaded"
                :width="2" size="80px" color="#fff" />
            <div class="layout scrollable" v-if="!connecting">
                <component ref="content" :is="$route.params.mode"
                   :loaded="loaded" @set-loaded="value => loaded = value" />
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

import { bindInbox } from '@src/helpers/VeridaTransmitter'

import LayoutMixin from '@src/mixins/layout'

import { createNamespacedHelpers } from 'vuex'
const { mapState: mapSystemState } = createNamespacedHelpers('system')
const { mapActions: mapInboxActions } = createNamespacedHelpers('inbox')

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
            loaded: false
        }
    },
    methods: {
        ...mapInboxActions([
            'getInboxAmount',
            'getInboxMessages'
        ]),
        async handleInbox () {
            await this.getInboxAmount()
            await this.getInboxMessages()
        },
        async connect () {
            await bindInbox(this.handleInbox)
            this.setSpinner({ [this.SPINNER.DATA]: false })
        }
    },
    computed: {
        ...mapSystemState([
            'spinner'
        ]),
        connecting () {
            return this.spinner[this.SPINNER.DATA]
        }
    }
}
</script>
