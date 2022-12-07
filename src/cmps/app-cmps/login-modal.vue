<template>
    <div class="auth-modal">
      <h2 class="auth-header">Login</h2>

      <div class="google-auth-btn">
        <button>
          <a href="http://localhost:3030/auth/google">google login</a>
          <div
            class="g-signin2"
            data-width="300"
            data-height="200"
            data-longtitle="true"></div>
        </button>
      </div>
      <p class="login-p-divider">or</p>

      <form class="login-form">
        <el-input
          class="auth-input"
          type="text"
          v-model="loginCred.username"
          placeholder="Enter username" />
        <!-- TODO: change to enter email or userName -->
        <el-input
          class="auth-input"
          v-model="loginCred.password"
          type="password"
          placeholder="Please type password"
          show-password />
        <el-button @click.prevent="doLogin"  type="primary">Login</el-button>
      </form>
      <router-link :to="'/signup/'">
      <span class="toggle-auth-link">Dont have a user? signup</span>
    </router-link>
    </div>
    
</template>

<script>
export default {
  name: 'login-modal',
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
      if (this.loggedinUser) {
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
  components: {  },
}
</script>


<style lang="scss">
.auth-modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  .login-p-divider,
  .google-auth-btn {
    text-align: center;
  }
  .auth-header {
    text-align: center;
  }
  .login-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
    .auth-input {
      width: 350px;
    }
  }
  .toggle-auth-link {
    color: rgb(102, 102, 102);
  }
}
</style>