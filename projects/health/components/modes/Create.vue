<template>
    <div class="create">
        <ValidationObserver v-slot="{ invalid }" ref="validator" mode="eager">
            <div class="recipient-area">
                <ValidationProvider v-slot="{ errors }" rules="required|did"
                                    name="Recipient DID" key="recipient-did">
                    <label> Recipient DID </label>
                    <b-form-textarea v-model="did" name="did"
                                     spellcheck="false"
                                     :placeholder="placeholder"
                                     class="form-control word-break "
                                     size="sm" rows="1" no-resize
                                     aria-describedby="did-error"
                                     :state="!did ? null : !errors[0]" />
                    <b-form-invalid-feedback id="did-error">
                        {{ errors[0] }}
                    </b-form-invalid-feedback>
                </ValidationProvider>
            </div>
            <ValidationProvider v-slot="{ errors }"
                                v-for="(item, key) in data"
                                :key="key"
                                :rules="{ required: attributes[key].required }"
                                :name="attributes[key].title">
                <label>{{attributes[key].title}}</label>
                <b-form-group v-if="attributes[key].enum">
                    <b-form-radio-group v-model="data[key]">
                        <b-form-radio v-for="item in attributes[key].enum" :key="item" :value="item">
                            {{ item }}
                        </b-form-radio>
                    </b-form-radio-group>
                </b-form-group>
                <datetime
                        v-else-if="attributes[key].format && attributes[key].format.includes('date')"
                        :auto="true"
                        :format="format(attributes[key].format)"
                        :type="attributes[key].format.replace('-', '')"
                        input-class="form-control"
                        v-model="data[key]" />
                <b-form-input v-else
                              class="form-control"
                              aria-describedby="did-error"
                              v-model="data[key]"
                              size="sm"
                              :state="!data[key] ? null : !errors[0]" />
                <b-form-invalid-feedback id="did-error">
                    {{ errors[0] }}
                </b-form-invalid-feedback>
            </ValidationProvider>
            <b-button @click="submit" :disabled="invalid || processing" variant="danger">
                Submit
            </b-button>
        </ValidationObserver>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import extract from '@src/helpers/NameModifier'
const { mapGetters: mapSchemaGetters } = createNamespacedHelpers('schema')

import DateFormatMixin from '@src/mixins/date-format'

export default {
    name: 'Create',
    mixins: [
        DateFormatMixin
    ],
    data () {
        return {
            data: {},
            attributes: {},
            processing: false,
            did: null,
            placeholder: 'did:ethr:0x57127C0C0b891125af4441a51BF37F465cDb9d73'
        }
    },
    computed: {
        ...mapSchemaGetters(['create']),
        entity () {
            return this.$route.params.entity
        }
    },
    async beforeMount () {
        await this.init()
    },
    methods: {
        async init () {
            const { properties } =  await this.create(`health/${this.entity}`)

            this.did = null
            this.data = {}
            this.attributes = {}

            Object.keys(properties).forEach(key => {
                this.$set(this.data, key, null)
                this.$set(this.attributes, key, properties[key])
            })

            await this.$nextTick()
            this.$refs.validator.reset()
        },
        submit () {

        }
    },
    watch: {
        async entity () {
            await this.init()
        }
    }
}
</script>
