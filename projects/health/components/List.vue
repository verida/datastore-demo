<template>
    <div>
        <div v-if="!list.length">
            The list is empty
        </div>
        <div class="view" v-else
             v-for="(item, index) in list"
             :key="`view-${index}`">
            {{ item }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'List',
    async beforeMount () {
        await this.init()
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
    methods: {
        async init () {
            const { openDatastore } = window.veridaApp
            const store = await openDatastore(`health/${this.entity}`)
            this.list = await store.getMany()
        }
    },
    watch: {
        async entity () {
            await this.init()
        }
    }
}
</script>
