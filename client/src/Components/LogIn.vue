<template>
     <div class="form">
        <form>
            <h2> Sign In </h2> <br>
        <div class="info">
        <input type="text" name="username" class="inputs" placeholder="Username" v-model="username">
        <input type="password" name="password" minlength="8" class="inputs" placeholder="Password" v-model="password"> <br>
         <p> Check the box if you are an organisation</p>
         <input type="checkbox" class="checkbox" v-model="checkb" v-on:click=checking> <br>
        <input type="button" id="Btn" class="inputs" name="logIn" value="Check in" v-on:click="loggingIn">
        <button id="Btn" class="inputs" v-on:click=changeToSignUp> Sign up </button>
        </div>
        </form>
        </div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'logIn',
  data() {
    return {
      username: '',
      password: '',
      checkb: '',
      errors: [],
      check: false,
      user: ''
    }
  },
  methods: {
    changeToSignUp() {
      this.$emit('change-to-signup')
    },
    loggingIn() {
      if (this.username && this.password) {
        const user = {
          username: this.username,
          password: this.password
        }
        let route = '/userLogin'
        if (this.check === true) {
          route = '/placeLogin'
        }
        Api.post(route, user)
          .then(res => {
            if (res.status === 200) {
              localStorage.setItem('token', res.data.token)
              this.user = res.data.user
              console.log(this.user)
              alert('success')
              this.$emit('loggedIn', true)
              this.$router.push('/')
            }
          }, err => {
            alert(err + '\n Invalid credentials')
            this.error = err.res.data.error
          })
      } else {
        this.errors.length = 0
        if (!this.username) this.errors.push('Username is empty \n')
        if (!this.password) this.errors.push('Password is empty \n')
        alert('Please fix the following problem(s): \n' + this.errors)
      }
    },
    checking() {
      if (this.check === false) {
        this.check = true
      } else {
        this.check = false
      }
    },
    returnUser() {
      return this.user
    }
  }
}
</script>

<style scoped>
    .form{
        height: 460px;
        width: 30%;
        padding: 25px;
        padding-top: 50px;
        background-color: #ffffff;
        float: left;
    }
    ::placeholder{
        font-size:11px;
        padding: 10px;
        color: gray;
    }
    #Btn{
        background-color:#c8b4d0;
        border: none;
        height: 50px;
        width: 100px;
        font-family: inter;
        font-size: 16px;
    }
    .inputs {
        margin: 20px;
        border-color: #f6eef0;
        border-style: double;
        width: 80%;
    }
    p {
      margin-left: 20px;
      font-size: 12px;
      text-decoration: underline;
    }
    .checkbox {
      margin-left: 20px;
    }
    h2{
        font-family: inter;
        font-weight: 100;
    }
</style>
