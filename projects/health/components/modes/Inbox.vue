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
        ...mapGetters([ 'cards' ])
    },
    methods: {
        ...mapActions([
            'getInboxAmount',
            'getInboxMessages'
        ])
    },
    beforeMount () {
        this.getInboxAmount()
        this.getInboxMessages()
    }
}
</script>
