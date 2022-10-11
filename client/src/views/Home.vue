<template>
  <div>
    <h1 class="border"> Hello  {{ currentUser.username }} !</h1>
    <p class="heading"> Posts from people and places you follow </p>
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

        <b-tab title="Write a Review">
          <b-input-group size="lg" prepend="Text" class="mb-3" name="text">
            <b-form-input  v-model="text"></b-form-input>
          </b-input-group>
          <b-form-rating size="lg" v-model="rating" class="stars"> </b-form-rating>
          <p class="mt-2">Rating: {{ rating }} </p>
          <b-button class="post-b" pill variant="success" @click="createReview(post)"> Post </b-button>

        </b-tab>
        </b-tabs>
        <template #footer>
        <p class="desc">{{post.description}}</p>
        <p>{{ post.location }}</p>
      </template>
      </b-card>
    </div>
  </div>
</template>

<script>
import Post from '../components/Post.vue'
import { Api } from '@/Api'

export default {
  name: 'posts',
  props: { currentUser: Object },
  components: { Post },
  mounted() {
    if (localStorage.getItem('token')) {
      console.log(this.currentUser)
    }
    Api.get('/posts')
      .then(response => {
        console.log(response.data)
        this.posts = response.data.posts
        console.log(this.posts)
      })
      .catch(error => {
        console.error(error)
      })
  },

  methods: {
    createReview(post) {
      const newReview = {
        rating: this.rating,
        text: this.text
      }
      console.log('hello')
      console.log(post)
      console.log(post._id)
      console.log('hello')
      Api.post(`/posts/${post._id}/reviews`, newReview).then(response => {
        console.log(response.data)
        this.review = []
        this.review.push(newReview)
        console.log()
      })
        .catch(error => {
          console.log(error)
        })
    }
  },

  data() {
    return {
      posts: [],
      rating: null
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

.heading {
  font-weight: bold;
  text-align: center;
}

.desc {
  font-weight: bold;
  margin-bottom: 8px;
}

img {
  max-height: 600px;
  max-width: 800px;
  position: relative;
}

.card {
  min-width: 800px;
  min-height: 710px;
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
  max-height: 80px;
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
  background-color: #4C3D40;
  color: white;
}

.mb-3 {
  margin-top: 3rem;
}

.stars {
  margin-top: 3rem;
}

.post-b {
  margin-top: 2rem;
  width: 100%;
}

</style>
