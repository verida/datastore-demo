<template>
    <b-modal id="create-receipt" title="Create Receipt" hide-footer>
        <ValidationObserver v-slot="{ invalid }">
            <!--<ValidationProvider v-slot="{ errors }" rules="did">
                <b-form-input class="form-control" name="did" aria-describedby="did-error" v-model="did"
                              :state="!did ? null : !errors[0]" />
                <b-form-invalid-feedback id="did-error">
                    {{ errors[0] }}
                </b-form-invalid-feedback>
            </ValidationProvider>-->
            <b-button @click="confirm" :disabled="invalid" block variant="success">
                Confirm
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
          title: null
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
            const { title, properties } =  await this.create('shopping/receipt')

            this.title = title
            this.data = {}
            this.attributes = {}

            Object.keys(properties).forEach(key => {
                this.$set(this.data, key, null)
                this.$set(this.attributes, key, properties[key])
            })
        }
    }
}
</script>