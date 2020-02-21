<template>
    <BarLoader class="loader" v-bind="$attrs"
               :width="100" :height="4" />
</template>

<script>
import { BarLoader } from '@saeris/vue-spinners'

export default {
    name: 'DashboardLoader',
    components: {
        BarLoader
    }
}
</script>
