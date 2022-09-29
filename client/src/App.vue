<template>
  <div id="app" :style="{ 'margin-left' : sidebarWidth }">
    <h1 class="border" style="padding-bottom: 0.5rem"> Trip Book </h1>
      <router-link to="/startpage"> Login </router-link>
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
h1 {
  text-align: center;
  font-weight: bold;
}

</style>
