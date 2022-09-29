<template>
  <div class="row justify-content-center">
      <p>{{post.reviews}} as a review</p>
    </div>
</template>

<script>
export default {
  name: 'post',
  props: ['post']

}
</script>

<style scoped>
.post {
  width: 800px;
  height: 800px;
}
</style>
