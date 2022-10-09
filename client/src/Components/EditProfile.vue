<template>
    <div>
        <button v-on:click="goBack"> cancel
        </button>
        <button>
            Save changes
        </button>
        {{isUser}}
    </div>
</template>
<script>
export default {
  name: 'editingProfile',
  data() {
    return {
      isUser: '',
      isPlace: ''
    }
  },
  methods: {
    goBack() {
      this.$emit('change-to-profile')
    }
  }
}
</script>
