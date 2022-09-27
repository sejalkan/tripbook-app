<template>
    <div class="sidebar" :style="{ width: sidebarWidth }">
      <h1>
        <span v-if="collapsed">
          <div class="logo">
            <img src="@/assets/Mitt_projekt_cropped_bw.png" />
          </div>
        </span>
        <span class="header" v-else>Trip Book</span>
      </h1>

      <SidebarLink to='/' icon='fa-solid fa-house'> Home </SidebarLink>
      <SidebarLink to='/explore' icon='fa-solid fa-magnifying-glass-location'> Explore </SidebarLink>
      <SidebarLink to='/newPost' icon='fa-regular fa-square-plus'> New Post </SidebarLink>
      <SidebarLink to='/myTripBook' icon='fa-solid fa-book-open'> My Trip Book </SidebarLink>
      <SidebarLink to='/profile' icon='fa-solid fa-user'> Profile </SidebarLink>

      <span
        class='collapse-icon'
        :class="{ 'rotate-180' : collapsed }"
        @click='toggleSidebar'
      >
        <i class='fa-solid fa-angles-left'  />
      </span>
    </div>
</template>

<script>
import { collapsed, toggleSidebar, sidebarWidth } from './state'
import SidebarLink from './SidebarLink.vue'
export default {
  props: {},
  components: { SidebarLink },
  setup() {
    return { collapsed, toggleSidebar, sidebarWidth }
  }
}

</script>

<style>
:root {
    --sidebar-bg-color: #4C3D40;
    --sidebar-item-hover: #7f6c97;
    --sidebar-item-active: #C8B4D0;
}
</style>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  margin-bottom: 6rem;
  width: 2rem;
}
.logo {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 11rem;
}
.sidebar {
    color: white;
    background-color: var(--sidebar-bg-color);

    float: left;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
    bottom: 0;
    padding: 1em;

    transition: 0.3s ease;

    display: flex;
    flex-direction: column;
}

.collapse-icon {
  position: absolute;
  bottom: 0;
  padding: 0.30em;
  color: white;
  transition: 0.2s linear;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>
