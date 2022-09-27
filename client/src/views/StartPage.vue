<template>
  <div class="page">
        <div class="form">
            <place-account v-if="place" @change-to-user="isUSer"> </place-account>
            <user-account v-else-if="user" @change-to-place="isPlace"></user-account>
            <log-in/>
        </div>
        <div class="ImageLogo">
        <img src="@/assests/logo.png" class="logo">
         <br> <br>
        <p class="intro">
            We help you find the <br> best places around the town. <br>
            <img src="@/assests/followSign.png" alt="lets goo!">
            Bon Voyage!
         </p>
         </div>
    </div>
</template>

<script>
import PlaceAccount from '@/Components/PlaceAccount.vue'
import UserAccount from '@/Components/UserAccount.vue'
import LogIn from '@/Components/LogIn.vue'

export default {
  components: {
    PlaceAccount,
    UserAccount,
    LogIn
  },
  name: 'start page',
  data() {
    return {
      message: 'none',
      user: true,
      place: false,
      login: false,
      signUp: true,
      currentComponent: null
    }
  },
  methods: {
    isUSer() {
      this.currentComponent = UserAccount
    },
    isPlace(newComponent) {
      this.currentComponent = newComponent
    }
  }
}
</script>
<style>
 h2{
        text-align: center;
    }
.page{
        height: 100vh;
        overflow-x: hidden;
        background-color: #f6eef0;
    }
     .info{
        text-align: left;
    }
    .logo{
        height: 90%;
        width: 80%;
        align-content: left;
    }
    .intro{
        text-align: left;
        font-size: 30px;
        padding: 25px
    }
    h1{
        font-family: Inter;
        font-style: italic;
        text-align: left;
        padding: 5%;
    }
    .ImageLogo{
      top: 100px;
      left: 100px;
      float: left;
      padding: 3%;
    }

</style>
