<template>
    <div class="sidebar">
        <b-nav vertical>
            <b-nav-item v-for="item in navigation" :key="item"
                :class="{ 'active': active(item) }">
                <div @click="() => !active(item) && navigate(item)">
                    {{ item }}
                </div>
            </b-nav-item>
        </b-nav>
        <img src="@/assets/img/logo-red.png" />
    </div>
</template>

<script>
export default {
    name: 'Sidebar',
    data () {
        return {
            navigation: [
                'Notes',
                'Prescriptions',
                'Inbox'
            ]
        }
    },
    methods: {
        active (item) {
            const { entity } = this.$route.params
            return item.toLowerCase() === entity
        },
        navigate (item) {
            const { mode } = this.$route.params
            const params = {
                entity: item.toLowerCase(),
                mode: item === 'Inbox' ? 'view' : mode
            }
            this.$router.push({ params })
        }
    }
}
</script>
