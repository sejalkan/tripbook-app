<template>
  <div class="row justify-content-center">
    <b-jumbotron header="Trip Book" lead="Welcome to Trip Book">
      <b-button class="btn_message" variant="primary" v-on:click="getMessage()" >Click Me!</b-button>
    </b-jumbotron>
  </div>
</template>

<script>
// @ is an alias to /src
// import { Api } from '@/Api'

export default {
  name: 'home',
  data() {
    return {
      message: 'none'
    }
  },
  methods: {
    getMessage() {
      alert('Hey')
    }
  }
}
</script>

<style>
.btn_message {
  margin-bottom: 1em;
}
</style>
