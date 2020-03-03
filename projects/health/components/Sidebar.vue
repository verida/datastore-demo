<template>
    <div>
        <div class="sidebar--shadow" :class="{'d-none': !(sidebar && mobile)}" />
        <div class="sidebar" v-if="sidebar || !mobile">
            <b-nav vertical>
                <b-nav-item v-for="item in navigation" :key="item"
                            :class="{ 'active': active(item) }">
                    <div @click="() => !active(item) && navigate(item)">
                        {{ item }}
                    </div>
                </b-nav-item>
            </b-nav>
        </div>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const {
    mapState: mapSystemState,
    mapMutations: mapSystemMutations
} = createNamespacedHelpers('system')

export default {
    name: 'Sidebar',
    data () {
        return {
            navigation: [
                'Note',
                'Prescription'
            ],
            displayed: false
        }
    },
    async mounted () {
        await this.setListener()
    },
    computed: {
        ...mapSystemState(['sidebar', 'mobile'])
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
        }
    }
}
</script>
