<template>
  <div class="page" style="body">
    <header> {{currentUser.email}} </header>
    <b-jumbotron header='Profile Page' lead='Nothing Yet' />
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

</style>
