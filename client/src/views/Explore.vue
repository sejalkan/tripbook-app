<template>
  <div style="padding: 2rem">
    <AddGoogleMap />
  </div>
</template>

<script>
import AddGoogleMap from '../components/AddGoogleMap.vue'

export default {
  name: 'Map',
  components: { AddGoogleMap },
  props: { currentUser: Object },
  created() {
    if (localStorage.getItem('token') === null) {
      this.$router.push('/startpage')
    }
  }
}
</script>

<style>

</style>
