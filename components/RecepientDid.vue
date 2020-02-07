<template>
    <b-modal id="recepient-did" title="Enter the Recipient's DID" hide-footer>
        <ValidationObserver v-slot="{ invalid }">
            <ValidationProvider v-slot="{ errors }" rules="did">
                <b-form-input class="form-control" name="did" aria-describedby="did-error" v-model="did"
                              :state="!did ? null : !errors[0]" />
                <b-form-invalid-feedback id="did-error">
                    {{ errors[0] }}
                </b-form-invalid-feedback>
            </ValidationProvider>
            <b-button @click="confirm" :disabled="invalid" block variant="success">
                Confirm
            </b-button>
        </ValidationObserver>
    </b-modal>
</template>

<script>
import { init } from 'helpers/VeridaTransmitter';

export default {
    name: 'RecepientDid',
    data () {
        return {
            did: 'did:ethr:0x57127C0C0b891125af4441a51BF37F465cDb9d73'
        }
    },
    methods: {
        async confirm () {
            await init()
            this.$emit('update-address', this.did)
            this.$bvModal.hide('recepient-did')
        },
    }
}
</script>