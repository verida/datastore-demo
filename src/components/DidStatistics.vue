<template>
    <b-col cols="12" sm="6">
        <div class="connection-statistics mt-sm-3 mt-md-0">
            <div class="connection-statistics__img mr-3" v-if="img"/>
            <div>
                <div>
                    <span class="connection-statistics__title">{{ title }}</span>
                    <span class="text-sub link" @click="showRecipientModal" v-if="update">update</span>
                </div>
                <div class="connection-statistics__text"> {{ text }} </div>
            </div>
        </div>
    </b-col>
</template>

<script>
    export default {
        name: "DidStatistics",
        props: [
            'title',
            'text',
            'img',
            'update'
        ],
        methods: {
            showRecipientModal () {
                this.$bvModal.show('recipient-did')
            }
        }
    }
</script>