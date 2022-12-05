<template>
  <section class="login-signup-modal">
    {{loggedinUser}}
    <button @click="doLogout">Logout</button>

    <form v-if="isLogin" @submit.prevent="doLogin">
      <h3>login</h3>
      <div class="login-input-container">
        <label for="">username</label>
        <input v-model="loginCred.username" type="text" />
      </div>
      <div class="login-input-container">
        <label for="">password</label>
        <input v-model="loginCred.password" type="text" />
      </div>

      <button >login</button>
      don't have a user? <button @click.stop="isLogin = !isLogin">signup</button>
    </form>
    <form v-else class="login-input-container">
      <h3>sign up</h3>
      <input
        type="text"
        v-model="signupCred.fullname"
        placeholder="Your full name" />
      <input type="text" v-model="signupCred.password" placeholder="Password" />
      <input type="text" v-model="signupCred.username" placeholder="Username" />
      <!-- <img-uploader @uploaded="onUploaded"></img-uploader> -->

      <button @submit.prevent="doSignup">signup</button>
      <button @click="isLogin = !isLogin">back to login</button>
      {{this.msg}}
    </form>
  </section>
</template>

<script>
import { userService } from '../../services/user.service'
export default {
  name: 'login-signup',
  data() {
    return {
      msg: '',
      loginCred: {username: '', password: ''},
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

  methods: {
    async doLogin() {
      if (!this.loginCred.username) {
        this.msg = 'Please enter username/password'
        return
      }
      try {
       const wa =  await this.$store.dispatch({ type: 'login', userCred: this.loginCred })
       console.log(wa)
        // this.$router.push('/')
      } catch (err) {
        console.log('wa')
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
      this.$router.push('/edit')
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

<style lang="scss">
.login-signup-modal {
  background-color: antiquewhite;
  margin: 20px;
  .login-signup-input-container {
    display: flex;
    flex-direction: column;
  }
}
/* TODO: delete style*/

.login-modal button {
  background-color: aqua;
}

.login-input-container {
  display: flex;
  flex-direction: column;
}
</style>
