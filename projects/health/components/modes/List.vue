<template>
    <div class="">
        <empty-list v-if="!list.length"/>
        <b-row v-else>
            <b-col md="6" v-for="(item, index) in list"
                   class="mb-3"
                 :key="`view-${index}`">
                <div class="view">{{ item.notes }}</div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import EmptyList from '../stubs/EmptyList'

export default {
    name: 'List',
    components: {
        EmptyList
    },
    data () {
        return {
            list: []
        }
    },
    computed: {
        entity () {
            return this.$route.params.entity
        }
    },
    async beforeMount () {
        await this.init()
    },
    methods: {
        async init () {
            const schemas = require(`@/config/map.json`)
            const { schema } = schemas[`health/${this.entity}`]
            const store = await window.veridaApp.openDatastore(schema)
            this.list = await store.getMany()
        },
    },
    watch: {
        params: {
            deep: true,
            async handler () {
                await this.init()
            }
        }
    }
}
</script>
