<template>
  <div class="auth-modal">
    <h2 class="auth-header">{{ msg }}</h2>
    <!-- <div class="google-auth-btn">
      <button>
        <a href="http://localhost:3030/auth/google">google login</a>
        <div
          class="g-signin2"
          data-width="300"
          data-height="200"
          data-longtitle="true"></div>
      </button>
    </div> -->
    <!-- <p class="login-p-divider">or</p> -->
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
      <el-button @click.prevent="doLogin" type="primary"
        >Login
        <span v-if="destPage === 'publishWap'">&nbspand publish</span>
      </el-button>
    </form>
    <button class="toggle-auth-link" @click.stop.prevent="openSignupModal">
      Dont have a user? <span style="font-weight: 600">signup here</span>
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
  name: 'login-modal',
  data() {
    return {
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
    doLogout() {
      this.$store.dispatch({ type: 'logout' })
    },
    openSignupModal() {
      if (this.isModalInAuthPage) this.$router.push('/signup')
      else this.$emit('swapAuthModal', 'signup')
    },
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
        if (this.isModalInAuthPage) {
          this.$router.push('/')
        } else if (this.destPage === 'dashboard') {
          this.$router.push('/dashboard')
        }else{
          this.$emit('authenticated')
        }

        this.$notify({
          title: 'Logged in successfully',
          type: 'success',
        })
      } catch (err) {
        console.log(err)
        this.$notify({
          title: 'Cannot sign in',
          type: 'error',
        })
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
  components: {},
}
</script>

<style lang="scss">
.auth-modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 15px;
  border-radius: 10px;
  .login-p-divider,
  .google-auth-btn {
    text-align: center;
  }
  .auth-header {
    text-align: center;
    margin-bottom: 20px;
    @media (max-width: 700px) {
      font-size: 16px;
    }
  }
  .login-form {
    display: flex;
    flex-direction: column;

    gap: 20px;
    .auth-input {
      width: 350px;
      @media (max-width: 700px) {
        width: 240px;
      }
    }
  }
  .toggle-auth-link {
    font-size: 16px;
    padding: 0;
    text-align: start;
    color: rgb(102, 102, 102);
  }
}
</style>
