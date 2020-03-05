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
import { FadeLoader } from '@saeris/vue-spinners'

import LayoutMixin from '@src/mixins/layout'

import { createNamespacedHelpers } from 'vuex'
const { mapState: mapSystemState } = createNamespacedHelpers('system')

export default {
    name: 'Layout',
    mixins: [
        LayoutMixin
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
        async connect () {
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
