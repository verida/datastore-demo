<template>
    <div class="sidebar">
        <b-nav vertical>
            <b-nav-item v-for="item in navigation" :key="item" >
                <div @click="() => navigate(item)">{{ item }}</div>
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
        navigate (item) {
            let { mode, entity } = this.$route.params
            const next = item.toLowerCase()

            if (next === entity) {
                return
            }

            const params = {
                entity: next,
                mode: item === 'Inbox' ? 'view' : mode
            }
            this.$router.push({ params })
        }
    }
}
</script>
