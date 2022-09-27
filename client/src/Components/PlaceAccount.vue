<template>
        <div class="form">
        <form>
            <h2> Create Organisation Account </h2> <br>
            <p class="info">
        <label for="username">Username </label>
        <input type="text" id="username" name="username"><br>

        <label for="name">Organisation name </label>
        <input type="text" id="name" name="name" v-model="placeName"><br>

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
        <a href="/startpage/UserAccount" v-on:click=changeToUser>Are you a user?</a> <br> <br> <br>
        <input type="button" class="submitBtn" name="submit" value="Submit" v-on:click="createPlace"> <br>
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
      users: { username: '', password: '', bio: '', emailID: '', placeName: '' },
      show: true
    }
  },
  methods: {
    createPlace() {
      Api.post('/places')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    },
    changeToUser() {
      this.$emit('change-to-user')
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
