<template>
    <div class="main">
        <div class="shadow--main">
            <div class="container-layout" />
            <action-panel />
            <fade-loader class="spinner" v-if="connecting || !loaded"
                :width="2" size="80px" color="#fff" />
            <div class="layout scrollable" v-if="!connecting">
                <component ref="content" :is="mode"
                   :loaded="loaded" @set-loaded="value => loaded = value" />
            </div>
        </div>
    </div>
</template>

<script>
import ActionPanel from '@/components/ActionPanel'
import List from '@/components/modes/List'
import Create from '@/components/modes/Create'
import { FadeLoader } from '@saeris/vue-spinners'

import LayoutMixin from '@src/mixins/layout'
import DetectUserMixin from '@/mixins/detect-user'

import { createNamespacedHelpers } from 'vuex'
const { mapState: mapSystemState } = createNamespacedHelpers('system')
const { mapMutations: mapPatientMutations } = createNamespacedHelpers('patient')
const { mapActions: mapInboxActions } = createNamespacedHelpers('inbox')

import { bindInbox } from '@src/helpers/VeridaTransmitter'
import { DATA_SEND } from '@src/constants/inbox'

export default {
    name: 'Layout',
    mixins: [
        LayoutMixin,
        DetectUserMixin
    ],
    components: {
        List,
        Create,
        ActionPanel,
        FadeLoader
    },
    data () {
        return {
            loaded: false
        }
    },
    methods: {
        ...mapInboxActions([ 'getInboxSender' ]),
        ...mapPatientMutations([
            'setPatientInfo',
            'setPatientCards'
        ]),
        async connect () {
            bindInbox(this.handleInbox)
            this.setSpinner({ [this.SPINNER.DATA]: false })
        },
        async handleInbox (msg) {
            const { data, type, sentBy } = msg
            if (type === DATA_SEND) {
                this.did = sentBy.did
                const profile = await this.getSender()
                this.setPatientInfo(profile)

                const { data: cards } = data
                this.setPatientCards(cards)
            }
        },
    },
    computed: {
        ...mapSystemState([
            'spinner'
        ]),
        connecting () {
            return this.spinner[this.SPINNER.DATA]
        },
        mode () {
            const { mode } = this.$route.params
            return mode !== 'create' ? 'list' : 'create'
        }
    }
}
</script>
