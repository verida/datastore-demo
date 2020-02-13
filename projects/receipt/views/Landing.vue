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
const {
    mapGetters: userGetters,
    mapMutations: userMutations
} = createNamespacedHelpers('did')

import { bind, connectVerida, logout } from '@src/helpers/VeridaTransmitter'

export default {
    name: 'Landing',
    components: {
        RecepientDid
    },
    computed: {
        ...userGetters(['recipient', 'authorized'])
    },
    methods: {
        ...userMutations([ 'setAuthorized', 'setRecipient' ]),
        showRecipientDidModal () {
            this.$bvModal.show('recepient-did')
        },
        async connect () {
            await bind(this.showRecipientDidModal, this.disconnect)
            await connectVerida(!this.authorized)
        },
        disconnect () {
            this.setAuthorized(null)
            this.setRecipient(null)
            logout()
        }
    },
    async beforeMount () {
        await this.connect()
    }
}
</script>