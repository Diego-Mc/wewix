<template>
  <GoogleLogin :callback="callback" />
</template>

<script>
import { decodeCredential } from 'vue3-google-login'

export default {
  methods: {
    async callback(response) {
      const userData = decodeCredential(response.credential)
      const { email, name, picture } = userData
      await this.$store.dispatch('googleLogin', { email, name, picture })
      this.$emit('googleLogin')
    },
  },
}
</script>
