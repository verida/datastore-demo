<template>
    <b-modal id="recipient-data" title="Recipient Data" hide-footer
             size="sm" centered
             content-class="recipient-modal"
             header-class="recipient-modal__header"
             v-model="shown">
        <div class="recipient-modal__content">
            {{info}}
        </div>
        <b-button @cick="close">
            Close
        </b-button>
    </b-modal>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const {
    mapState: mapSystemState,
    mapMutations: mapSystemMutations
} = createNamespacedHelpers('system')

export default {
    name: 'ShowRecipientData',
    data () {
        return {
            shown: false
        }
    },
    computed: {
        ...mapSystemState([
            'info'
        ])
    },
    methods: {
        ...mapSystemMutations([
            'setRecipientInfo'
        ]),
        close () {
            this.setRecipientInfo(null)
            this.$bvModal.hide('recipient-data')
        }
    },
    watch: {
        info () {
            this.shown = Boolean(this.info)
        }
    }
}
</script>
