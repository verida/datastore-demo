const state = {
    receiptItemsList: [
        {
            "totalAmount": 2000,
            "totalTax": 20,
            "totalDiscount": 12,
            "currency": 'USD',
        },
        {
            "totalAmount": 2000,
            "totalTax": 20,
            "totalDiscount": 12,
            "currency": 'USD',
        },
        {
            "totalAmount": 2000,
            "totalTax": 20,
            "totalDiscount": 12,
            "currency": 'USD',
        },
        {
            "totalAmount": 2000,
            "totalTax": 20,
            "totalDiscount": 12,
            "currency": 'USD',
        },
        {
            "totalAmount": 2000,
            "totalTax": 20,
            "totalDiscount": 12,
            "currency": 'USD',
        }
    ]
};

const getters = {
    getRandomReceiptItems: (state) => {
        return (receiptId) => {
            return _.chain(state.receiptItemsList)
                .sample(3)
                .map(item => {
                    return { ...item, receiptId: receiptId }
                })
                .value()
        }
    }
};

export default {
    namespaced: true,
    state,
    getters
}