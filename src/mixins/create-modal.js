import { createNamespacedHelpers } from 'vuex'
const { mapMutations } = createNamespacedHelpers('system')

export default {
    methods: {
        ...mapMutations([ 'init' ]),
        showModal (category, internalSubmit = () => {}) {
            this.init({ category, internalSubmit })
            this.$bvModal.show('create-modal')
        }
    }
}
