const state = {
    receiptItemsList: [
        {
            name: 'Spackling Paste',
            totalAmount: 2000,
            totalTax: 20,
            totalDiscount: 12,
            currency: 'USD',
            barcode: '3424657657'
        },
        {
            name: 'Plaster',
            totalAmount: 1336,
            totalTax: 7,
            totalDiscount: 25,
            currency: 'USD',
            barcode: '3424666857'
        },
        {
            name: 'Tile',
            totalAmount: 3025,
            totalTax: 20,
            totalDiscount: 8,
            currency: 'EUR',
            barcode: '1276478434'
        },
        {
            name: 'Chisel',
            totalAmount: 68,
            totalTax: 7,
            totalDiscount: 12,
            currency: 'USD',
            barcode: '3454667657'
        },
        {
            name: 'Waterpass',
            totalAmount: 120,
            totalTax: 11,
            totalDiscount: 5,
            currency: 'EUR',
            barcode: '342167454557'
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
