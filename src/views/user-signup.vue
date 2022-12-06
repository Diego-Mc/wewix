<template>
  <app-header />
  <div class="container about">
    <p>{{ msg }}</p>
    <form @submit.prevent="doSignup">
      <h2>Signup</h2>
      <input
        type="text"
        v-model="signupCred.fullname"
        placeholder="Your full name" />
      <input type="text" v-model="signupCred.password" placeholder="Password" />
      <input type="text" v-model="signupCred.username" placeholder="Username" />
      <img-uploader @uploaded="onUploaded"></img-uploader>
      <button>Signup</button>
    </form>
  </div>
  <router-link :to="'/login/'">
    <span>back to login</span>
  </router-link>
</template>

<script>
import appHeader from '../cmps/app-cmps/app-header.vue'

export default {
  name: 'login-signup',
  data() {
    return {
      msg: '',
      signupCred: { username: '', password: '', fullname: '', imgUrl: '' },
    }
  },
  computed: {
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
  components: { appHeader },
}
</script>
