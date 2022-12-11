<template>
  <app-header />
  <main class="auth-page">

    <signup-modal
      @authenticated="authenticated"
      :isModalInAuthPage="true"
      :msg="'Signup'" />
    <div class="user-upload-photo-section"></div>
  </main>
</template>

<script>
import appHeader from '../cmps/app-cmps/app-header.vue'
import signupModal from '../cmps/app-cmps/signup-modal.vue'

export default {
  components: { appHeader, signupModal, },
}
</script>

<style>
.auth-page-container {
  display: grid;
}
</style>
