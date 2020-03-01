<template>
    <b-navbar toggleable="lg" type="dark" class="navbar-demo">
        <b-navbar-brand href='/'>
            <img src="@/assets/img/logo.png"/>
            <span>Patient | Medical Data</span>
        </b-navbar-brand>
        <!--<b-navbar-nav class="ml-auto">
            <b-nav-item>
                <b-button variant="outline-light" @click="disconnect">
                    Disconnect
                </b-button>
            </b-nav-item>
        </b-navbar-nav>-->
    </b-navbar>
</template>

<script>
export default {
    name: 'Navigation',
    methods: {
        disconnect () {
            window.veridaApp.disconnect();
            window.veridaApp = null;
        }
    }
}
</script>
