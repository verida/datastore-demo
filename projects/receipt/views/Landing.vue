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
import { bind, connectVerida } from '@src/helpers/VeridaTransmitter'

export default {
    name: 'Landing',
    components: {
        RecepientDid
    },
    methods: {
        async connect () {
            await bind(() => this.$bvModal.show('recepient-did'))
            await connectVerida()
        }
    }
}
</script>