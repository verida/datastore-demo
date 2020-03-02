<template>
    <div class="">
        <empty-list v-if="!list.length"/>
        <b-row v-else>
            <b-col sm="12" v-for="(item, index) in list"
                   class="mb-3"
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
import EmptyList from '../stubs/EmptyList'
import DateFormatMixin from '@src/mixins/date-format'

import { createNamespacedHelpers } from 'vuex'
const {
    mapGetters: mapSchemaGetters
} = createNamespacedHelpers('schema')

export default {
    name: 'List',
    components: {
        EmptyList
    },
    mixins: [
        DateFormatMixin
    ],
    data () {
        return {
            list: [],
            properties: {}
        }
    },
    computed: {
        ...mapSchemaGetters(['fields']),
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

            const list = await store.getMany()
            const { properties } = await this.fields(schema)
            const keys = _.keys(properties)

            this.list = list
                .map(item => _.pick(item, keys))
                .map(this.formatItem)
            this.properties = properties
        },
        formatItem (obj) {
            return _.mapObject(obj, (value, key) => {
                const str = this.format(key)
                return str ? moment(value).format(str) : value
            })
        }
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
