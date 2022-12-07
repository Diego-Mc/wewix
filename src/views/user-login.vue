<template>
  <app-header />
  <p>{{ msg }}</p>
  <div>
    <login-modal />
    <signupModal />
  </div>
</template>

<script>
import appHeader from '../cmps/app-cmps/app-header.vue'
import loginModal from '../cmps/app-cmps/login-modal.vue'
import signupModal from '../cmps/app-cmps/signup-modal.vue'

export default {
  components: {
    appHeader,
    loginModal,
    signupModal,
  },
}
</script>
