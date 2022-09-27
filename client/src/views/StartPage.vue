<template>
  <div class="page">
        <h1>TripBook</h1>
        <div class="form">
            <place-account v-if="place" @change-to-user="isUSer"> </place-account>
            <user-account v-else-if="user" @change-to-place="isPlace"></user-account>
        </div>
        <img src="client\src\assests\Mitt projekt.png" class="logo">
        <p class="intro">
            TripBook helps you find the <br> best places around the town. <br>
            Bon Voyage!
         </p>
    </div>
</template>

<script>
import PlaceAccount from '@/components/PlaceAccount.vue'
import UserAccount from '@/components/UserAccount.vue'

export default {
  components: {
    PlaceAccount,
    UserAccount
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
        height: 30%;
        width: 30%;
    }
    .intro{
        text-align: left;
        font-size: 30px;
        padding: 30px
    }
    h1{
        font-family: Inter;
        font-style: italic;
    }

</style>
