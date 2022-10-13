<template>
  <div class="form">
    <h2>Create User Account</h2>
    <br />
    <p class="info">
      <button id="link" v-on:click="changeToPlace">
        Are you an organisation?
      </button>
      <input
        type="text"
        class="inputs"
        name="username"
        placeholder="Username"
        v-model="username"
        required="required"
      />
      <input
        type="text"
        class="inputs"
        name="emailID"
        v-model="email_address"
        placeholder="Email address"
        required="required"
      />
      <input
        type="password"
        class="inputs"
        name="password"
        minlength="8"
        v-model="password"
        placeholder="Password"
        required="required"
      />
      <input
        type="text"
        class="inputs"
        name="bio"
        size="12"
        v-model="bio"
        placeholder="Bio.."
      /><br />
      <input
        type="button"
        class="btn"
        name="submit"
        value="Submit"
        v-on:click="postUser"
      />
      <input
        type="button"
        class="btn"
        name="cancel"
        value="Sign in"
        v-on:click="changeToLogin"
      />
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
label {
  margin-left: 10px;
  margin-bottom: -10px;
  font-family: Inter;
  font-size: 16px;
  color: gray;
}
</style>
