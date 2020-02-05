<template>
  <div>
    <HelloWorld />
<!--    <CreateReceipt />-->
    <ReceiptList></ReceiptList>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import ReceiptList from "../components/ReceiptList";

export default {
  name: 'home',
  components: {
    ReceiptList,
    HelloWorld
  },

  data() {
    return {
      datastore: {}
    }
  },

  async created() {
    this.$store.dispatch()
  }


}
</script>
