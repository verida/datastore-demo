import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('modal')

export default {
    methods: {
        ...mapMutations([ 'init' ]),
        showModal (category, internalSubmit = () => {}) {
            this.init({ category, internalSubmit })
        }
    }
}