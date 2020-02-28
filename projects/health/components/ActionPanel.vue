<template>
    <div class="action-panel">
        <b-button v-for="mode in modes" variant="outline-light"
                  v-if="params.entity !== 'inbox'"
                  :class="{'active': mode === params.mode}"
                  @click="() => changeMode(mode)">
            {{ mode }}
        </b-button>
    </div>
</template>

<script>
const modes = [ 'create', 'list']

export default {
    name: 'ActionPanel',
    data () {
        return { modes }
    },
    computed: {
        params () {
            return this.$route.params
        }
    },
    methods: {
        changeMode (mode) {
            this.$router.push({
                params: {mode}
            })
        }
    }
}
</script>
