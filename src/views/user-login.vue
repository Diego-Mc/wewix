<template>
  <app-header />

  <section class="auth-page">
    <div>
      <login-modal
        @authenticated="authenticated"
        :isModalInAuthPage="true"
        :msg="'Login'" />
    </div>
  </section>
</template>

<script>
import appHeader from '../cmps/app-cmps/app-header.vue'
import loginModal from '../cmps/app-cmps/login-modal.vue'

export default {
  components: {
    appHeader,
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
.auth-page{
  margin-top: 40px;
  .auth-modal{
    form{

      width: 500px;

    }
    .auth-input{
      width: 100%;
      height: 50px;
    }

  }
}
</style>
