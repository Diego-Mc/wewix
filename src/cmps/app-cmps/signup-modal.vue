<template>
  <div class="auth-modal">
    <h2 class="auth-header">{{ msg }}</h2>
    <form class="login-form"  @submit.prevent="doSignup">
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

      <button type="primary">
        <span>Signup </span>
        <span v-if="destPage === 'publishWap'"
          >&nbspand publish</span
        ></button
      >
    
    </form>
    <button class="toggle-auth-link" @click.prevent="backToLogin">
      To login
    </button>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'

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
       ElMessage({
          message: 'Signed up successfully',
          type: 'success',
        })
      } catch {
        ElMessage({
          message: 'Signed up failed.',
          type: 'error',
        })
      }
    },
  },
  components: {},
}
</script>

<style lang="scss"></style>
