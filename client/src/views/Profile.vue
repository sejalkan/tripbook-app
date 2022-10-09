<template>
  <div class="main">
    <div class="information">
    <h1>{{currentUser.username}}</h1>
    <h2> Bio: <br> {{currentUser.bio}}</h2>
    <button class="editBtn">Edit Profile </button>
    </div>
    <div style="padding: 2.5rem">
      <b-tabs content-class="mt-3" align="center">
        <b-tab title="Posts"><p>Your Posts</p>

        <div class="row justify-content-center" style="padding: 2rem" v-for="post in posts" v-bind:key="post._id">
      <b-card style="card" header-tag="header" footer-tag="footer" no-body>
        <b-tabs card>
          <template #tabs-start>
            <li role="presentation" class="nav-item align-self-center"> @{{currentUser.username}} </li>
          </template>
        <b-tab title="Post">
          <img src='@/assets/sepehr-moradian-XdtUEWzdU0A-unsplash.jpg' />
        </b-tab>
        <b-tab class="scroll" title="Reviews">
          <b-card-text> <Post v-bind:post='post'/> </b-card-text>
        </b-tab>
        </b-tabs>
        <template #footer>
        Description
      </template>
      </b-card>
      <p></p>
    </div>

        </b-tab>
        <b-tab title="Followers"><p>Your Followers</p></b-tab>
        <b-tab title="Following"><p>Your Following</p></b-tab>

      </b-tabs>
    </div>
  </div>
</template>

<script>
import Post from '../components/Post.vue'
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

    Api.get('/posts')
      .then(response => {
        console.log(response.data)
        this.posts = response.data.posts
      })
      .catch(error => {
        console.error(error)
        this.post = []
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
.main{
  padding-top: 0px;
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
  min-height: 680px;
}

.scroll {
  min-width: 800px;
  min-height: 500px;
  max-height: 500px;
  max-width: 800px;
  overflow-y: auto;
  padding: 1rem;
  margin-bottom: 3rem !important;
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

h1 {
  padding: 0rem;
  padding-bottom: 1rem;
  font-family:monospace;
  font-style: normal;
  margin: 0%;
}

h2{
  text-align: left;
}

.information{
  text-align: left;
  padding-left: 0%;
  margin:0;
  background-color: #f6eef0;
}

.editBtn{
        background-color:#c8b4d0;
        border: none;
        height: 50px;
        width: 100px;
        font-family: inter;
        font-size: 16px;
    }
</style>
