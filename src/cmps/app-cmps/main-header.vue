<template>
  <!-- <header class="main-header">
    <section class="edit-options"></section>
    <section class="logo">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 0.875C0 0.391751 0.364805 0 0.814815 0H10.1852C10.6352 0 11 0.391751 11 0.875V6.125C11 6.60825 10.6352 7 10.1852 7H0.814815C0.364805 7 0 6.60825 0 6.125V0.875Z"
          fill="currentColor" />
        <path
          d="M24 23.1765C24 23.6313 23.6352 24 23.1852 24L13.8148 24C13.3648 24 13 23.6313 13 23.1765L13 17.8235C13 17.3687 13.3648 17 13.8148 17L23.1852 17C23.6352 17 24 17.3687 24 17.8235L24 23.1765Z"
          fill="currentColor" />
        <path
          d="M0 9.83333C0 9.3731 0.364805 9 0.814815 9H10.1852C10.6352 9 11 9.3731 11 9.83333V23.1667C11 23.6269 10.6352 24 10.1852 24H0.814815C0.364805 24 0 23.6269 0 23.1667V9.83333Z"
          fill="currentColor" />
        <path
          d="M24 14.1429C24 14.6162 23.6352 15 23.1852 15L13.8148 15C13.3648 15 13 14.6162 13 14.1429L13 0.857142C13 0.383755 13.3648 -4.86981e-07 13.8148 -4.4764e-07L23.1852 3.71544e-07C23.6352 4.10885e-07 24 0.383756 24 0.857143L24 14.1429Z"
          fill="currentColor" />
      </svg>
      <h1>wewix</h1>
    </section>
    <div class="auth-info">Diego Mc</div>
  </header> -->

  <header class="app-header main-header">
    <section class="logo" @click.stop="$router.push('/')">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0 0.875C0 0.391751 0.364805 0 0.814815 0H10.1852C10.6352 0 11 0.391751 11 0.875V6.125C11 6.60825 10.6352 7 10.1852 7H0.814815C0.364805 7 0 6.60825 0 6.125V0.875Z"
          fill="currentColor" />
        <path
          d="M24 23.1765C24 23.6313 23.6352 24 23.1852 24L13.8148 24C13.3648 24 13 23.6313 13 23.1765L13 17.8235C13 17.3687 13.3648 17 13.8148 17L23.1852 17C23.6352 17 24 17.3687 24 17.8235L24 23.1765Z"
          fill="currentColor" />
        <path
          d="M0 9.83333C0 9.3731 0.364805 9 0.814815 9H10.1852C10.6352 9 11 9.3731 11 9.83333V23.1667C11 23.6269 10.6352 24 10.1852 24H0.814815C0.364805 24 0 23.6269 0 23.1667V9.83333Z"
          fill="currentColor" />
        <path
          d="M24 14.1429C24 14.6162 23.6352 15 23.1852 15L13.8148 15C13.3648 15 13 14.6162 13 14.1429L13 0.857142C13 0.383755 13.3648 -4.86981e-07 13.8148 -4.4764e-07L23.1852 3.71544e-07C23.6352 4.10885e-07 24 0.383756 24 0.857143L24 14.1429Z"
          fill="currentColor" />
      </svg>
      <h1>wewix</h1>
    </section>
    <nav class="nav">
      <router-link to="/">Home</router-link>
      <router-link to="/templates">Templates</router-link>
      <a @click.stop="dashboardLinkClicked">Dashboard</a>
    </nav>
    <Slide noOverlay right :closeOnNavigation="true" class="burger">
      <router-link to="/">Home</router-link>
      <router-link to="/templates">Templates</router-link>
      <a @click.stop="dashboardLinkClicked">Dashboard</a>
    </Slide>
    <section class="user-auth">
      <h3 v-if="loggedinUser">
        logged in user : {{ loggedinUser.fullname }}
        <button @click="doLogout">Log out</button>
      </h3>
      <router-link v-else to="/login/">
        <button class="login-btn"><i class="bi bi-person"></i> login</button>
      </router-link>
    </section>
  </header>
</template>

<script>
import editorBtnGroup from '../main-editor/editor-items/editor-btn-group.vue'
import { Slide } from 'vue3-burger-menu'
export default {
  components: {
    editorBtnGroup,
    Slide,
  },
  methods: {
    log(data) {
      console.log(data)
    },
    doLogout() {
      this.$store.dispatch({ type: 'logout' })
    },
    dashboardLinkClicked() {
      this.$emit('dashboardLinkClicked')
    },
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
  },
}
</script>

<style lang="scss" scoped></style>
