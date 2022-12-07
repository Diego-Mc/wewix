<template>
  <app-header />
  <p>{{ msg }}</p>
  <div>
    <login-modal @authenticated="authenticated" :isModalInAuthPage="true" :msg="'login'"/>
  </div>
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
