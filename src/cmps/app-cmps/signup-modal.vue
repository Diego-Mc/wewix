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
      this.$router.push('/edit') //TODO: change to different page
      this.$emit('authenticated')
    },
  },
  components: {},
}
</script>

<style lang="scss"></style>
