import { createNamespacedHelpers } from 'vuex'
const { mapActions } = createNamespacedHelpers('inbox')

export default {
  data () {
    return {
      sender: null
    }
  },
  async beforeMount () {
    await this.getSender()
  },
  methods: {
    ...mapActions([ 'getInboxSender' ]),
    async getSender () {
      const profile = await this.getProfileItem()
      const [ name, employer ] = [
        profile('name', '<unknown>'),
        profile('employer', '---')
      ]

      this.sender = `<strong>${name}</strong> from <strong>${employer}</strong>`
    },
    async getProfileItem () {
      const profile = await this.getInboxSender(this.card.did)

      return (key, stub) => {
        const data = _.find(profile, data => data.key === key)
        return (data && data.value) || stub
      }
    }
  }
}
