<template>
  <div>
    <h1 class="border"> Hello  {{ currentUser.username }} !</h1>
    <p> Posts from people and places you follow </p>
    <div class="row justify-content-center" style="padding: 2rem" v-for="post in posts" v-bind:key="post._id">
      <b-card style="card" header-tag="header" footer-tag="footer" no-body>
        <b-tabs card>
          <template #tabs-start>
            <li role="presentation" class="nav-item align-self-center"> @{{currentUser.username}} </li>
          </template>
        <b-tab title="Post">
          <img src='@/assets/sepehr-moradian-XdtUEWzdU0A-unsplash.jpg' />
        </b-tab>
        <b-tab title="Reviews">
          <b-card-text class="scroll"> <Post v-bind:post='post'/> </b-card-text>
        </b-tab>
        </b-tabs>
        <template #footer>
        Description
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
  mounted() {
    if (localStorage.getItem('token')) {
      console.log(this.currentUser)
    }
    Api.get('/posts/')
      .then(response => {
        console.log(response.data)
        this.posts = response.data.posts
        response.data.posts.forEach(function () {
          Api.get(`/posts/${this.posts}`)
            .then(response => {
              this.postId = response.data._id
            })
            .catch(error => {
              console.log(error)
            })
          response.data._id.forEach(function () {
          })
        })
      })
      .catch(error => {
        console.error(error)
        this.post = []
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
  position: relative;
}

.card {
  min-width: 800px;
  min-height: 680px;
}

li {
  padding-right: 1.5rem;
  padding-left: 0.5rem;
  font-weight: bold;
}

footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.scroll {
  min-width: 800px;
  min-height: 520px;
  max-height: 520px;
  max-width: 800px;
  overflow-y: auto;
  padding: 1rem;
  margin-bottom: 3rem !important;
}
.border {
  font-family: sans-serif;
  text-align: center;
  font-weight: bold;
  padding-bottom: 0.5rem;
  padding-top: 0.5rem;
}

</style>
