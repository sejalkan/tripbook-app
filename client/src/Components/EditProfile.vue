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

        <button v-on:click="goBack" id="btn"> Cancel
        </button>
        <button id="btn" v-on:click="checkInput"> Save changes </button>
        <button id="btn" v-on:click="deleteAccount"> Delete account </button>
        </div>
        <div v-if="isPlace">
            <h1> Edit Profile </h1>
        <label class="label"> Username </label> <br>
        <label class="readOnly input" v-on:click="alerting"> {{currentUser.username}} </label> <br>

        <label class="label"> Email Address </label> <br>
       <label class="readOnly input" v-on:click="alerting"> {{currentUser.email}} </label> <br>

       <label class="label"> Organisation name </label> <br>
        <input type="text" class="input" v-model="organisationName"> <br>

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
      isUser: true,
      isPlace: '',
      bio: '',
      password: '',
      confirmPassword: '',
      organisationName: ''
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
          placename: this.organisationName
        }
      }
      Api.patch(route, updatedUser)
        .then((response) => {
          alert('success')
          this.goBack()
        })
        .catch(function (error) {
          alert(error.response)
        })
    },
    checkInput() {
      if (this.password || this.bio || this.organisationName) {
        if (this.password) {
          if (!this.confirmPassword) {
            alert('Please confirm password')
          } else if (!this.password === this.confirmPassword) {
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
    margin: 25%;
    margin-top: 5%;
    margin-bottom: 0;
    background-color: #f6eef0;
    box-shadow: 10px 15px 15px #888888;
}
.input{
  margin-left: 20px;
  margin-bottom: 15px;
  width:40%;
  padding-left: 5px;
}
h1 {
    font-family: inter;
     text-shadow: 2px 2px 8px #888888;
}
.inputBio{
  margin-left: 20px;
  margin-bottom: 15px;
  width: 50%;
  height: 100px;
  padding:10px;
}

#btn{
  height: 35px;
  width: 100px;
  font-family: inter;
  font-size: 13px;
  color: white;
  background-color:#4c3d40;
  margin: 20px;
}

</style>
