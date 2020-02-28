<template>
  <div>
    <navigation />
    <div class="shadow--footer" />
    <div class="shadow--middle" />
    <div class="main">
      <div class="shadow--main">
        <b-container>
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
import List from '@/components/List'
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
    List, Create
  }
}
</script>
