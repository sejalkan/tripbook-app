<template>
  <div>
    <h2>Current places on TripBook:</h2>
    <b-row class="places">
      <b-col
        sm="12"
        col="12"
        md="6"
        lg="4"
        v-for="place in places"
        v-bind:key="place._id"
      >
        <li>{{ place.username }} in {{ place.address }}</li>
      </b-col>
    </b-row>
    <div style="padding: 2rem">
      <AddGoogleMap />
    </div>
  </div>
</template>

<script>
import AddGoogleMap from '../components/AddGoogleMap.vue'
import { Api } from '@/Api'

export default {
  name: 'Map',
  components: { AddGoogleMap },
  props: { currentUser: Object },
  data() {
    return {
      places: ''
    }
  },
  created() {
    if (localStorage.getItem('token') === null) {
      this.$router.push('/startpage')
    }
  },
  mounted() {
    this.getPlaces()
  },
  methods: {
    getPlaces() {
      Api.get('/places')
        .then((response) => {
          console.log(response.data)
          this.places = response.data.places
        })
        .catch((error) => {
          console.error(error)
          this.places = []
        })
    }
  }
}
</script>

<style scoped>
@media only screen and (max-width: 577px) {
  .places {
    display: inline-block;
    width: 100%;
  }
  h2 {
    width: 100vw;
  }
}
h2 {
  text-shadow: 3px 2px 5px gray;
  font-family: inter;
  background-color: #4c3d40;
  color: white;
  padding: 5px;
}
.places {
  margin-left: 5%;
  margin-right: 5%;
}
li {
  font-family: inter;
  font-size: 18px;
  border-bottom: 1px solid gray;
}
</style>
