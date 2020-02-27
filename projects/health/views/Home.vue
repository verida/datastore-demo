<template>
  <div>
    <b-navbar toggleable="lg" type="dark" class="navbar-demo">
      <b-navbar-brand href='/'>
        <img src="@/assets/logo.png"/>
        <span>Patient | Medical Data</span>
      </b-navbar-brand>
    </b-navbar>
    <div></div>
    <div class="filler">
      <div class="filler--shadow">
        <div class="action-panel">
          <b-button v-for="action in actions" variant="outline-light">
            {{ action.title }}
          </b-button>
        </div>
        <b-container>
          <div class="layout">
            test
          </div>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapMutations: mapSystemMutations } = createNamespacedHelpers('system')
const { mapGetters: mapItemGetters } = createNamespacedHelpers('receipt')

export default {
  name: 'home',
  data () {
    return {
      collections: [
        'shopping/coupon',
        'shopping/receipt'
      ],
      actions: [
        {
          title: 'create',
          click: () => {}
        },
        {
          title: 'view',
          click: () => {}
        }
      ]
    }
  },
  beforeMount () {
    this.setActions(this.navigation)
  },
  methods: {
    ...mapSystemMutations([ 'setActions' ]),
    sendCoupon () {
      this.showModal('shopping/coupon')
    },
    createReceipt () {
      this.showModal('shopping/receipt', this.submit)
    },
    requestProfile () {
      console.log('hello world')
    }
  }
}
</script>
