<template>
    <div>
        <video autoplay muted class="landing" loop>
            <source src="@src/assets/video/landing.mp4" type="video/mp4">
        </video>
        <div class="landing__btn" @click="connect">
            <img src="@src/assets/img/verida-logo.svg" />
        </div>
        <recepient-did />
    </div>
</template>

<script>
import RecepientDid from '@src/components/RecepientDid'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters: userGetters } = createNamespacedHelpers('did')

import { bind, connectVerida } from '@src/helpers/VeridaTransmitter'

export default {
    name: 'Landing',
    components: {
        RecepientDid
    },
    computed: {
        ...userGetters([
            'recipient',
            'authorized'
        ])
    },
    methods: {
        showRecipientDidModal () {
            this.$bvModal.show('recepient-did')
        },
        async connect () {
            await bind(this.showRecipientDidModal)
            await connectVerida()
        }
    },
    async beforeMount () {
        if (this.authorized) {
            await this.connect()
        }
        if (this.authorized && !this.recipient) {
            this.showRecipientDidModal()
        }
    }
}
</script>