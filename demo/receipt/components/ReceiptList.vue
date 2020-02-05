<template>
    <b-list-group>
        <b-list-group-item v-for="(r, index) in getRandomReceiptItems(1)" :key="`r-${index}`">
            {{r.totalAmount}}
        </b-list-group-item>
    </b-list-group>
</template>

<script>
    import { createNamespacedHelpers } from 'vuex';

    const { mapGetters } = createNamespacedHelpers('receipt');

    export default {
        name: 'ReceiptList',
        data () {
            return {
                receiptList: this.$store.state.receipt.receiptList
            }
        },
        computed: {
            ...mapGetters(['getRandomReceiptItems']),
            // receiptItemsList() {
            //     return this.$store.getters['receipt/getRandomReceiptItems'](1);
            // }
        },
        methods: {
        }
    }
</script>
