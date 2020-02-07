<template>
    <b-modal id="create-modal" title="Create Receipt" hide-footer v-model="visibility">
        <ValidationObserver v-slot="{ invalid }">
            <ValidationProvider v-slot="{ errors }"
                                rules="required"
                                v-for="(item, key) in data"
                                :key="key"
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
                    v-else-if="attributes[key].format === 'date'"
                    input-class="form-control"
                    auto="close"
                    format="dd-LL-yyyy"
                    v-model="data[key]" />
                <b-form-input v-else
                              class="form-control"
                              aria-describedby="did-error"
                              v-model="data[key]"
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
const { mapGetters: mapItemGetters } = createNamespacedHelpers('receipt')

export default {
    name: 'CreateModal',
    props: [ 'did' ],
    inject: {
        'category': {},
        'internalSubmit': {
            default: () => {}
        }
    },
    data () {
      return {
          data: {},
          attributes: {},
          title: null,
          visibility: false,
          processing: false
      }
    },
    computed: {
        ...mapSchemaGetters(['create']),
        ...mapItemGetters(['getRandomReceiptItems'])
    },
    async mounted () {
      await this.init()
    },
    methods: {
        async init () {
            const { title, properties } =  await this.create(this.category)

            this.title = title
            this.data = {}
            this.attributes = {}

            Object.keys(properties).forEach(key => {
                this.$set(this.data, key, null)
                this.$set(this.attributes, key, properties[key])
            })
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
            await window.veridaApp.inbox.send(this.did, message, {});

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