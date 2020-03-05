<template>
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
        <div class="validation-section">
            <ValidationProvider class="validation-section__item"
                    v-slot="{ errors }"
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
                <b-form-textarea
                        v-else-if="attributes[key].inputType === 'textarea'"
                        class="form-control word-break" spellcheck="false"
                        v-model="data[key]"
                        :name="attributes[key].title"
                        :state="!data[key] ? null : !errors[0]"
                        size="sm" rows="3" />
                <b-form-input
                    v-else
                    class="form-control"
                    v-model="data[key]" size="sm"
                    :name="attributes[key].title"
                    :state="!data[key] ? null : !errors[0]" />
                <b-form-invalid-feedback id="did-error">
                    {{ errors[0] }}
                </b-form-invalid-feedback>
            </ValidationProvider>
        </div>
        <slot name="submit-section"
            :submit="submit"
            :disabled="invalid || processing" />
    </ValidationObserver>
</template>

<script>
import extract from '../helpers/NameModifier'

import DateFormatMixin from '../mixins/date-format'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters: mapSchemaGetters } = createNamespacedHelpers('schema')

export default {
    name: 'SchemaFields',
    props: {
        'category': {
            default: null
        },
        'internalSubmit': {
            required: false,
            default: () => {}
        }
    },
    mixins: [ DateFormatMixin ],
    data () {
        return {
            processing: false,

            title: null,
            data: {},
            attributes: {},

            did: null,
            placeholder: 'did:ethr:0x57127C0C0b891125af4441a51BF37F465cDb9d73'
        }
    },
    computed: {
        ...mapSchemaGetters(['create'])
    },
    methods: {
        async init () {
            const { title, properties } =  await this.create(this.category)

            this.title = title
            this.did = null

            this.data = {}
            this.attributes = {}

            Object.keys(properties).forEach(key => {
                this.$set(this.data, key, null)
                this.$set(this.attributes, key, properties[key])
            })

            await this.$nextTick()

            this.$refs.validator.reset()
            this.$emit('set-title', this.title)
        },
        async submit () {
            this.processing = true
            const message = []

            const store = await window.veridaApp.openDatastore(this.category)
            const payload = {
                name: extract(this.data, this.category),
                ...this.data
            }

            message.push(payload)
            const saved = await store.save(payload)

            if (this.internalSubmit) {
                await this.internalSubmit({ saved, message })
            }
            await this.sendInbox(message, payload.name)

            this.processing = false
            this.$bvModal.hide('create-modal')
        },
        async sendInbox (message, name) {
            const { outbox } = window.veridaApp

            const inboxType = '/schemas/inbox/type/dataSend'
            const outboxItem = { 'data': message }
            const text = `Sending you the <strong>${this.title}</strong> called "${name}"`

            try {
                await outbox.send(this.did.toLowerCase(), inboxType, outboxItem, text, {})
            } catch (e) {
                console.info(e)
            }
        }
    }
}
</script>
