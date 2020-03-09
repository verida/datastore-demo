<template>
    <b-modal id="patient-modal" hide-footer
             v-model="visible"
             size="sm" centered
             title="Patient DID"
             content-class="patient-modal"
             :no-close-on-backdrop="true"
             :no-close-on-esc="true">
        <div class="patient-modal__content">
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
            </ValidationObserver>
        </div>
    </b-modal>
</template>

<script>
export default {
    name: 'PatientDid',
    data() {
        return {
            visible: true,
            processing: false,
            placeholder: 'did:ethr:0x57127C0C0b891125af4441a51BF37F465cDb9d73',
            did: null
        }
    },
    methods: {
        submit () {
            this.shown = false
        }
    }
}
</script>
