<template>
  <div class="main">
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <div v-if="editProfile">
      <editing-profile
        @change-to-profile="change"
        v-bind:currentUser="currentUser"
      >
        hey
      </editing-profile>
    </div>
    <div v-else>
      <div class="information">
        <h1>@{{ currentUser.username }}</h1>
        <p id="bio">
          Bio: <br />
          {{ currentUser.bio }}
        </p>
        <button class="editBtn" v-on:click="isEditing">Edit Profile</button>
        <br />
      </div>
      <div>
        <b-tabs content-class="mt-3" align="center">
          <b-tab title="Posts" class="tab"
            ><p>Your Posts</p>
            <b-row class="row">
              <b-col
                class="card"
                cols="12"
                md="6"
                lg="6"
                sm="12"
                style="padding: 2rem"
                v-for="post in posts"
                v-bind:key="post._id"
              >
                <b-card
                  class="card"
                  header-tag="header"
                  footer-tag="footer"
                  no-body
                >
                  <b-tabs card>
                    <template #tabs-start>
                      <li
                        role="presentation"
                        class="nav-item align-self-center"
                      >
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
                  </template>
                </b-card>
                <p></p>
              </b-col>
            </b-row>
          </b-tab>
          <b-tab title="Followers" class="tab"><p>Your Followers</p></b-tab>
          <b-tab title="Following" class="tab"><p>Your Following</p></b-tab>
        </b-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import Post from '../components/Post.vue'
import { Api } from '@/Api'
import editingProfile from '../components/EditProfile.vue'

export default {
  components: { Post, editingProfile },
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
    for (let i = 0; i < this.currentUser.posts.length; i++) {
      const id = this.currentUser.posts[i]
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
        .then(() => {
          console.log('This runs every time after success or error.')
        })
    }
  },
  data() {
    return {
      posts: [],
      editProfile: ''
    }
  },
  methods: {
    isEditing() {
      this.editProfile = true
    },
    change() {
      this.editProfile = false
      this.$router.go('/profile')
    }
  }
}
</script>

<style scoped>

.tab {
  text-align: center;
  font-size: 13px;
}
.header {
  text-align: center;
  font-weight: bold;
  border-top: 0ch;
}
.main {
  padding-top: 0px;
}
p {
  font-weight: bold;
  text-align: center;
}
#bio {
  font-family: inter;
  text-align: left;
  font-style: normal;
}

img {
  max-height: 600px;
  max-width: 800px;
}

.card {
  width: 400px;
  height: 300px;
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
  font-family: inter;
  font-style: normal;
  font-size: 22px;
  text-align: left;
}

.information {
  text-align: left;
  padding: 20px;
  margin-left: 25%;
  margin-right: 25%;
  margin-top: 25px;
  margin-bottom: 25px;
  box-shadow: 5px 0px 10px #888888;
  background-color: #f6eef0;
}
.editBtn {
  background-color: #4c3d40;
  border: none;
  border-radius: 8%;
  height: 35px;
  width: 100px;
  font-family: inter;
  font-size: 12px;
  color: white;
  float: right;
}
.desc {
  font-weight: bold;
  margin-bottom: 8px;
}
</style>
