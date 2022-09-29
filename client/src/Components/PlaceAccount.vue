<template>
        <div class="form">
        <form>
            <h2> Create Organisation Account </h2> <br>
            <p class="info">
              <button id="link" v-on:click=changeToUser>Are you a user?</button>
        <input type="text" id="username" name="username" v-model="username" placeholder="Username">
        <input type="text" id="name" name="name" v-model="placename" placeholder="Organisation name">
        <input type="text" id="emailID" name="emailID" v-model="email_address" placeholder="Email Address">
        <input type="password" id="password" name="password" minlength="8" v-model="password" placeholder="Password">
        <input type="text" id="bio" name="bio" size="12" v-model="bio" placeholder="Bio.."><br>
        <label for="profilePicture">Profile Picture </label>
        <input type="file" id="profilePicture" name="profilePicture" accept="image/*"><br>
        <input type="button" class="btn" name="submit" value="Submit" v-on:click="postPlace">
        <input type="button" class="btn" name="cancel" value="Sign in" v-on:click=changeToLogin>
            </p>
        </form>
        </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'placeAccount',
  data() {
    return {
      username: '',
      email_address: '',
      password: '',
      bio: '',
      placeType: '',
      address: '',
      placename: '',
      show: true
    }
  },
  methods: {
    changeToUser() {
      this.$emit('change-to-user')
    },
    changeToLogin() {
      this.$emit('change-to-login')
    },
    postPlace() {
      const newPlace = {
        placename: this.placename,
        email_address: this.email_address,
        password: this.password,
        bio: this.bio,
        placeType: this.placeType,
        address: this.address,
        username: this.username
      }
      this.username = null
      this.email_address = null
      this.password = null
      this.bio = null
      this.placeType = null
      this.placename = null
      this.address = null

      Api.post('/places', newPlace)
        .then((response) => {
          this.newPlace = response.data
          console.log(response.data)
          alert('success')
        })
        .catch(function (error) {
          this.newPlace = error
        })
    }
  }
}
</script>

<style scoped>
    .form{
      height: 580px;
        width: 30%;
        float: right;
        padding: 25px;
        padding-top: 50px;
        background-color: #ffffff;
        text-align: right;
        position: absolute;
        right: 200px;
        overflow-y: hidden;
    }
     ::placeholder{
        font-size:11px;
        padding: 10px;
        color: gray;
    }
    .btn{
        background-color:#c8b4d0;
        border: none;
        height: 50px;
        width: 100px;
        font-family: inter;
        font-size: 16px;
        float: left;
        margin-right: 20px;
    }
    input{
        margin: 10px;
        border-color: #f6eef0;
        border-style: double;
        width: 80%;
    }
    label{
         margin-left: 10px;
       margin-bottom: -10px;
        font-family: Inter;
        font-size: 16px;
    }
    h2{
        font-family: Inter;
    }
     #link{
      margin-left: 10px;
      background-color: white;
      border: 0px;
      color: blue;
      text-decoration: underline;
    }
</style>
