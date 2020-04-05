<template>
    <b-modal id="create-modal" :title="`Create ${title}`" hide-footer v-model="visibility">
        <schema-fields ref="schema-fields"
           @set-title="value => title = value"
           :category="category"
           :internalSubmit="internalSubmit">
            <template v-slot:submit-section="props">
                <b-button variant="danger" :disabled="props.disabled" @click="props.submit">
                    Submit
                </b-button>
            </template>
        </schema-fields>
    </b-modal>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState: mapModalState } = createNamespacedHelpers('system')

import SchemaFields from './SchemaFields'

export default {
    name: 'CreateModal',
    components: { SchemaFields },
    data () {
      return {
          visibility: false,
          title: null
      }
    },
    computed: {
        ...mapModalState(['category', 'internalSubmit']),
        fields () {
            return this.$refs['schema-fields']
        }
    },
    watch: {
        async visibility () {
            if (this.visibility) {
                await this.$nextTick()
                await this.$refs['schema-fields'].init()
            }
        }
    }
}
</script>
