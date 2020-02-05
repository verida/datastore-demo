<template>
  <div>
    <HelloWorld />
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
}
</script>
