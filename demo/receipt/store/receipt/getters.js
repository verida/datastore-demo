const getters = {
    getRandomReceiptItems: (state) => {
        console.log(state);
        return (receiptId) => {
            return state.receiptItemsList.map(ri => ({...ri, receiptId}))
        }
    }
};

export default getters
