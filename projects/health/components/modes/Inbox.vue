<template>
    <div>
        <empty-list v-if="!cards.length"/>
        <inbox-card v-else
            v-for="(card, index) in cards"
            :key="`card-${index}`" :card="card" />
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters, mapActions } = createNamespacedHelpers('inbox')

import EmptyList from '../stubs/EmptyList'
import InboxCard from "../InboxCard";

export default {
    name: 'Inbox',
    components: {
        InboxCard,
        EmptyList
    },
    computed: {
        ...mapGetters([ 'cards' ]),
        entity () {
            return this.$route.params.entity
        }
    },
    methods: {
        ...mapActions([
            'getInboxAmount',
            'getInboxMessages'
        ]),
        async init () {
            const requests = [
                this.getInboxAmount(),
                this.getInboxMessages()
            ]
            return Promise.all(requests)
        }
    },
    async beforeMount () {
        await this.init()
    },
    watch: {
        async entity () {
            await this.init()
        }
    }
}
</script>
