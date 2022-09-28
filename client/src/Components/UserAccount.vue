<template>
        <div class="form">
        <form class="userFrom">
            <h2> Create User Account </h2> <br>
            <p class="info">
        <button id="link" v-on:click=changeToPlace>Are you an organisation?</button>
        <input type="text" id="username" name="username" placeholder="Username" v-model="username">
        <input type="text" id="email_address" name="emailID" v-model="email_address" placeholder="Email address">
        <input type="password" id="password" name="password" minlength="8" v-model="password" placeholder="Password">
        <input type="text" id="bio" name="bio" size="12" v-model="bio" placeholder="Bio.."><br>
        <label for="profilePicture">Profile Picture </label>
        <input type="file" id="profilePicture" name="profilePicture" accept="image/*"><br>
         <input type="button" class="btn" name="submit" value="Submit" v-on:click="postUser">
          <input type="button" class="btn" name="cancel" value="Sign in" v-on:click=changeToLogin>
            </p>
        </form>
        </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'userAccount',
  data() {
    return {
      username: '',
      email_address: '',
      password: '',
      bio: '',
      show: true
    }
  },
  methods: {
    changeToPlace() {
      this.$emit('change-to-place')
    },
    changeToLogin() {
      this.$emit('change-to-login')
    },
    postUser() {
      const newUser = {
        username: this.username,
        email_address: this.email_address,
        password: this.password,
        bio: this.bio
      }
      this.username = null
      this.email_address = null
      this.password = null
      this.bio = null

      Api.post('/users', newUser)
        .then((response) => {
          this.newUser = response.data
          console.log(response.data)
          alert('success')
        })
        .catch(function (error) {
          this.newUser = error
        })
    }
  }
}
</script>

<style scoped>
    .form{
      height: 550px;
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
    label{
        font-size:11px;
        color: gray;
    }
</style>
