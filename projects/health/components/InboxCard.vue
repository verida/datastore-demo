<template>
    <div class="service-card">
        <b-row class="d-flex flex-row justify-space-between">
            <b-col cols="12" sm="12" md="auto" :order-md="1" :order="2">
                <div class="d-flex flex-row">
                    <div>
                        <div class="black--text" v-html="card.title" />
                        <div class="service-card__sender">
                            <div v-if="sender">{{ sender }}</div>
                            <div v-else>
                                <BarLoader :width="100" :height="4" />
                            </div>
                        </div>
                    </div>
                </div>
            </b-col>
            <b-col cols="12" sm="12" md="auto" class="text-right pb-sm-0 pb-4" :order="1">
                {{ card.updated }}
            </b-col>
        </b-row>
        <b-row class="pt-2" v-if="!card.status">
            <b-col class="d-flex justify-end">
                <b-btn class="mr-2" color="primary" :disabled="processing"
                       @click="() => click(card.raw, 'accept')">
                    Accept
                </b-btn>
                <b-btn outlined color="error" :disabled="processing"
                       @click="() => click(card.raw, 'reject')">
                    Reject
                </b-btn>
            </b-col>
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
