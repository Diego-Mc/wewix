<template>
  <main-header />
  <main class="auth-page">

    <signup-modal
      @authenticated="authenticated"
      :isModalInAuthPage="true"
      :msg="'Signup'" />
    <div class="user-upload-photo-section"></div>
  </main>
</template>

<script>
import mainHeader from '../cmps/app-cmps/main-header.vue'
import signupModal from '../cmps/app-cmps/signup-modal.vue'

export default {
  components: { mainHeader, signupModal, },
}
</script>

<style>
.auth-page-container {
  display: grid;
}
</style>
