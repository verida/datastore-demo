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
    data () {
      return {
          list: []
      }
    },
    computed: {
        params () {
            return this.$route.params
        }
    },
    methods: {
        ...mapInboxActions([
            'getInboxAmount',
            'getInboxMessages'
        ]),
        async init () {
            const store = await window.veridaApp.openDatastore(`health/${this.params.entity}`)
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
