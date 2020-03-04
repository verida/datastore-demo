<template>
    <b-toast id="inbox-toast" variant="primary"
             @hidden="close"
             solid v-model="shown">
        <template v-slot:toast-title>
            <div class="d-flex flex-grow-1 align-items-baseline">
                <b-img blank blank-color="#ff5555" class="mr-2" width="12" height="12"></b-img>
                <strong class="mr-auto">Inbox Message</strong>
            </div>
        </template>
        <div>{{ info && info.message }}</div>
        <small class="text-muted mr-2">Sent by {{info && info.sentBy.did}}</small>
    </b-toast>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const {
    mapState: mapSystemState,
    mapMutations: mapSystemMutations
} = createNamespacedHelpers('system')


export default {
    name: 'InboxToast',
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
        }
    },
    watch: {
        info () {
            if (this.info) {
                this.shown = true
            }
        }
    }
}
</script>