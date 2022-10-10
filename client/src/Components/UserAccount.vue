<template>
        <div class="form">
            <h2> Create User Account </h2> <br>
            <p class="info">
        <button id="link" v-on:click=changeToPlace>Are you an organisation?</button>
        <input type="text" id="username" name="username" placeholder="Username" v-model="username" required="required">
        <input type="text" id="email_address" name="emailID" v-model="email_address" placeholder="Email address" required="required">
        <input type="password" id="password" name="password" minlength="8" v-model="password" placeholder="Password" required="required">
        <input type="text" id="bio" name="bio" size="12" v-model="bio" placeholder="Bio.."><br>
        <label for="profilePicture">Profile Picture </label>
        <input type="file" id="profilePicture" name="profilePicture" accept="image/*"><br>
         <input type="button" class="btn" name="submit" value="Submit" v-on:click="postUser">
          <input type="button" class="btn" name="cancel" value="Sign in" v-on:click=changeToLogin>
            </p>
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
      show: true,
      errors: []
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
      if (this.username && this.email_address && this.password) {
        if (this.password.length < 8) {
          this.errors.length = 0
          this.errors.push('Password must be at least 8 characters \n')
          alert('Fix the following problem(s): \n' + this.errors)
        } else {
          const newUser = {
            username: this.username,
            email_address: this.email_address,
            password: this.password,
            bio: this.bio
          }
          Api.post('/users', newUser)
            .then((response) => {
              this.newUser = response.data
              console.log(response.data)
              alert('success')
              this.$router.push('/startpage')
            })
            .catch(function (error) {
              this.newUser = error
            })
          this.username = null
          this.email_address = null
          this.password = null
          this.bio = null
        }
      } else {
        this.errors.length = 0
        if (!this.username) this.errors.push('Username required \n')
        if (!this.email_address) this.errors.push('Email address required \n')
        if (!this.password) this.errors.push('Password required \n')
        alert('Please fix the following problem(s): \n' + this.errors)
      }
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
        float: left;
        box-shadow: 10px 10px 8px #888888;
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
        text-shadow: 2px 2px 5px lightgray;
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
