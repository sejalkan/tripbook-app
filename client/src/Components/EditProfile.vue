<template>
    <div style="body">
      <div v-if="isUser" class="userInfo">
        <h1> Edit Profile </h1>
        <label class="label"> Username </label> <br>
        <label class="readOnly input" v-on:click="alerting"> {{currentUser.username}} </label> <br>

        <label class="label"> Email Address </label> <br>
        <label class="readOnly input" v-on:click="alerting"> {{currentUser.email}} </label> <br>

        <label class="label"> Bio </label> <br>
        <textarea type="text" class="inputBio" v-model="bio"> </textarea> <br>

        <label class="label"> New Password </label> <br>
        <input type="password" class="input" v-model="password"> <br>

        <label class="label"> Confirm new password </label> <br>
        <input type="password" class="input" v-model="confirmPassword"> <br>

        <button v-on:click="goBack" id="btn"> Cancel </button>
        <button id="btn" v-on:click="checkInput"> Save changes </button>
        <button id="btn" v-on:click="deleteAccount"> Delete account </button>
        </div>
        <div v-if="isPlace"  class="userInfo">
        <h1> Edit Profile </h1>
        <label class="label"> Username </label> <br>
        <label class="readOnly input" v-on:click="alerting"> {{currentUser.username}} </label> <br>

        <label class="label"> Email Address </label> <br>
        <label class="readOnly input" v-on:click="alerting"> {{currentUser.email}} </label> <br>

        <label class="label"> Organisation name </label> <br>
        <input type="text" class="input" v-model="organisationName"> <br>

        <label class="label"> Address </label> <br>
        <input type="text" class="input" v-model="address"> <br>
        <label class="label"> Bio </label> <br>
        <textarea type="text" class="inputBio" v-model="bio"> </textarea> <br>

        <label class="label"> New Password </label> <br>
        <input type="password" class="input" v-model="password"> <br>

        <label class="label"> Confirm new password </label> <br>
        <input type="password" class="input" v-model="confirmPassword"> <br>

        <button v-on:click="goBack" id="btn"> Cancel
        </button>
        <button id="btn" v-on:click="checkInput"> Save changes </button>
        <button id="btn" v-on:click="deleteAccount"> Delete account </button>
        </div>
    </div>
</template>
<script>
import { Api } from '@/Api'
export default {
  props: { currentUser: Object },
  name: 'editingProfile',
  data() {
    return {
      isUser: '',
      isPlace: '',
      bio: '',
      password: '',
      confirmPassword: '',
      organisationName: '',
      address: ''
    }
  },
  mounted() {
    if (localStorage.getItem('user')) {
      this.isUser = true
    } else if (localStorage.getItem('place')) {
      this.isPlace = true
    }
  },
  methods: {
    goBack() {
      this.$emit('change-to-profile')
    },
    saveChanges() {
      const id = this.currentUser.id
      let route = '/users/' + id
      let updatedUser = {
        bio: this.bio,
        password: this.password
      }
      if (this.isPlace) {
        route = '/places/' + id
        updatedUser = {
          bio: this.bio,
          password: this.password,
          placename: this.organisationName,
          address: this.address
        }
      }
      Api.patch(route, updatedUser)
        .then((response) => {
          alert('success')
          this.goBack()
        })
        .catch(function (error) {
          alert(error)
        })
    },
    checkInput() {
      if (this.password || this.bio || this.organisationName) {
        if (this.password) {
          if (!this.confirmPassword) {
            alert('Please confirm password')
          } else if (this.password !== this.confirmPassword) {
            alert('Passwords do not match')
          } else {
            this.saveChanges()
          }
        } else {
          this.saveChanges()
        }
      } else {
        alert('No changes were made!')
      }
    },
    alerting() {
      alert('can not be changed')
    },
    deleteAccount() {
      const id = this.currentUser.id
      let route = '/users/' + id
      if (this.isPlace) {
        route = '/places/' + id
      }
      Api.delete(route)
        .then((response) => {
          localStorage.removeItem('token')
          localStorage.removeItem('user')
          alert('Deleted')
          this.$router.go(0)
        })
        .catch(function (error) {
          alert(error.response)
        })
    }
  }
}
</script>
<style scoped>
.label{
  color: grey;
  margin-left: 20px;
  font-size: 13px;
}
.readOnly {
    background-color: white;
    border: 1px solid lightgray;
    height: 30px;
    padding: 2px;
    color: gray;
}
.userInfo {
    border: 1px solid black;
    margin: 25px;
    margin-top: 5px;
    margin-bottom: 5%;
    background-color: #f6eef0;
}
.input{
  margin-left: 20px;
  margin-bottom: 15px;
  width:80%;
  padding-left: 5px;
  font-size: 13px;
}
h1 {
    font-family: inter;
     text-shadow: 2px 2px 8px #888888;
     font-size: 20px;
}
.inputBio{
  margin-left: 20px;
  margin-bottom: 15px;
  width: 80%;
  height: 100px;
  padding:10px;
  font-size: 13px;
}

#btn{
  height: 30px;
  width: 100px;
  font-family: inter;
  font-size: 13px;
  color: white;
  background-color:#4c3d40;
  margin-left: 20px;
  margin-top: 10px;
  margin-bottom: 10px;
}

@media only screen and (min-device-width: 768px)
  and (max-device-width: 1600px)
  and (-webkit-min-device-pixel-ratio: 1) {
    h1 {
    font-family: inter;
     text-shadow: 2px 2px 8px #888888;
     font-size: 25px;
    }
    .userInfo {
    border: 1px solid black;
    margin: 25%;
    margin-top: 10px;
    margin-bottom: 10%;
    background-color: #f6eef0;
}

  }
</style>
