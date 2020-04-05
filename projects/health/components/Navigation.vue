<template>
    <b-navbar toggleable="lg" type="dark" class="navbar-demo">
        <b-navbar-brand href='/'>
            <img src="@/assets/img/logo.png"/>
            <span>Patient | Medical Data</span>
        </b-navbar-brand>
        <button class="navbar-toggler d-block d-md-none" @click="() => setSidebar()">
            <span class="navbar-toggler-icon" />
        </button>
    </b-navbar>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapMutations: mapSystemMutations } = createNamespacedHelpers('system')

export default {
    name: 'Navigation',
    methods: {
        ...mapSystemMutations([
            'setSidebar'
        ]),
        disconnect () {
            window.veridaApp.disconnect();
            window.veridaApp = null;
        }
    }
}
</script>
