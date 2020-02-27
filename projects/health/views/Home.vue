<template>
  <div>
    <navigation />
    <div class="filler">
      <div class="filler--shadow">
        <b-container class="container">
          <action-panel />
          <div class="layout">
            <component :is="$route.params.mode" />
          </div>
        </b-container>
      </div>
    </div>
    <sidebar />
  </div>
</template>

<script>
import View from '@/components/View'
import Create from '@/components/Create'
import ActionPanel from '@/components/ActionPanel'
import Navigation from '@/components/Navigation'
import Sidebar from '@/components/Sidebar';

export default {
  name: 'home',
  components: {
    Sidebar,
    Navigation,
    ActionPanel,
    View, Create
  }
}
</script>
