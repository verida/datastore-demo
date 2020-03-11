<template>
    <b-modal id="patient-modal" hide-footer
        v-model="visible"
        size="sm" centered
        content-class="patient-modal"
        header-class="patient-modal__header"
        :hide-header-close="true"
        :no-close-on-backdrop="true"
        :no-close-on-esc="true">
        <template v-slot:modal-title>
            <div> User Data </div>
            <b-button variant="outline-light" size="sm" @click="submit">
                Request
            </b-button>
        </template>
        <div class="patient-modal__content">
            <ValidationObserver v-slot="{ invalid }" ref="validator">
                <ValidationProvider v-slot="{ errors }" rules="required|did" name="did">
                    <div class="form-group">
                        <label>Patient DID</label>
                        <b-form-textarea
                            v-model="did"
                            spellcheck="false"
                            class="form-control word-break "
                            size="sm" rows="3" no-resize
                            aria-describedby="did-error"
                            :placeholder="placeholder"
                            :state="!did ? null : !errors[0]" />
                    </div>
                    <b-form-invalid-feedback>
                        {{ errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
                <ValidationProvider v-slot="{ errors }" rules="required" name="documents">
                    <b-form-group label="Document groups:">
                        <b-form-checkbox-group v-model="documents" switches>
                            <b-form-checkbox value="health/note">Note</b-form-checkbox>
                            <b-form-checkbox value="health/prescription">Prescription</b-form-checkbox>
                        </b-form-checkbox-group>
                    </b-form-group>
                    <b-form-invalid-feedback>
                        {{ errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
            </ValidationObserver>
        </div>
    </b-modal>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const {
    mapMutations: mapPatientMutations
} = createNamespacedHelpers('patient')

const configs = {
    type: 'inbox/type/dataRequest',
    message: 'Requesting an access to documents',
    request: {
        requestSchema: null,
        userSelect: true,
        userSelectLimit: 10
    }
}

export default {
    name: 'PatientDid',
    data() {
        return {
            visible: true,
            placeholder: 'did:ethr:0x57127C0C0b891125af4441a51BF37F465cDb9d73',
            did: null,
            documents: null
        }
    },
    methods: {
        ...mapPatientMutations([
            'setPatientDid'
        ]),
        async submit () {
            const result = await this.$refs.validator.validate()
            if (!result) {
                return
            }

            this.setPatientDid(this.did)
            configs.request.requestSchema = this.documents
            window.veridaApp.outbox.send(this.did, configs.type, configs.request, configs.message, {});
            this.$bvModal.hide('patient-modal')
        }
    }
}
</script>
