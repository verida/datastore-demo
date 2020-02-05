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
export default {
    name: "CreateReceipt",
    async mounted () {
      const schema = await window.veridaApp.getSchema('shopping_receipt')
      const { properties } = schema.getSpecification()
      console.log(properties)
    },
}
</script>