<template>
  <div class="page">
    <div class="ImageLogo">
      <img src="@/assets/logo.png" class="logo" />
      <div class="intro">
        We help you find the <br />
        best places around the town. <br />
        <img src="@/assets/followSign.png" alt="lets goo!" />
        Bon Voyage!
      </div>
    </div>
    <log-in
      v-if="login"
      @change-to-signup="isUSer"
      @userLoggedIn="handlingUserLogin()"
      @placeLoggedIn="handlingPlaceLogin()"
    >
    </log-in>
    <user-account
      v-if="user"
      @change-to-place="isPlace"
      @change-to-login="loggingIn"
    >
    </user-account>
    <place-account
      v-if="place"
      @change-to-user="isUSer"
      @change-to-login="loggingIn"
    >
    </place-account>
  </div>
</template>

<script>
import PlaceAccount from '@/components1/PlaceAccount.vue'
import UserAccount from '@/components1/UserAccount.vue'
import LogIn from '@/components1/LogIn.vue'

export default {
  components: {
    PlaceAccount,
    UserAccount,
    LogIn
  },
  name: 'startpage',
  data() {
    return {
      message: 'none',
      user: false,
      place: false,
      login: true
    }
  },
  methods: {
    isUSer() {
      this.login = false
      this.user = true
      this.place = false
    },
    isPlace() {
      this.user = false
      this.place = true
      this.login = false
    },
    loggingIn() {
      this.user = false
      this.login = true
      this.place = false
    },
    handlingUserLogin() {
      this.$emit('userLoggedIn', true)
    },
    handlingPlaceLogin() {
      this.$emit('placeLoggedIn', true)
    }
  }
}
</script>

<style>
@media only screen and (max-width: 768px) {
  .page {
    padding: 5%;
  }
  .form {
    height: 550px;
    margin-left: 5%;
    margin-top: 5%;
    width: 90%;
  }
}
@media only screen and (min-width: 768px) and (max-width: 945px) {
  .page {
    padding: 10%;
  }
  .form {
    height: 500px;
    margin-left: 15%;
    margin-top: 5%;
    width: 70%;
  }
}
@media only screen and (min-width: 945px) and (max-width: 1145px) {
  .page {
    width: 100%;
    padding: 0;
    height: 100vh;
  }
  .form {
    height: 500px;
    float: left;
    margin-left: 10%;
    margin-top: 5%;
    width: 35%;
  }
  .ImageLogo {
    float: left;
    margin: 0%;
    width: 45%;
  }
}
@media only screen and (min-width: 1146px) {
  .page {
    height: 100vh;
  }
  .form {
    height: 500px;
    width: 30%;
    float: left;
  }
  .ImageLogo {
    float: left;
  }
}

.form {
  padding: 25px;
  padding-top: 50px;
  background-color: #ffffff;
  box-shadow: 10px 10px 8px #888888;
}
.form .btn {
  background-color: #c8b4d0;
  border: none;
  height: 50px;
  width: 100px;
  font-family: inter;
  font-size: 16px;
  float: left;
  margin: 10px;
  margin-top: 20px;
  border-radius: 0%;
}
.form .btn:hover {
  background-color: #c8b4d01e;
}
.form #Btn {
  background-color: #c8b4d0;
  border: none;
  height: 50px;
  width: 100px;
  font-family: inter;
  font-size: 16px;
}
.form #Btn:hover {
  background-color: #c8b4d01e;
}
.form #link {
  margin-left: 10px;
  background-color: white;
  border: 0px;
  color: blue;
  text-decoration: underline;
}
.inputs {
  margin: 10px;
  border-color: #f6eef0;
  border-style: double;
  width: 80%;
}
::placeholder {
  font-size: 11px;
  padding: 10px;
  color: gray;
}
h2 {
  font-weight: 100;
  text-shadow: 2px 2px 5px lightgray;
  font-family: inter;
  text-align: center;
}
.page {
  /* overflow-y: hidden; */
  background-color: #f6eef0;
  padding-top: 90px;
}
.info {
  text-align: left;
}
.logo {
  height: 90%;
  width: 80%;
  align-content: left;
}
.intro {
  text-align: left;
  font-size: 30px;
  padding-left: 25%;
  font-family: inter;
}
h1 {
  font-family: Inter;
  font-style: italic;
  text-align: left;
  padding: 5%;
}
.ImageLogo {
  top: 100px;
  left: 100px;
  padding: 3%;
}
</style>
