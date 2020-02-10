<template>
    <b-col sm="12" md="6">
        <div class="connection-statistics">
            <div class="connection-statistics__img mr-3" v-if="img"/>
            <div>
                <div class="connection-statistics__title">{{ title }}</div>
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
            'img'
        ]
    }
</script>