<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <h1>
      <span v-if="collapsed">
        <div class="logo">
          <img src="@/assets/Mitt_projekt_cropped_p.png" />
        </div>
      </span>
      <span class="header" v-else>
        <img src="@/assets/Mitt_projekt_p.png" />
      </span>
    </h1>

    <SidebarLink to="/" icon="fa-solid fa-house"> Home </SidebarLink>
    <SidebarLink to="/explore" icon="fa-solid fa-magnifying-glass-location">
      Explore
    </SidebarLink>
    <SidebarLink to="/newPost" icon="fa-regular fa-square-plus">
      New Post
    </SidebarLink>
    <SidebarLink to="/tripBook" icon="fa-solid fa-book-open">
      My Trip Book
    </SidebarLink>
    <SidebarLink to="/profile" icon="fa-solid fa-user"> Profile </SidebarLink>
    <button v-on:click="handleLogout" id="logoutButton">
      <SidebarLink to="/startpage" icon="fa-solid fa-arrow-right-from-bracket">
        Logout
      </SidebarLink>
    </button>

    <span
    v-if="!isMobile()"
      class="collapse-icon"
      :class="{ 'rotate-180': collapsed }"
      @click="toggleSidebar"
    >
      <i class="fa-solid fa-angles-left" />
    </span>
    <span v-else
    class="dash-icon">
      <i class="fa-solid fa-minus" />
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
  },
  methods: {
    handleLogout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('place')
      alert('Logged out!')
      this.$router.go(0)
    },

    isMobile() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style>
#logoutButton {
  background-color: transparent;
  border: none;
  color: white;
  margin: 0;
  padding-left: 0;
}
:root {
  --sidebar-bg-color: #4c3d40;
  --sidebar-item-hover: #7f6c97;
  --sidebar-item-active: #c8b4d0;
}
</style>

<style lang="scss" scoped>
.header {
  display: flex;
  flex-direction: column;
  margin-bottom: 7rem;
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
  padding: 0.9em;

  transition: 0.3s ease;

  display: flex;
  flex-direction: column;
}

.dash-icon {
  position: absolute;
  top: 28px;
  padding: 0.25em;
  color: white;
  transform: scale(2.5,1);
}

.collapse-icon {
  position: absolute;
  top: 40px;
  padding: 0.1em;
  color: white;
  transition: 0.2s linear;
  cursor: pointer;
}

.rotate-180 {
  transform: rotate(180deg);
  transition: 0.2s linear;
}
</style>
