<template>
  <div class="health__body">
    <div class="health__body--gradient">
      <div class="health__body--container">
        <div class="health__navigation">
          <div class="health__navigation--logo">
            <img src="../assets/logo.png" />
            <span class="health__navigation--text"> Patient Medical Data </span>
          </div>
          <div class="health__navigation-actions">
            <div>
              <div v-for="action in navigation" class="action__item">
                {{ action }}
              </div>
            </div>
            <div class="action__item">
              Logout
            </div>
          </div>
        </div>
        <div class="health__card">
          <div class="health__card--navigation">
            <div class="health__card--navigation-item">
              CREATE
            </div>
            <div class="health__card--navigation-item">
              VIEW
            </div>
          </div>
          <div class="health__card--body">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Layout from '@src/components/Layout'
import CreateModalMixin from '@src/mixins/create-modal'

import { createNamespacedHelpers } from 'vuex'
const { mapMutations: mapSystemMutations } = createNamespacedHelpers('system')

const category = 'identity/kyc/AU'

export default {
  name: 'home',
  mixins: [
    CreateModalMixin
  ],
  components: {
    Layout
  },
  data () {
    return {
      collections: [category],
      navigation: [
        'Note',
        'Prescription',
        'Inbox'
      ]
    }
  },
  beforeMount () {
    this.setActions(this.navigation)
  },
  methods: {
    ...mapSystemMutations([ 'setActions' ]),
    createVerification () {
      this.showModal(category)
    }
  }
}
</script>
