<template>
  <main-header />

  <section class="auth-page">
    <div>
      <login-modal
        @authenticated="authenticated"
        :isModalInAuthPage="true"
        :msg="'Login to your account'" />
    </div>

  </section>
</template>

<script>
import mainHeader from '../cmps/app-cmps/main-header.vue'
import loginModal from '../cmps/app-cmps/login-modal.vue'

export default {
  components: {
    mainHeader,
    loginModal,
  },
  methods: {
    authenticated() {
      this.$emit('authenticated', 'login')
    },
  },
}
</script>

<style lang="scss">
.auth-page {
  margin-top: 40px;
  .auth-modal {
    form {
      width: 500px;

      @media screen and (max-width: 750px) {
          max-width: 350px;
      }

      @media screen and (max-width: 360px) {
          width: 200px;
      }
    }
    .auth-input {
      width: 100%;
      height: 50px;
    }
  }
  .user-upload-photo-section{
    width: 500px;
  }
}
</style>
