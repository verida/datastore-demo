<template>
    <b-modal id="create-modal" :title="`Create ${title}`" hide-footer v-model="visibility">
        <ValidationObserver v-slot="{ invalid }" ref="validator" mode="eager">
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
const { mapState: mapModalState } = createNamespacedHelpers('modal')

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
          title: null
      }
    },
    computed: {
        ...mapSchemaGetters(['create']),
        ...mapModalState(['category', 'internalSubmit']),
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
            /*
            try {
                await window.veridaApp.outbox.send(this.did, "/schemas/base/inbox/type/dataSend", message, "Here is your data", {});
            } catch (e) {
                console.info(e)
            }*/

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
