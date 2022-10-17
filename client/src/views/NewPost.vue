<template>
  <div id="app">
    <h1>New Post</h1>
    <input
      style="display: none"
      type="file"
      @change="onFileChange"
      ref="fileInput"
    />
    <div class="main">
    <label class="label"> Description </label> <br />
    <textarea class="mb-2" name="description" v-model="description"> </textarea>

    <b-input-group prepend="Location" class="mb-1" name="location">
      <b-form-input
        aria-label="Large text input with switch"
        v-model="location"
      >
      </b-form-input>
      <b-input-group-append is-text @click="getLocation">
        <b-form-checkbox switch class="mr-n2"> </b-form-checkbox>
      </b-input-group-append>
    </b-input-group>
    <b-container style="margin-top: 2rem">
      <b-row>
        <b-col>
          <b-button id="btn" @click="createPost()"> Upload </b-button>
        </b-col>
      </b-row>
    </b-container>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
export default {
  name: 'NewPost',
  props: { currentUser: Object },
  mounted() {
    if (localStorage.getItem('token')) {
      console.log(this.currentUser)
    }
  },
  data() {
    return {
      selectedFile: null,
      url: null,
      description: '',
      location: '',
      timestamp: '',
      reviews: '',
      user: '',
      place: '',
      post: {}
    }
  },

  created() {
    if (localStorage.getItem('token') === null) {
      this.$router.push('/startpage')
    }
  },

  methods: {
    createPost() {
      const newPost = {
        description: this.description,
        location: this.location,
        user: this.currentUser.id,
        userName: this.currentUser.username
      }
      const theID = this.currentUser.id
      let route = '/users/' + theID + '/posts'
      if (localStorage.getItem('place')) {
        route = '/places/' + theID + '/posts'
      }

      console.log(this.currentUser.username)
      Api.post(route, newPost)
        .then((response) => {
          console.log(response.data)
          this.post = response.data
          console.log(this.newPost)
        })
        .catch((error) => {
          console.log(error)
        })
      this.$router.go(0)
      console.log(this.post)
    },
    onFileSelected(event) {
      this.selectedFile = event.target.files[0]
    },

    onFileChange(event) {
      const file = event.target.files[0]
      this.url = URL.createObjectURL(file)
    },

    onUpload() {
      const fd = new FormData()
      fd.append('img', this.selectedFile, this.selectedFile.name)
      Api.post('/posts', fd, {
        onUploadProgress: (uploadEvent) => {
          console.log(
            'Upload Progress: ' +
              Math.round((uploadEvent.loaded / uploadEvent.total) * 100) +
              '%'
          )
        }
      }).then((res) => {
        console.log(res)
      })
    },

    getLocation() {
      console.log('getLocation')
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.getCityandCountry(position)
        },
        (err) => {
          console.log('err:', err)
        },
        { timeout: 7000 }
      )
    },
    getCityandCountry(position) {
      // eslint-disable-next-line no-template-curly-in-string
      const apiUrl = 'https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}?json=1&auth=841776363501392779604x54275'
      this.$axios
        .get(apiUrl)
        .then((result) => {
          this.locationSuccess(result)
        })
        .catch((err) => {
          console.log('err:', err)
        })
    },
    locationSuccess(result) {
      this.post.location = result.data.city
      if (result.data.country) {
        // eslint-disable-next-line no-template-curly-in-string
        this.post.location += ', ${result.data.country}'
      }
    },

    uploadForm: function () {}
  }
}
</script>

<style scoped>
@media only screen and (max-width: 768px){
  #app{
    background-color: #f6eef0;
    height: 100vh;
  }

}
.main{
  display: inline-block;
  width: 70%;
}

h1 {
  font-family: inter;
  text-align: center;
}

.mb-1 {
  margin-top: 1rem;
  margin-left: 25%;
  margin-right: 30%;
}

#btn {
  height: 35px;
  width: 100px;
  font-family: inter;
  font-size: 16px;
  color: white;
  background-color: #4c3d40;
  margin-left: 23%;
}
.label {
  color: grey;
  margin-left: 25%;
  font-size: 18px;
  text-align: center;
}
.mb-2 {
  margin-left: 25%;
  margin-bottom: 15px;
  width: 100%;
  height: 200px;
  padding: 10px;
}
</style>
