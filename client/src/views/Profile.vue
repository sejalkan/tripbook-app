<template>
  <div class="profilePage" style="body">
    <div class="form">
    <h1> My Profile </h1>
    <!-- <b-jumbotron header='Profile Page' lead='Nothing Yet' /> -->
    <input type="button" class="editBtn" value="Edit"> <br> <br>
    <label class="l1"> Username </label>
    <input type="label" v-bind:value="currentUser.username" class="username" readonly> <br>
    <label class="l1"> Email </label>
    <input type="label" v-bind:value="currentUser.email" class="email" readonly> <br>
    <label class="l1"> Profile Picture </label>
    <img v-bind:src="currentUser.profilePicture" class="profilePicture" readonly> <br>
    <label class="l1"> Bio </label>
    <input type="label" v-bind:value="currentUser.bio" class="bio" readonly> <br> <br>
    <a href="/edit" class="changePass"> Change password </a>
    </div>
  </div>
</template>

<script>
export default {
  props: { currentUser: Object },
  created() {
    if (localStorage.getItem('token') === null) {
      this.$router.push('/startpage')
    }
  },
  mounted() {
    if (localStorage.getItem('token')) {
      console.log(this.currentUser)
    }
  }
}
</script>

<style scoped>
body {
    background: black;
}
.profilePage{
  background-color: #f6eef0;
  overflow-y: hidden;
  height: 100vh;
  padding: 5%;
}
.form{
  height: 700px;
  width: 50%;
  padding: 25px;
  padding-top: 50px;
  background-color: #ffffff;
  float: left;

}
.editBtn{
  background-color: #c8b4d0;
  border: none;
  height: 40px;
  width: 70px;
  font-family: inter;
  font-size: 16px;
  margin-left: 20px;
}

h1{
  margin-bottom: 0%;
}

.username{
  border-color: #f6eef0;
  border-style: double;
  width: 50%;
  height: 35px;
}

.bio{
  border-color: #f6eef0;
  border-style: double;
  width: 50%;
  height: 35px;
}

.email{
  border-color: #f6eef0;
  border-style: double;
  width: 50%;
  height: 35px;
}

.profilePicture{
  border-color: #f6eef0;
  border-style: double;
}

.l1{
  color: grey;
  margin: 20px;
}

.changePass{
  margin: 20px;
}

</style>
