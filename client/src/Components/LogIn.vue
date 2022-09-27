<template>
     <div class="form">
        <form>
            <h2> Sign In </h2> <br>
            <p class="info">
        <label for="username">Username </label>
        <input type="text" id="username" name="username"><br> <br>

        <label for="password">Password </label>
        <input type="password" id="password" name="password" minlength="8" v-model="password"><br> <br>
        <a href="/startpage/UserAccount"> New here? Create Account </a> <br> <br>
        <input type="button" class="loginBtn" name="logIn" value="LogIn"> <br>
        </p>
        </form>
        </div>
</template>

<script>

export default {
  name: 'logIn',
  data() {
    return {
      message: 'none'
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
    }
    .loginBtn{
        background-color:#c8b4d0;
        border: none;
        height: 50px;
        width: 100px;
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
