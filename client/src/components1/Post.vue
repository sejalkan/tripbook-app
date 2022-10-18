<template>
  <div class="row justify-content-center">
    <div class="card" v-for="review in reviews" v-bind:key="review._id">
      <p>@{{ review.userName }}</p>
      <p>{{ review.text }}</p>
      <p>Rating: {{ review.rating }}/5</p>
    </div>
  </div>
</template>

<script>
import { Api } from '@/Api'
export default {
  name: 'post',
  props: ['post'],

  mounted() {
    console.log(this.post._id)
    console.log(this.currentUser)
    Api.get(`/posts/${this.post._id}/reviews`)
      .then((response) => {
        console.log(response.data)
        this.reviews = response.data
      })
      .catch((error) => {
        console.log(error)
      })
  },

  data() {
    return {
      reviews: []
    }
  }
}
</script>

<style scoped>
.post {
  width: 800px;
  height: 800px;
}

.card {
  margin: 2rem;
  padding: 1rem;
  width: 100%;
  margin-bottom: 0.2rem;
  border-color: #4c3d40;
}

p {
  font-weight: bold;
}
</style>
