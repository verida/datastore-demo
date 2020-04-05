import {
    connectVerida,
    bind,
    getAddress,
    logout
} from '@src/helpers/VeridaTransmitter'

import { createNamespacedHelpers } from 'vuex'
import { SPINNER, USER } from '../constants/spinner'
const {
    mapMutations: mapSystemMutations
} = createNamespacedHelpers('system')

export default {
    data () {
        return {
            USER, SPINNER
        }
    },
    methods: {
        ...mapSystemMutations([
            'initUser', 'setSpinner'
        ]),
        async init () {
            this.setSpinner({
                [SPINNER.DATA]: true,
                [SPINNER.NAVIGATION]: true
            })
            await bind(this.connect, this.disconnect)
            await connectVerida()
            await this.loadUser()
        },
        async disconnect () {
            await logout()
            await this.$router.push({ name: 'connect' })
        },
        async loadUser () {
            const did = await getAddress()
            const name = await window.profileManager.get('name')

            this.initUser({
                [USER.ADDRESS]: did,
                [USER.NAME]: name
            })
            this.setSpinner({
                [SPINNER.NAVIGATION]: false
            })
        }
    },
    async beforeMount() {
        await this.init()
    }
}
