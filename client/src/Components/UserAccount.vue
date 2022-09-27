<template>
        <div class="form">
        <form>
            <h2> Create User Account </h2> <br>
            <p class="info">
        <label for="username">Username </label>
        <input type="text" id="username" name="username"><br>

        <label for="emailID">Email Address </label>
        <input type="text" id="emailID" name="emailID" v-model="emailID"><br>

        <label for="password">Password </label>
        <input type="password" id="password" name="password" minlength="8" v-model="password"><br>

        <label for="bio">My Bio </label>
        <input type="text" id="bio" name="bio" size="12" v-model="bio"><br>

        <label for="profilePicture">Profile Picture </label>
        <input type="file" id="profilePicture" name="profilePicture" accept="image/*"><br>

        <label for="username">Username </label>
        <input type="text" id="username" name="username" v-model="username"><br> <br>
        <a href="/startpage/placeAccount" v-on:click=changeToPlace>Are you an organisation?</a> <br> <br> <br>
        <input type="button" class="submitBtn" name="submit" value="Submit" v-on:click="createUser"> <br>
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
      users: { username: '', password: '', bio: '', emailID: '' },
      show: true
    }
  },
  methods: {
    createUser() {
      Api.post('/users')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    },
    changeToPlace() {
      this.$emit('change-to-place')
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
        background-color: #ffffff;
        text-align: right;
        position: fixed;
        bottom: 175px;
        right: 200px;
        border: 3px solid #c8b4d0;

    }
    .submitBtn{
        background-color:#c8b4d0;
        border: none;
        height: 50px;
        width: 100px;
    }
    .cancelBtn{
        background-color: #c8b4d0;
        border: none;
    }
    input{
        border-color: #f6eef0;
        border-style: double;
    }
    label{
        font-family: Inter;
        font-size: 16px;
    }
    h2{
        font-family: Inter;
    }
</style>
