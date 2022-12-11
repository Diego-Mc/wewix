<template>
  <GoogleLogin :callback="callback" />
</template>

<script>
import { decodeCredential } from 'vue3-google-login'

export default {
  methods: {
    callback(response) {
      const userData = decodeCredential(response.credential)
      console.log('Handle the userData', userData)
      const { email, name } = userData
      this.$store.dispatch('googleLogin', { email, name })
    },
  },
}
</script>
