<template>
  <app-header/>
  <div class="container about">
    <p>{{ msg }}</p>
    <div>
      <form @submit.prevent="doLogin">
        <h2>Login</h2>
        <input
          type="text"
          v-model="loginCred.username"
          placeholder="Your full name" />
        <input
          type="text"
          v-model="loginCred.password"
          placeholder="Password" />
        <button>Login</button>
      </form>
    </div>
      <router-link :to="'/signup/'">
        <span>Dont have a user? signup</span>
      </router-link>
  </div>
</template>

<script>
import appHeader from '../cmps/app-cmps/app-header.vue'
export default {
  name: 'login-signup',
  data() {
    return {
      msg: '',
      loginCred: { username: '', password: '' },
    }
  },
  computed: {
    users() {
      return this.$store.getters.users
    },
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
  },
  methods: {
    async doLogin() {
      if (!this.loginCred.username) {
        this.msg = 'Please enter username/password'
        return
      }
      if(this.loggedinUser) {
        this.doLogout()
      }
      try {
        await this.$store.dispatch({ type: 'login', userCred: this.loginCred })
        this.$router.push('/')
      } catch (err) {
        console.log(err)
        this.msg = 'Failed to login'
      }
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
      this.$router.push('/')
    },
  },
  components: {appHeader},
}
</script>
