<template>
  <div>
    <p> Posts from people and places you follow </p>
    <div class="row justify-content-center" style="padding: 2rem" v-for="post in posts" v-bind:key="post._id">
      <b-card style="card" header-tag="header" footer-tag="footer">
      <template #header>
        <h6 class="mb-0">{{post._id}}</h6>
      </template>
      <img src='@/assets/sepehr-moradian-XdtUEWzdU0A-unsplash.jpg' />
      <template #footer>
        <em><Post v-bind:post='post'/></em>
      </template>
      </b-card>
      <p></p>
    </div>
  </div>
</template>

<script>
import Post from '../components/Post.vue'
import { Api } from '@/Api'
export default {
  name: 'posts',
  components: { Post },
  props: { currentUser: Object },
  created() {
    if (localStorage.getItem('token') === null) {
      this.$router.push('/startpage')
    }
  },
  mounted() {
    Api.get('/posts')
      .then(response => {
        console.log(response.data)
        this.posts = response.data.posts
      })
      .catch(error => {
        console.error(error)
        this.post = []
        // display error
      })
      .then(() => {
        console.log('This runs every time after success or error.')
      })
  },
  data() {
    return {
      posts: []
    }
  }
}
</script>

<style scoped>
.header {
  text-align: center;
  font-weight: bold;
  border-top: 0ch;
}

p {
  font-weight: bold;
  text-align: center;
}

img {
  max-height: 600px;
  max-width: 800px;
}

.card {
  min-width: 800px;
  min-height: 600px;
}
</style>
