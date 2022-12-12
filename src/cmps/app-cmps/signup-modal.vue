<template>
  <div class="auth-modal">
    <h2 class="auth-header">{{ msg }}</h2>
    <h5>Profile Picture</h5>
    <div class="upload-user-img-container">
      <img
        title="Upload your image"
        class="user-img-preview upload-img-item"
        :src="signupCred.picture ? signupCred.picture : 'https://e7.pngegg.com/pngimages/224/826/png-clipart-computer-icons-anonymity-person-icon-cdr-face.png'"
        alt="" />
      <upload-section
      title="Upload your image"

        @select="setUserImg"
        class="img-uploader upload-img-item" />
    </div>
    <div class="auth-form-container">
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
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import uploadSection from '../main-editor/cmp-edit-sections/edit-upload-section.vue'
import Chance from 'chance'

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
        username: this.getRandName(),
        password: 'john',
        fullname: this.getRandName(),
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
    getRandName(){
      var chance = new Chance()
      return chance.name().split(' ')[0]
    },
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
  width: 500px;
  height: 140px;
  position: relative;
  .el-upload-dragger {
    padding-block: 10px !important;
  }
}
.upload-img-item {
  width: 150px;
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
}
.upload-user-img-container .img-uploader{
  opacity: 0;
}
.user-img-preview-container {
  position: relative;
  display: flex;
  justify-content: center;
}
.user-img-preview {
  margin-block: 10px;
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>
