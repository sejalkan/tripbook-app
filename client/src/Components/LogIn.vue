<template>
     <div class="form">
        <form>
            <h2> Sign In </h2> <br>
        <div class="info">
        <input type="text" id="username" name="username" placeholder="Username" v-model="username">
        <input type="password" id="password" name="password" minlength="8" placeholder="Password" v-model="password">
        <input type="button" class="Btn" name="logIn" value="Check in" v-on:click="loggingIn">
         <div id="checkIn">
             <button class="Btn" v-on:click=changeToSignUp> Sign up </button>
         </div>
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
      message: 'none'
    }
  },
  methods: {
    changeToSignUp() {
      this.$emit('change-to-signup')
    },
    loggingIn() {
      const user = {
        username: this.username,
        password: this.password
      }
      Api.post('/login', user)
        .then(res => {
          if (res.status === 200) {
            localStorage.setItem('token', res.data.token)
            alert('success')
            this.$router.push('/')
          }
        }, err => {
          console.log(err.response)
          this.error = err.response.data.error
        })
    }
  }
}
</script>

<style scoped>
    .form{
        height: 500px;
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
    .Btn{
        background-color:#c8b4d0;
        border: none;
        height: 50px;
        width: 100px;
        font-family: inter;
        font-size: 16px;
    }
    #checkIn {
        margin-top: 25px;
        padding: 20px;
        text-align: center;
    }
    input{
        margin: 20px;
        border-color: #f6eef0;
        border-style: double;
        width: 80%;
    }
    h2{
        font-family: inter;
        font-weight: 100;
    }
</style>
