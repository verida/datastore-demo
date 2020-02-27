<template>
    <div class="action-panel">
        <b-button v-for="mode in modes" variant="outline-light"
                  :class="{'active': mode === selected}"
                  @click="() => changeMode(mode)">
            {{ mode }}
        </b-button>
    </div>
</template>

<script>
const modes = [ 'create', 'view']

export default {
    name: 'ActionPanel',
    data () {
        return { modes }
    },
    computed: {
        selected () {
            return this.$route.params.mode
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
