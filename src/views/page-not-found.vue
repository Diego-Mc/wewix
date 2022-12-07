<template>
  <app-header></app-header>
  <main style="display:flex;align-items:center;flex-direction:column;">
    <img style="width: 500px" src="../assets/imgs/error-page.webp" alt="" />
    <h1>page not found</h1>
  </main>
</template>

<script>
import appHeader from '../cmps/app-cmps/app-header.vue'

export default {
  components: {
    appHeader,
  },
}
</script>
