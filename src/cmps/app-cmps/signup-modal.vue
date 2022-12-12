<template>
  <div class="auth-modal">
    <h2 class="auth-header">{{ msg }}</h2>
    <div class="upload-user-img-container">
      <img class="user-img-preview" :src="signupCred.picture" alt="" />
      <upload-section @select="setUserImg" class="img-uploader" />
    </div>

    <form class="login-form" @submit.prevent="doSignup">
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

      <button class="auth-btn">
        <span>Signup </span>
        <span v-if="destPage === 'publishWap'">&nbspand publish</span>
      </button>
    </form>
    <button class="toggle-auth-link" @click.prevent="backToLogin">
      To login
    </button>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import uploadSection from '../main-editor/cmp-edit-sections/edit-upload-section.vue'

export default {
  props: {
    isModalInAuthPage: Boolean,
    msg: String,
    destPage: String,
  },
  components: {
    uploadSection,
  },
  name: 'login-signup',
  data() {
    return {
      signupCred: {
        username: 'john',
        password: 'john',
        fullname: 'john',
        picture: '',
      },
      userMsg: '',
    }
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
  },
  methods: {
    setUserImg({ val }) {
      this.signupCred.picture = val
    },
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
          if (this.$router.options.history.state.back === '/login')
            this.$router.push('/edit')
          else this.$router.push('/edit')
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
}
</script>

<style lang="scss">
.upload-user-img-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 5px;
  width: 500px;
}

.img-uploader {
  max-width: 250px;
}

.user-img-preview {
  border: 1px solid black;
  margin-block: 10px;
  max-width: 250px;
  max-height: 250px;
  border-radius: 5px;
}
</style>
