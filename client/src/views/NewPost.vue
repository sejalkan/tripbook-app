<template>
  <div id="app">
    <input
    style="display: none"
    type="file"
    @change="onFileChange"
    ref="fileInput">
    <b-container style="margin-top: 2rem">
    <b-row >
        <b-col sm="6" md="5" offset-md="2" lg="6" offset-lg="5">
    <b-button pill variant="primary" @click='$refs.fileInput.click()'>Pick File</b-button>
    <b-button pill variant="success" style="margin-left: 0.5rem" @click="createPost()"> Upload </b-button>
        </b-col>
    </b-row>
    </b-container>

    <div id="preview">
      <img v-if="url" :src="url" />
    </div>

    <b-input-group size="lg" prepend="Description" class="mb-2" name="description">
        <b-form-input aria-label="Large text input with switch" v-model="description"></b-form-input>
    </b-input-group>

    <b-input-group size="lg" prepend="Location" class="mb-1 " name="location">
        <b-form-input aria-label="Large text input with switch" v-model="location"></b-form-input>
    <b-input-group-append is-text @click="getLocation">
      <b-form-checkbox switch class="mr-n2" >
      </b-form-checkbox>
    </b-input-group-append>
    </b-input-group>
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
      postData: {
        description: '',
        location: '',
        timestamp: '',
        reviews: '',
        user: '',
        place: ''
      },
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
        userName: this.currentUser.username
      }
      console.log(this.currentUser)
      console.log(this.currentUser.username)
      Api.post(`/users/${this.currentUser.id}/posts`, newPost).then(response => {
        console.log(response.data)
        this.post = response.data
        console.log(this.post)
      })
        .catch(error => {
          console.log(error)
        })
      this.$router.go(0)
      console.log(this.post)
      console.log(newPost)
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
        onUploadProgress: uploadEvent => {
          console.log('Upload Progress: ' + Math.round(uploadEvent.loaded / uploadEvent.total * 100) + '%')
        }
      })
        .then(res => {
          console.log(res)
        })
    },

    getLocation() {
      console.log('getLocation')
      navigator.geolocation.getCurrentPosition(position => {
        this.getCityandCountry(position)
      }, err => {
        console.log('err:', err)
      }, { timeout: 7000 })
    },
    getCityandCountry(position) {
      // eslint-disable-next-line no-template-curly-in-string
      const apiUrl = 'https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}?json=1&auth=841776363501392779604x54275'
      this.$axios.get(apiUrl).then(result => {
        this.locationSuccess(result)
      }).catch(err => {
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

    uploadForm: function () {
    }
  }
}
</script>

<style>

.mb-2 {
    display: flex;
    flex-direction: row;
    margin-top: 2rem;
    padding-left: 14rem;
    padding-right: 14rem;
}

.mb-1 {
    display: flex;
    flex-direction: row;
    margin-top: 1rem;
    padding-left: 14rem;
    padding-right: 14rem;
}

#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 500px;
  margin-top: 2rem;
  margin-bottom: 2rem;
}

</style>
