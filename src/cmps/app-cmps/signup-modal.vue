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
      <el-button type="primary" @click.prevent="doSignup">
        <span>Signup </span>
        <span v-if="destPage === 'publishWap'"
          >&nbspand publish</span
        ></el-button
      >
    
    </form>
    <button class="toggle-auth-link" @click.prevent="backToLogin">
      To login
    </button>
  </div>
</template>

<script>
import { showUserMsg } from '../../services/event-bus.service.js'

export default {
  props: {
    isModalInAuthPage: Boolean,
    msg: String,
    destPage: String,
  },
  name: 'login-signup',
  data() {
    return {
      signupCred: { username: 'john', password: 'john', fullname: 'john', imgUrl: '' },
      userMsg:''
    }
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
  },
  methods: {
    doLogout() {
      this.$store.dispatch({ type: 'logout' })
    },
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
        this.userMsg = 'Please fill up the form'
        return
      }
      try {
        await this.$store.dispatch({
          type: 'signup',
          userCred: this.signupCred,
        })
        if (this.isModalInAuthPage) {
          this.$router.push('/edit')
        } else if (this.destPage === 'dashboard') {
          this.$router.push('/dashboard/')
        } else {
          this.$emit('authenticated')
        }
        this.$notify({
          title: 'Signed up successfully',
          type: 'success',
        })
      } catch {
        this.$notify({
          title: 'Signed up failed.',
          type: 'error',
        })
      }
    },
  },
  components: {},
}
</script>

<style lang="scss"></style>
