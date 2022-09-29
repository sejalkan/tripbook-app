import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Explore from './views/Explore.vue'
import NewPost from './views/NewPost.vue'
import Profile from './views/Profile.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },

    {
      path: '/explore',
      name: 'explore',
      component: Explore
    },

    {
      path: '/newpost',
      name: 'newpost',
      component: NewPost
    },

    {
      path: '/profile',
      name: 'profile',
      component: Profile
    }
  ]
})
