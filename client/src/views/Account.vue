<!-- eslint-disable vue/no-parsing-error -->
<template>
    <div>
        <h1>Create Account</h1>
        <div height=50% width="50%">
        <label for="username">Username: </label>
        <input type="text" id="username" name="username"><br><br>

        <label for="emailID">Email Address: </label>
        <input type="text" id="emailID" name="emailID" placeholder="johnDoe@gmail.com"><br><br>

        <label for="password">Password: </label>
        <input type="password" id="password" name="password" minlength="8"><br><br>

        <label for="bio">My Bio: </label>
        <input type="text" id="bio" name="bio" placeholder="My travel story starts here!"><br><br>

        <label for="profilePicture">Profile Picture: </label>
        <input type="file" id="profilePicture" name="profilePicture" accept="image/*"><br><br>

        <label for="username">Username: </label>
        <input type="text" id="username" name="username"><br><br>

        <input type="button" id="submitBtn" class="submitBtn" name="submit" value="Submit" color="#c8b4d0"> <br> <br>
        <input type="button" id="cancelBtn" class="cancelBtn" name="cancelBtn" value="Cancel"><br>

        <a href="www.google.com">Are you an organisation?</a>
        </div>
    </div>
</template>

<script>
// @ is an alias to /src
import { Api } from '@/Api'

export default {
  name: 'account',
  data() {
    return {
      message: 'none'
    }
  },
  methods: {
    getMessage() {
      Api.get('/')
        .then(response => {
          this.message = response.data.message
        })
        .catch(error => {
          this.message = error
        })
    }
  }
}
</script>

<style scoped>

div{
  height: 570px;
  background-color: #f6eef0;
}
label{
  text-align: left;
  color: #4c3d40 ;
}
.submitBtn{
  background-color:#c8b4d0;
  border: none;
}
.cancelBtn{
  background-color: #c8b4d0;
  border: none;
}

</style>
