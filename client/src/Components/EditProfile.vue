<template>
    <div style="body">
      <form class="userInfo">
        <h1> My Profile </h1>
        <label class="label"> Username </label> <br>
        <input type="label" class="input" readonly> <br>

        <label class="label"> Email Address </label> <br>
        <input type="label" class="input" readonly> <br>

        <label class="label"> Bio </label> <br>
        <input type="text" class="inputBio"> <br>

        <label class="label"> New Password </label> <br>
        <input type="text" class="input"> <br>

        <label class="label"> Confirm new password </label> <br>
        <input type="text" class="input"> <br>

        <button v-on:click="goBack" id="btn"> Cancel
        </button>
        <button id="btn"> Save changes </button>
        </form>
        {{isUser}}
    </div>
</template>
<script>
export default {
  props: { currentUser: Object },
  name: 'editingProfile',
  data() {
    return {
      isUser: '',
      isPlace: ''
    }
  },
  methods: {
    goBack() {
      this.$emit('change-to-profile')
    }
  }
}
</script>
<style scoped>
.label{
  color: grey;
  margin-left: 20px;
}
.input{
  margin-left: 20px;
  margin-bottom: 15px;
  width: 20%;
}

.inputBio{
  margin-left: 20px;
  margin-bottom: 15px;
  width: 20%;
  height: 50px;
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
