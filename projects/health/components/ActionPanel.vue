<template>
    <div class="action-panel">
        <div class="action-panel__buttons">
            <b-button v-for="mode in modes" variant="outline-light"
                      :class="{'active': mode === params.mode}"
                      @click="() => changeMode(mode)">
                {{ mode }}
            </b-button>
        </div>
    </div>
</template>

<script>
const modes = [ 'create', 'list', 'inbox' ]

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
