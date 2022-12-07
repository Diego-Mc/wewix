<template>
  <div class="auth-modal">
    <h2 class="auth-header">{{ msg }}</h2>
    <form class="login-form">
      <el-input
        class="auth-input"
        type="text"
        v-model="signupCred.fullname"
        placeholder="Your full name" />
      <el-input
        class="auth-input"
        type="text"
        v-model="signupCred.username"
        placeholder="Username" />
      <el-input
        class="auth-input"
        type="text"
        v-model="signupCred.password"
        placeholder="Password"
        show-password />

      <img-uploader @uploaded="onUploaded"></img-uploader>
      <el-button type="primary" @click.prevent="doSignup">Signup</el-button>
    </form>
    <button class="toggle-auth-link" @click="backToLogin">back to login</button>
  </div>
</template>

<script>
import {showUserMsg} from '../../services/event-bus.service.js'

export default {
  props: {
    isModalInAuthPage: Boolean,
    msg: String,
    destPage: String,
  },
  name: 'login-signup',
  data() {
    return {
      signupCred: { username: '', password: '', fullname: '', imgUrl: '' },
    }
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
  },
  methods: {
    backToLogin() {
      if (this.isModalInAuthPage) this.$router.push('/login')
      else this.$emit('swapAuthModal', 'login')
    },
    async doSignup() {
      if (
        !this.signupCred.fullname ||
        !this.signupCred.password ||
        !this.signupCred.username
      ) {
        this.msg = 'Please fill up the form'
        return
      }
      await this.$store.dispatch({ type: 'signup', userCred: this.signupCred })
      let dest
      console.log(this.isModalInAuthPage)
      if (this.isModalInAuthPage) dest = '/'
      else if (this.destPage === 'dashboard') dest = '/dashboard'
      this.$router.push(dest)
      showUserMsg({ txt: 'Signed up successfully' })
    },
  },
  components: {},
}
</script>

<style lang="scss"></style>
