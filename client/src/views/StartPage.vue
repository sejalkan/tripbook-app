<template>
  <div class="page">
     <div class="ImageLogo">
        <img src="@/assets/logo.png" class="logo">
        <div class="intro">
            We help you find the <br> best places around the town. <br>
            <img src="@/assets/followSign.png" alt="lets goo!">
            Bon Voyage!
        </div>
         </div>
        <div class="form">
          <log-in v-if="login" @change-to-signup=isUSer @userLoggedIn=handlingUserLogin() @placeLoggedIn=handlingPlaceLogin()> </log-in>
          <user-account v-if="user" @change-to-place=isPlace @change-to-login=loggingIn> </user-account>
          <place-account v-if="place" @change-to-user=isUSer  @change-to-login=loggingIn> </place-account>
            </div>
        </div>
</template>

<script>
import PlaceAccount from '@/components/PlaceAccount.vue'
import UserAccount from '@/components/UserAccount.vue'
import LogIn from '@/components/LogIn.vue'

export default {
  components: {
    PlaceAccount,
    UserAccount,
    LogIn
  },
  name: 'startpage',
  data() {
    return {
      message: 'none',
      user: false,
      place: false,
      login: true
    }
  },
  methods: {
    isUSer() {
      this.login = false
      this.user = true
      this.place = false
    },
    isPlace() {
      this.user = false
      this.place = true
      this.login = false
    },
    loggingIn() {
      this.user = false
      this.login = true
      this.place = false
    },
    handlingUserLogin() {
      this.$emit('userLoggedIn', true)
    },
    handlingPlaceLogin() {
      this.$emit('placeLoggedIn', true)
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
        /* overflow-y: hidden; */
        background-color: #f6eef0;
        padding-top: 90px;
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
        padding-left: 25%;
        font-family: inter;
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
