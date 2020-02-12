<template>
    <div>
        <b-row>
            <CircleLoader
                class="custom-class"
                color="#0AE75A"
                :loading="true"
                :size="50" />
        </b-row>
        <b-row v-if="!loaded">
            <b-col sm="12" v-for="key in collections" :key="key">
                <h5 class="my-4 text-info">{{ key | title }}</h5>
                <b-table hover :items="list[key]" :fields="headers[key]" v-if="list[key] && list[key].length"/>
                <div v-else>{{ key | title }} list is empty</div>
            </b-col>
        </b-row>
        <b-row v-else>
            <b-col sm="12"></b-col>
        </b-row>
    </div>
</template>

<script>
import { CircleLoader } from '@saeris/vue-spinners'

import { createNamespacedHelpers } from 'vuex'
const { mapGetters: mapSchemaGetters } = createNamespacedHelpers('schema')

export default {
    name: 'Documents',
    components: {
        CircleLoader
    },
    props: {
      loaded: {
          type: Boolean,
          default: false
      },
      collections: {
        type: Array,
        default: []
      }
    },
    filters: {
        title: (str) => str
            .split('/')
            .map(item => item.charAt(0).toUpperCase() + item.slice(1))
            .join(' ')
    },
    data () {
        return {
            headers: {},
            store: {},
            list: {}
        }
    },
    computed: {
        ...mapSchemaGetters(['fields']),
    },
    methods: {
        async initDatastore() {
            console.log('initDatastore')
            this.store = {}
            this.list = {}
            this.headers = {}

            for (let i = 0; i < this.collections.length; i++) {
                const key = this.collections[i]
                const datastore = await window.veridaApp.openDatastore(key)

                this.$set(this.list, key, [])
                this.$set(this.store, key, datastore)
                this.$set(this.headers, key, [])

                await this.initList(key)
                await this.enableWatcher(key, 'updateList')
            }
        },
        async updateList(key) {
            this.list[key] = await this.store[key].getMany()
        },
        async initList(key) {
            this.list[key] = await this.store[key].getMany()
            const {properties} = await this.fields(key)
            this.headers[key] = Object.keys(properties)
        },
        async enableWatcher(category) {
            const database = await this.store[category].getDb()
            const instance = await database.getInstance()

            instance.changes({
                since: 'now',
                live: true,
                include_docs: true
            }).on('change', async () => await this.updateList(category))
        }
    }
}
</script>