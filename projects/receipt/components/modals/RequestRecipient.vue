<template>
    <b-modal id="request-recipient" title="Recipient's DID" hide-footer
             size="sm" centered v-model="shown"
             content-class="recipient-modal"
             header-class="recipient-modal__header">
        <div class="recipient-modal__content">
            <ValidationObserver v-slot="{ invalid }" ref="validator">
                <ValidationProvider v-slot="{ errors }" rules="required|did">
                    <b-form-textarea v-model="did" name="did"
                                     spellcheck="false"
                                     :placeholder="placeholder"
                                     class="form-control word-break "
                                     size="sm" rows="3" no-resize
                                     aria-describedby="did-error"
                                     :state="!did ? null : !errors[0]" />
                    <b-form-invalid-feedback id="did-error">
                        {{ errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
                <button class="recipient-modal__button" @click="submit" :disabled="invalid"/>
            </ValidationObserver>
        </div>
    </b-modal>
</template>

<script>
const configs = {
    type: '/schemas/inbox/type/dataRequest',
    message: 'Requesting access to your email',
    request: {
        'requestSchema': 'profile/private',
        'filter': { 'key': 'email' }
    }
}

export default {
    name: 'RequestRecipient',
    data () {
        return {
            placeholder: 'did:ethr:0x57127C0C0b891125af4441a51BF37F465cDb9d73',
            did: null,
            shown: false
        }
    },
    methods: {
        async submit () {
            await window.veridaApp.outbox.send(this.did, configs.type, configs.request, configs.message, {});
            await this.$nextTick()
            this.$bvModal.hide('request-recipient')
        },
    },
    watch:{
        shown () {
            if (this.shown) {
                this.did = null
                this.$refs.validator.reset()
            }
        }
    }
}
</script>
