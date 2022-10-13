<template>
  <div class="form">
    <h2>Sign In</h2>
    <br />
    <div class="info">
      <input
        type="text"
        name="username"
        class="inputs"
        placeholder="Username"
        v-model="username"
      />
      <input
        type="password"
        name="password"
        minlength="8"
        class="inputs"
        placeholder="Password"
        v-model="password"
      />
      <br />
      <p>Check the box if you are an organisation</p>
      <input
        type="checkbox"
        class="checkbox"
        v-model="checkb"
        v-on:click="checking"
      />
      <br />
      <input
        type="button"
        id="Btn"
        class="inputs"
        name="logIn"
        value="Check in"
        v-on:click="loggingIn"
      />
      <button id="Btn" class="inputs" v-on:click="changeToSignUp">
        Sign up
      </button>
    </div>
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
        Api.post(route, user).then(
          (res) => {
            if (res.status === 200) {
              localStorage.setItem('token', res.data.token)
              this.user = res.data.user
              console.log(this.user)
              alert('success')
              if (this.check === true) {
                this.$emit('placeLoggedIn', true)
              } else {
                this.$emit('userLoggedIn', true)
              }
              this.$router.push('/')
            }
          },
          (err) => {
            alert(err + '\n invalid credentials')
          }
        )
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
.inputs {
  margin: 20px;
}
p {
  margin-left: 20px;
  font-size: 12px;
  text-decoration: underline;
}
.checkbox {
  margin-left: 20px;
}
</style>
