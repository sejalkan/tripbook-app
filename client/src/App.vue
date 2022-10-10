<template>
  <div id="app">
    <div v-if="loggedIn" :style="{ 'margin-left' : sidebarWidth }">
      <Sidebar/>
    <!-- Render the content of the current page view -->
    <router-view v-bind:currentUser="currentUser"/>
    </div>
    <div v-else>
      <start-page @userLoggedIn=handleUserLogin() @placeLoggedIn=handlePlaceLogin()> </start-page>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
import Sidebar from './components/sidebar/Sidebar.vue'
import { sidebarWidth } from './components/sidebar/state'
import StartPage from './views/StartPage.vue'
export default {
  components: { Sidebar, StartPage },
  setup() {
    return { sidebarWidth }
  },
  data() {
    return {
      loggedIn: true,
      currentUser: ''
    }
  },
  created() {
    if (localStorage.getItem('user')) {
      this.getCurrentUser()
    } else if (localStorage.getItem('place')) {
      this.getCurrentPlace()
    }
  },
  mounted() {
    if (localStorage.getItem('token') === null) {
      this.loggedIn = false
      this.$router.push('/login')
    } else {
      this.loggedIn = true
    }
  },
  updated() {
    if (localStorage.getItem('token') === null) {
      this.loggedIn = false
    }
  },
  methods: {
    getCurrentUser() {
      Api.get('/LoggedInUser', {
        headers: { token: localStorage.getItem('token') }
      }).then((res) => {
        this.currentUser = res.data.user
        localStorage.setItem('user', res.data.user)
      })
    },
    getCurrentPlace() {
      Api.get('/LoggedInPlace', {
        headers: { token: localStorage.getItem('token') }
      }).then((res) => {
        this.currentUser = res.data.place
        localStorage.setItem('place', res.data.place)
      })
    },
    handleUserLogin() {
      this.loggedIn = true
      this.getCurrentUser()
    },
    handlePlaceLogin() {
      this.loggedIn = true
      this.getCurrentPlace()
    }
  }
}
</script>

<style>
</style>
