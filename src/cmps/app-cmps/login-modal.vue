<template>
  <div class="auth-modal">
    <h2 class="auth-header">{{ msg }}</h2>
    <google-auth @googleLogin="onGoogleLogin" />
    <p class="login-p-divider">or</p>
    <div class="auth-form-container">
      <form class="login-form" @submit.prevent="doLogin">
        <el-input
          class="auth-input"
          type="text"
          v-model="loginCred.username"
          placeholder="Email or Username" />
        <!-- TODO: change to enter email or userName -->
        <el-input
          class="auth-input"
          v-model="loginCred.password"
          type="password"
          placeholder="Password"
          show-password />
        <button type="primary" class="auth-btn">
          Login
          <span v-if="destPage === 'publishWap'">&nbspand publish</span>
        </button>
      </form>
      <button class="toggle-auth-link" @click.stop.prevent="openSignupModal">
        Dont have an account?
      </button>
    </div>
  </div>
</template>

<script>
import { showUserMsg } from '../../services/event-bus.service.js'
import { ElMessage } from 'element-plus'
import googleAuth from './google-auth.vue'

export default {
  name: 'login-modal',
  props: {
    isModalInAuthPage: Boolean,
    msg: String,
    destPage: String,
  },
  components: {
    googleAuth,
  },
  data() {
    return {
      loginCred: { username: 'admin', password: 'admin' },
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
    onGoogleLogin() {
      this.redirectUser()
    },
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
        this.redirectUser()
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
    redirectUser() {
      if (this.isModalInAuthPage) {
        if (this.$router.options.history.state.back === '/signup')
          this.$router.push('/edit')
        else this.$router.back()
      } else if (this.destPage === 'dashboard') {
        this.$router.push('/dashboard')
      } else {
        this.$emit('authenticated')
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
    margin-block: 16px;
  }
  .login-p-divider{
    font-size: 12px;
  }
  .auth-header {
    text-align: center;
    margin-bottom: 20px;
    @media (max-width: 700px) {
      font-size: 16px;
    }
  }
  .auth-form-container {
  }
  .login-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    // min-width: 350px;
    // @media (max-width: 700px) {
    //   width: 300px !important;
    // }
    // .auth-input {
    //   width: 100%;
    //   @media (max-width: 700px) {
    //     // width: 300px !important;
    //   }
    // }
  }
  .toggle-auth-link {
    font-size: 12px;
    padding: 0;
    text-align: start;
    color: rgb(102, 102, 102);
    text-decoration: underline;
  }

  /* CSS */
  .auth-btn {
    width: 100%;
    appearance: none;
    background-color: #00c2a6;
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
    margin-bottom: 20px;
  }

  .auth-btn:focus:not(:focus-visible):not(.focus-visible) {
    box-shadow: none;
    outline: none;
  }

  .auth-btn:hover {
    background-color: #118f7c;

    // background-color: #2c974b;
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
