import DetectUserMixin from '@/mixins/detect-user'

export default {
  mixins: [
    DetectUserMixin
  ],
  data () {
    return {
      sender: null
    }
  },
  async beforeMount () {
    this.did = this.card.did
    this.sender = await this.getSender()
  }
}
