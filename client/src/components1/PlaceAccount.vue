<template>
  <div class="form">
    <form>
      <h2>Create Organisation Account</h2>
      <br />
      <p class="info">
        <button id="link" v-on:click="changeToUser">Are you a user?</button>
        <input
          type="text"
          class="inputs"
          name="username"
          v-model="username"
          placeholder="Username"
          required="required"
        />
        <input
          type="text"
          class="inputs"
          name="name"
          v-model="placename"
          placeholder="Organisation name"
          required="required"
        />
        <input
          type="text"
          class="inputs"
          name="emailID"
          v-model="email_address"
          placeholder="Email Address"
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
          v-on:click="postPlace"
        />
        <input
          type="button"
          class="btn"
          name="cancel"
          value="Sign in"
          v-on:click="changeToLogin"
        />
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
      show: true,
      errors: []
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
      if (
        this.username &&
        this.placename &&
        this.email_address &&
        this.password
      ) {
        if (this.password.length < 8) {
          this.errors.length = 0
          this.errors.push('Password must be at least 8 characters')
          alert('Fix the following problem(s): \n' + this.errors)
        } else {
          const newPlace = {
            placename: this.placename,
            email_address: this.email_address,
            password: this.password,
            bio: this.bio,
            placeType: this.placeType,
            address: this.address,
            username: this.username
          }
          Api.post('/places', newPlace)
            .then((response) => {
              this.newPlace = response.data
              console.log(response.data)
              alert('success')
              this.$router.push('/startpage')
            })
            .catch(function (error) {
              this.newPlace = error
              alert(error.response)
            })
          this.username = null
          this.email_address = null
          this.password = null
          this.bio = null
          this.placeType = null
          this.placename = null
          this.address = null
        }
      } else {
        this.errors.length = 0
        if (!this.username) this.errors.push('Username required \n')
        if (!this.placename) this.errors.push('Place name required \n')
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
}
</style>
