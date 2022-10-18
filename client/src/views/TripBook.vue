<template>
  <div>
    <h1>Your TripBook!</h1>
    <b-row class="row">
      <b-col
        class="card"
        cols="12"
        md="6"
        lg="6"
        sm="12"
        style="padding: 2rem"
        v-for="post in posts"
        v-bind:key="post.id"
      >
        <b-card class="card" header-tag="header" footer-tag="footer" no-body>
          <b-tabs card>
            <template #tabs-start>
              <li role="presentation" class="nav-item align-self-center">
                @{{ currentUser.username }}
              </li>
            </template>
            <b-tab title="Post">
              <p class="desc">{{ post.description }}</p>
            </b-tab>
            <b-tab class="scroll" title="Reviews">
              <b-card-text> <Post v-bind:post="post" /> </b-card-text>
            </b-tab>
          </b-tabs>
          <template #footer>
            <p>{{ post.location }}</p>
            <b-button id="tripbooking" @click="removeIt(post)">
              <i class="fa-solid fa-book-open"> </i> Remove
            </b-button>
          </template>
        </b-card>
        <p></p>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import Post from '../components1/Post.vue'
import { Api } from '@/Api'
export default {
  components: { Post },
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
    for (let i = 0; i < this.currentUser.favPosts.length; i++) {
      const id = this.currentUser.favPosts[i]
      const route = '/posts/' + id
      Api.get(route)
        .then((response) => {
          this.posts.push(response.data.post)
          console.log(this.posts)
        })
        .catch((error) => {
          console.error(error)
          this.post = []
        })
    }
  },
  methods: {
    removeIt(post) {
      const theID = this.currentUser.id
      let route = '/userFavPost/' + theID
      if (localStorage.getItem('place')) {
        route = '/placeFavPlace/' + theID
      }
      Api.post(route, post)
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
      this.$router.go('/tripbook')
    }
  },
  data() {
    return {
      posts: [],
      editProfile: ''
    }
  }
}
</script>
<style scoped>
#tripbooking {
  float: right;
  background-color: #f6eef0;
  padding: 4px;
  border: 1px solid gray;
  color: black;
}
#tripbooking:hover {
  background-color: #f6eef073;
}
h1 {
  text-align: center;
  text-shadow: 3px 2px 5px gray;
  font-family: inter;
  background-color: #4c3d40;
  color: white;
  padding: 5px;
}
</style>
