<template>
    <b-modal id="create-modal" :title="`Create ${title}`" hide-footer v-model="visibility">
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
            <b-button @click="submit" :disabled="invalid || processing"
                      block variant="success">
                Create
            </b-button>
        </ValidationObserver>
    </b-modal>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import extract from '../helpers/NameModifier'
const { mapGetters: mapSchemaGetters } = createNamespacedHelpers('schema')
const { mapState: mapModalState } = createNamespacedHelpers('system')
const inboxType = '/schemas/inbox/type/dataSend'

import DateFormatMixin from '../mixins/date-format'

export default {
    name: 'CreateModal',
    mixins: [ DateFormatMixin ],
    data () {
      return {
          data: {},
          attributes: {},
          visibility: false,
          processing: false,
          title: null,

          did: null,
          placeholder: 'did:ethr:0x57127C0C0b891125af4441a51BF37F465cDb9d73'
      }
    },
    computed: {
        ...mapSchemaGetters(['create']),
        ...mapModalState(['category', 'internalSubmit']),
    },
    methods: {
        async init () {
            const { title, properties } =  await this.create(this.category)

            this.did = null
            this.title = title
            this.data = {}
            this.attributes = {}

            Object.keys(properties).forEach(key => {
                this.$set(this.data, key, null)
                this.$set(this.attributes, key, properties[key])
            })

            await this.$nextTick()
            this.$refs.validator.reset()
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
            await this.internalSubmit({ saved, message })

            let outboxItem = {
                "data": message
            }

            try {
                await window.veridaApp.outbox.send(this.did, "/schemas/base/inbox/type/dataSend", outboxItem, "Sending you a "+this.category, {});
            } catch (e) {
                console.info(e)
            }

            this.processing = false
            this.$bvModal.hide('create-modal')
        }
    },
    watch: {
        async visibility () {
            if (this.visibility) {
                await this.init()
            }
        }
    }
}
</script>
