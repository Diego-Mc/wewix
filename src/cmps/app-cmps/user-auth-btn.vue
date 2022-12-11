<template>
  <section class="user-auth">
    <el-dropdown
      v-if="loggedinUser"
      trigger="click"
      split-button
      type="primary"
      class="user-options"
      @click="$router.push('/dashboard')">
      <span class="info">
        
        <img v-if="loggedinUser.picture" :src="loggedinUser.picture" alt="" />
        <i v-else class="bi bi-person-circle"></i>
        Login

        {{ loggedinUser.fullname + "'s Dashboard" }}
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="$router.push('/dashboard')">
            Dashboard
          </el-dropdown-item>
          <el-dropdown-item @click="doLogout"> Log out </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <section class="login-options" v-else>
      <router-link :to="'/login/'" v-if="!btnsToShow || btnsToShow.login">
        <button class="login-btn"><i class="bi bi-person"></i> Login</button>
      </router-link>
      <router-link :to="'/signup/'" v-if="!btnsToShow || btnsToShow.signup">
        <button class="register-btn">Sign up for free</button>
      </router-link>
    </section>
  </section>
</template>

<script>
export default {
  props: ['loggedinUser', 'btnsToShow'],
  methods: {
    doLogout() {
      this.$store.dispatch({ type: 'logout' })
    },
  },
}
</script>

<style lang="scss" scoped></style>
