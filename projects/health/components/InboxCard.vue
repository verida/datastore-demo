<template>
    <div class="service-card">
        <b-row class="d-flex flex-row justify-space-between">
            <b-col cols="12" class="text-right pb-sm-0 pb-4">
                <strong>{{ card.updated }}</strong>
            </b-col>
            <b-col cols="12">
                <div class="d-flex flex-row">
                    <div>
                        <div class="black--text" v-html="card.title" />
                        <div class="service-card__sender">
                            <div v-if="sender" v-html="sender" />
                            <BarLoader :width="100" :height="4" v-else/>
                        </div>
                    </div>
                </div>
            </b-col>
        </b-row>
        <b-row class="mt-4 justify-content-end" v-if="!card.status">
            <b-button class="mr-2" size="sm" :disabled="processing"
                   @click="() => click(card.raw, 'accept')">
                Accept
            </b-button>
            <b-button class="mr-3" variant="outline-danger" size="sm" :disabled="processing"
                   @click="() => click(card.raw, 'reject')">
                Reject
            </b-button>
        </b-row>
    </div>
</template>

<script>
import { BarLoader } from '@saeris/vue-spinners'

import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('inbox')

import SenderMixin from '@/mixins/sender'

export default {
    name: 'InboxCard',
    components: {
        BarLoader
    },
    props: [
        'card'
    ],
    mixins: [
        SenderMixin
    ],
    data () {
        return {
            processing: false
        }
    },
    methods: {
        ...mapActions([
            'getInboxAmount',
            'getInboxMessages'
        ]),
        async click (msg, action) {
            this.processing = true
            await window.inboxManager.handleAction(msg, action)
            await Promise.all([
                await this.getInboxAmount(),
                await this.getInboxMessages()
            ])
            this.processing = false
        }
    }
}
</script>
