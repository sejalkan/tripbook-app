<template>
  <div id="app" :style="{ 'margin-left' : sidebarWidth }">
    <Sidebar />
    <!-- Render the content of the current page view -->
    <router-view/>
  </div>
</template>

<script>
import Sidebar from './components/sidebar/Sidebar.vue'
import { sidebarWidth } from './components/sidebar/state'
export default {
  components: { Sidebar },
  setup() {
    return { sidebarWidth }
  }
}
</script>

<style>

</style>
