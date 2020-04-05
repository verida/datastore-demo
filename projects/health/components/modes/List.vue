<template>
    <div v-if="loaded">
        <empty-list v-if="!list.length"/>
        <b-row v-else>
            <b-col sm="12" v-for="(item, index) in list" class="mb-3"
                 :key="`view-${index}`">
                <div class="view">
                    <div v-for="(value, key) in item">
                        <div v-if="key !== 'date'">
                            <strong>{{ properties[key].title }}</strong>: {{ value }}
                        </div>
                        <div v-else class="view--date">{{ value }}</div>
                    </div>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
import { FadeLoader } from '@saeris/vue-spinners'
import EmptyList from '../stubs/EmptyList'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters: mapSchemaGetters } = createNamespacedHelpers('schema')
const { mapState: mapPatientState } = createNamespacedHelpers('patient')

const formatValue = (value, key) => {
    switch (key) {
        case 'date':
            return moment(value).format('DD MMM YYYY')
        case 'date-time':
            return moment(value).format('DD MMM YYYY HH:ss')
        default:
            return value
    }
}

export default {
    name: 'List',
    components: {
        EmptyList,
        FadeLoader
    },
    props: [ 'loaded' ],
    data () {
        return {
            list: [],
            properties: {}
        }
    },
    computed: {
        ...mapSchemaGetters(['fields']),
        ...mapPatientState(['cards']),
        entity () {
            return this.$route.params.entity
        }
    },
    async beforeMount () {
        await this.init()
    },
    methods: {
        async init () {
            this.$emit('set-loaded', false)

            const schemas = require(`@/config/map.json`)
            const { schema } = schemas[`health/${this.entity}`]

            const list = await this.getList(schema)

            const { properties } = await this.fields(schema)
            const keys = _.keys(properties)

            this.list = list
                .map(item => _.pick(item, keys))
                .map(this.formatItem)

            this.properties = properties
            this.$emit('set-loaded', true)
        },
        formatItem (obj) {
            return _.mapObject(obj, formatValue)
        },
        async getList (schema) {
           const { mode } = this.$route.params
           switch (mode) {
               case 'list':
                   return new Promise(resolve => resolve(this.cards))
               case 'custom':
                   const store = await window.veridaApp.openDatastore(schema)
                   return store.getMany()
           }
        }
    },
    watch: {
        async entity () {
            await this.init()
        },
        async '$route.params.mode' () {
            await this.init()
        }
    }
}
</script>
