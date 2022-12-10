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
    <form class="login-form" @submit.prevent="doLogin">
      <el-input
        class="auth-input"
        type="text"
        v-model="loginCred.username"
        placeholder="Enter username" />
      <!-- TODO: change to enter email or userName -->
      <input
        class="auth-input"
        v-model="loginCred.password"
        type="password"
        placeholder="Please type password"
        show-password />
      <button type="primary" class="auth-btn">
        Login
        <span v-if="destPage === 'publishWap'">&nbspand publish</span>
      </button>
    </form>
    <button class="toggle-auth-link" @click.stop.prevent="openSignupModal">
      Dont have a user? <span style="font-weight: 600">signup here</span>
    </button>
  </div>
</template>

<script>
import { showUserMsg } from '../../services/event-bus.service.js'
import { ElMessage } from 'element-plus'

export default {
  props: {
    isModalInAuthPage: Boolean,
    msg: String,
    destPage: String,
  },
  name: 'login-modal',
  data() {
    return {
      loginCred: { username: 'nir', password: 'nir' },
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
          this.$router.back()
        } else if (this.destPage === 'dashboard') {
          this.$router.push('/dashboard')
        } else {
          this.$emit('authenticated')
        }

        ElMessage({
          message: 'Logged in successfully',
          type: 'success',
        })
      } catch (err) {
        console.log(err)
        ElMessage({
          message: 'Cannot sign in',
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

/* CSS */
.auth-btn {
    appearance: none;
    background-color: #2ea44f;
    border: 1px solid rgba(27, 31, 35, 0.15);
    box-shadow: rgba(27, 31, 35, 0.1) 0 1px 0;
    box-sizing: border-box;
    color: #fff;
    cursor: pointer;
    display: inline-block;
    font-size: 14px;
    font-weight: 600;
    line-height: 20px;
    padding: 6px 16px;
    position: relative;
    text-align: center;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    vertical-align: middle;
    white-space: nowrap;
  }

  .auth-btn:focus:not(:focus-visible):not(.focus-visible) {
    box-shadow: none;
    outline: none;
  }

  .auth-btn:hover {
    background-color: #2c974b;
  }

  .auth-btn:focus {
    box-shadow: rgba(46, 164, 79, 0.4) 0 0 0 3px;
    outline: none;
  }

  .auth-btn:disabled {
    background-color: #94d3a2;
    border-color: rgba(27, 31, 35, 0.1);
    color: rgba(255, 255, 255, 0.8);
    cursor: default;
  }

  .auth-btn:active {
    background-color: #298e46;
    box-shadow: rgba(20, 70, 32, 0.2) 0 1px 0 inset;
  }
}
</style>
