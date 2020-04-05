<template>
    <b-toast id="inbox-toast" variant="primary" @hidden="close"
             :no-auto-hide="true" solid v-model="shown">
        <template v-slot:toast-title>
            <div class="d-flex flex-grow-1 align-items-baseline">
                <b-img blank blank-color="#ff5555" class="mr-2" width="12" height="12" />
                <strong class="mr-auto">Inbox Message</strong>
            </div>
        </template>
        <small class="text-muted mr-2" v-html="title" />
        <pre v-html="message" class="snippet" />
    </b-toast>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const {
    mapState: mapSystemState,
    mapMutations: mapSystemMutations
} = createNamespacedHelpers('system')
const {
    mapActions: mapInboxActions
} = createNamespacedHelpers('inbox')

const prettyPrintJson = require('pretty-print-json');

export default {
    name: 'InboxToast',
    data () {
        return {
            shown: false,

            title: null,
            message: null
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
        ...mapInboxActions([
            'getInboxSender'
        ]),
        close () {
            this.setRecipientInfo(null)
        },
        async formatInfo () {
            const profile = await this.getInboxSender(this.info.sentBy.did)
            const name = profile.find(item => item.key === 'name')

            const sender = `<strong class="text-success">${name.value}</strong>`
            this.title = `${sender} sent you an extended profile`
            this.message = prettyPrintJson.toHtml(this.info);
        }
    },
    watch: {
        async info () {
            if (this.info) {
                await this.formatInfo()
                this.shown = true
            }
        }
    }
}
</script>
