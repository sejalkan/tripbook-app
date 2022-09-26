import Vue from 'vue'
import Router from 'vue-router'
import UserAccount from './Components/UserAccount.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'userAccount',
      component: UserAccount
    }
  ]
})
