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

export default getters
