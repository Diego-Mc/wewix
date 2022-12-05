<template>
  <div class="container about">
    <p>{{ msg }}</p>
    <div v-if="loggedinUser">
      <h3>
        {{loggedinUser}}
        Loggedin User: {{ loggedinUser.fullname }}
        <button @click="doLogout">Logout</button>
      </h3>
    </div>
    <div>
      <form @submit.prevent="doLogin" v-if="isLogin">
        <h2>Login</h2>
        <input
          type="text"
          v-model="loginCred.username"
          placeholder="Your full name" />
        <input
          type="text"
          v-model="loginCred.password"
          placeholder="Password" />
        <!-- <input type="text" v-model="loginCred.username" placeholder="User name" />
        <input
          type="text"
          v-model="loginCred.password"
          placeholder="Password"
        /> -->
        <button>Login</button>
      </form>
      <form @submit.prevent="doSignup" v-else>
        <h2>Signup</h2>
        <input
          type="text"
          v-model="signupCred.fullname"
          placeholder="Your full name" />
        <input
          type="text"
          v-model="signupCred.password"
          placeholder="Password" />
        <input
          type="text"
          v-model="signupCred.username"
          placeholder="Username" />
        <img-uploader @uploaded="onUploaded"></img-uploader>
        <button>Signup</button>
      </form>
    </div>
    <hr />
    <button @click="isLogin = !isLogin">
      <span v-if="isLogin">dont have a user? signup</span>
      <span v-else>back to login</span>
    </button>
  </div>
</template>

<script>
export default {
  name: 'login-signup',
  data() {
    return {
      msg: '',
      loginCred: { username: '', password: '' },
      signupCred: { username: '', password: '', fullname: '', imgUrl: '' },
      isLogin: true,
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
  created() {
    this.loadUsers()
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
    doLogout() {
      this.$store.dispatch({ type: 'logout' })
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
    loadUsers() {
      this.$store.dispatch({ type: 'loadUsers' })
    },
    async removeUser(userId) {
      try {
        await this.$store.dispatch({ type: 'removeUser', userId })
        this.msg = 'User removed'
      } catch (err) {
        this.msg = 'Failed to remove user'
      }
    },
    onUploaded(imgUrl) {
      this.signupCred.imgUrl = imgUrl
    },
  },
  components: {},
}
</script>
