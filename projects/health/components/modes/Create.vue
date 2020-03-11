<template>
    <div class="create">
        <schema-fields ref="schema-fields" :category="category" :recipient="false">
            <template v-slot:submit-section="props">
                <b-button variant="danger" class="float-right" :disabled="props.disabled" @click="submit(props.submit)">
                    Submit
                </b-button>
            </template>
        </schema-fields>
    </div>
</template>

<script>
import SchemaFields from '@src/components/SchemaFields'

export default {
    name: 'Create',
    components: { SchemaFields },
    data () {
      return {
        category: null
      }
    },
    computed: {
        entity () {
            const { entity } = this.$route.params
            return `health/${entity}`
        }
    },
    async beforeMount () {
        await this.init()
    },
    methods: {
        async init () {
            const { schema } = require(`@/config/map.json`)[this.entity]
            this.category = schema
            await this.$nextTick()
            await this.$refs['schema-fields'].init()
            this.$emit('set-loaded', true)
        },
        async submit (internal) {
            await internal()
            await this.$refs['schema-fields'].init()
        }
    },
    watch: {
        async entity () {
            await this.init()
        }
    }
}
</script>
