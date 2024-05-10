<template>
  <div v-if="authModal.isShown" class="auth-edit-mode-modal">
    <div>
      <button @click="authModal.isShown = false">X</button>
    </div>

    <login-modal
      v-if="authModal.isShown === 'login'"
      @authenticated="publishWap"
      @swapAuthModal="swapAuthModal"
      :msg="authModal.loginMsg"
      :destPage="authModal.destPage" />

    <signup-modal
      v-else
      @authenticated="publishWap"
      @swapAuthModal="swapAuthModal"
      :msg="authModal.signupMsg"
      :destPage="authModal.destPage" />
  </div>

  <main-header @dashboardLinkClicked="dashboardLinkClicked" />
  <main class="templates-page">
    <h2 class="template-page-header">Choose a template for your website</h2>
    <section class="templates">
      <article
        v-for="template in templates"
        class="template"
        :class="{ emptyTemplate: !template.id }"
        @mouseenter="isHover[template.name] = true"
        @mouseleave="isHover[template.name] = false">
        <div class="template-actions" @click="openEditor(template.id)">
          <button
            v-if="template.id"
            class="preview-btn"
            @click.stop="preview(template.id)">
            PREVIEW
          </button>
          <button class="edit-btn" @click.stop="openEditor(template.id)">
            EDIT
          </button>
        </div>

        <div v-if="template.id" class="img-container">
          <img :src="template.img" alt="" class="template-preview-img" />
        </div>

        <div class="template-name-container">
          <h2>{{ template.name }}</h2>
          <p v-if="template.type">{{ template.type }}</p>
        </div>
      </article>
    </section>
  </main>
</template>

<script>
import appHeader from '../cmps/app-cmps/app-header.vue'
import mainHeader from '../cmps/app-cmps/main-header.vue'
import loginModal from '../cmps/app-cmps/login-modal.vue'
import signupModal from '../cmps/app-cmps/signup-modal.vue'
export default {
  components: { appHeader, mainHeader, loginModal, signupModal },
  data() {
    return {
      isHover: {},
      authModal: {
        isShown: false,
        loginMsg: '',
        signupMsg: '',
      },
    }
  },
  methods: {
    openEditor(templateId) {
      this.$router.push({ path: '/edit/', query: { templateId } })
    },
    dashboardLinkClicked() {
      if (this.loggedinUser) this.$router.push('/dashboard')
      else {
        this.setAuthModalMsg('dashboard')
        this.authModal.isShown = 'login'
      }
    },
    setAuthModalMsg(destinationPage) {
      if (destinationPage === 'dashboard') {
        this.authModal.loginMsg = 'Login to view dashboard'
        this.authModal.signupMsg = 'Signup  to view dashboard'
      } else {
        this.authModal.loginMsg = 'Login to publish website'
        this.authModal.signupMsg = 'Signup to publish website'
      }
      this.authModal.destPage = destinationPage
    },
    swapAuthModal(modalType) {
      this.authModal.isShown = modalType
    },
    preview(id) {
      this.$router.push(`/${id}`)
      // const route = `/template${parseInt(id)}`
      // this.$router.push(`/${id}`)
    },
  },

  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
    templates() {
      return [
        {
          name: 'Start from scratch',
          id: '',
          img: './src/assets/imgs/templates-template.jpg',
          type: '',
          detalis: 'Build a website from scratch.',
        },
        {
          name: 'Product',
          id: 'template1',
          img: 'https://res.cloudinary.com/wewix/image/upload/v1670428298/site-previews/goby-preview-site_hiwx9v.png',
        },
        {
          name: 'Local Business',
          id: 'template2',
          img: 'https://res.cloudinary.com/wewix/image/upload/v1670428298/site-previews/yoga-preview-site_lig7fy.png',
        },
        {
          name: "Sport's shop",
          id: 'template3',
          img: 'https://res.cloudinary.com/wewix/image/upload/v1670428300/site-previews/kite-preview-site_aowkrp.png',
        },
        {
          name: 'Food truck',
          id: 'template4',
          img: 'https://res.cloudinary.com/wewix/image/upload/v1670428296/site-previews/plantify-preview-site_lfoxvp.png',
        },
      ]
    },
  },
}
</script>

<style lang="scss">
// .template-page-header {
//   margin-top: 50px;
//   text-align: center;
// }
// .templates {
//   grid-gap: 50px;
//   display: grid;
//   gap: 50px;
//   grid-template-columns: repeat(auto-fill, minmax(200px, 250px));
//   grid-auto-rows: 350px;
//   justify-content: center;
//   padding: 0 6%;
//   margin-block-start: 50px;

//   .template-preview-img {
//     border-radius: 8px 8px 0 0px;
//   }

//   .template {
//     box-shadow: 0.5px 0.5px 7px 0.1px #505050;
//     border-radius: 8px;
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     // -webkit-line-break: ;
//   }
//   .emptyTemplate {
//     background-color: white;
//   }
//   .emptyTemplate:after {
//     content: '+';
//     position: absolute;
//     width: 10px;
//     top: 6;
//     left: 50%;
//     top: 100%;
//     margin-left: -5px;
//   }
// }

// .v-enter-active,
// .v-leave-active {
//   transition: opacity 50s ease;
// }

// .v-enter-from,
// .v-leave-to {
//   opacity: 0;
// }

// .template-details {
//   opacity: 50%;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   height: 100%;
//   flex-direction: column;
//   padding-block: 20px;
// }

// .template-name-container {
//   align-self: center;
//   line-height: 60px;
//   border-top: 1px solid #e7e7e7;
//   width: 100%;
//   text-align: center;
// }
</style>
