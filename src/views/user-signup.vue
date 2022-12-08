<template>
  <app-header />
  <section class="auth-page">
    <signup-modal
      @authenticated="authenticated"
      :isModalInAuthPage="true"
      :msg="'signup'" />
  </section>
</template>

<script>
import appHeader from '../cmps/app-cmps/app-header.vue'
import signupModal from '../cmps/app-cmps/signup-modal.vue'
export default {
  components: { appHeader, signupModal },
}
</script>
