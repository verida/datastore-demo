<template>
    <b-navbar toggleable="lg" type="dark" class="navbar-demo">
        <b-navbar-brand href='/'>
            <img src="@src/assets/img/verida-logo-title.svg" />
        </b-navbar-brand>

        <b-navbar-toggle target="nav-collapse" />

        <b-collapse id='nav-collapse' is-nav>
            <b-navbar-nav>
                <b-nav-item v-for="item in buttons"
                            :key="item.title" @click="item.click">
                    {{ item.title }}
                </b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
                <b-nav-item active>
                    <dashboard-loader color="#fff" v-if="spinner[SPINNER.NAVIGATION]" />
                    <did-statistics v-else
                        :img="true" :title="user[USER.NAME]"
                        :text="`did:ethr:${user[USER.ADDRESS]}`" />
                </b-nav-item>
                <b-nav-item>
                    <b-button variant="primary" @click="disconnect">
                        Disconnect
                    </b-button>
                </b-nav-item>
            </b-navbar-nav>
        </b-collapse>
    </b-navbar>
</template>

<script>
import DidStatistics from './DidStatistics'
import DashboardLoader from './spinners/DashboardLoader'

import { logout } from '@src/helpers/VeridaTransmitter'

import { SPINNER, USER } from '../constants/spinner';

import { createNamespacedHelpers } from 'vuex'
const { mapState: mapSystemState } = createNamespacedHelpers('system')

export default {
    name: 'Navbar',
    components: {
        DashboardLoader,
        DidStatistics
    },
    data () {
      return {
          USER, SPINNER
      }
    },
    methods: {
        async disconnect () {
            await logout()
            await this.$router.push({ name: 'connect' })
        }
    },
    computed: {
        ...mapSystemState([
            'buttons',
            'user',
            'spinner'
        ])
    }
}
</script>
