<template>
    <div>
        <div class="sidebar--shadow" :class="{'d-none': !(sidebar && mobile)}" />
        <div class="sidebar" v-if="sidebar || !mobile">
            <div class="profile">
                <fade-loader v-if="spinner[SPINNER.NAVIGATION]"
                             class="ml-3" :width="2" size="80px"
                             color="#808080" />
                <template v-else>
                    <strong>{{ user[USER.NAME] }}</strong>
                    <div class="profile__did">did:ethr:{{ user[USER.ADDRESS] }}</div>
                </template>
            </div>
            <b-nav vertical class="my-4">
                <b-nav-item v-for="item in navigation" :key="item" :class="{ 'active': active(item) }">
                    <div @click="() => !active(item) && navigate(item)">
                        {{ item }}
                    </div>
                </b-nav-item>
            </b-nav>
            <div class="sidebar--middle-shadow" />
            <img src="@/assets/img/logo-red.png" class="logout" @click="disconnect" />
        </div>
    </div>
</template>

<script>
import { logout } from '@src/helpers/VeridaTransmitter'
import { USER, SPINNER } from '@src/constants/spinner'

import { FadeLoader } from '@saeris/vue-spinners'

import { createNamespacedHelpers } from 'vuex'
const {
    mapState: mapSystemState,
    mapMutations: mapSystemMutations
} = createNamespacedHelpers('system')

export default {
    name: 'Sidebar',
    components: {
        FadeLoader
    },
    data () {
        return {
            navigation: [
                'Note',
                'Prescription'
            ],
            displayed: false,
            USER, SPINNER
        }
    },
    async mounted () {
        await this.setListener()
    },
    computed: {
        ...mapSystemState([
            'sidebar',
            'mobile',
            'user',
            'spinner'
        ])
    },
    methods: {
        ...mapSystemMutations([
            'setMobile'
        ]),
        async setListener () {
            window.addEventListener('resize', this.resize)
            await this.resize()
        },
        async resize () {
            await this.$nextTick()
            this.setMobile(window.innerWidth < 768)
        },
        active (item) {
            const { entity } = this.$route.params
            return item.toLowerCase() === entity
        },
        navigate (item) {
            const { mode } = this.$route.params
            const params = {
                entity: item.toLowerCase(),
                mode
            }
            this.$router.push({ params })
        },
        async disconnect () {
            await logout()
            await this.$router.push({ name: 'connect' })
        }
    }
}
</script>
