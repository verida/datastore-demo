<template>
    <b-modal id="create-receipt" title="Create Receipt" hide-footer>
        <ValidationObserver v-slot="{ invalid }">
            <ValidationProvider v-slot="{ errors }"
                                rules="did"
                                v-for="(item, key) in data" :key="key">
                <label>{{attributes[key].title}}</label>
                <b-form-input class="form-control"
                              :name="key" aria-describedby="did-error" v-model="data[key]"
                              :state="!data[key] ? null : !errors[0]" />
                <b-form-invalid-feedback id="did-error">
                    {{ errors[0] }}
                </b-form-invalid-feedback>
            </ValidationProvider>
            <b-button @click="create" :disabled="invalid" block variant="success">
                Create
            </b-button>
        </ValidationObserver>
    </b-modal>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapGetters: mapSchemaGetters } = createNamespacedHelpers('schema')

export default {
    name: "CreateReceipt",
    data () {
      return {
          data: {},
          attributes: {},
          title: null,
          category: 'shopping/receipt'
      }
    },
    computed: {
        ...mapSchemaGetters(['create']),
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
        async create () {
            const store = await window.veridaApp.openDatastore(this.category)
            await store.save({
                name: this.data.name,
                ...this.data
            })
        }
    }
}
</script>