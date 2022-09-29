<template>
  <div id="app" :style="{ 'margin-left' : sidebarWidth }">
    <h1 class="border"> Trip Book </h1>
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
.border {
  font-family: sans-serif;
  text-align: center;
  font-weight: bold;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
}

</style>
