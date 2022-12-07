<template>
  <app-header />
  <signup-modal @authenticated="authenticated" :isModalInAuthPage="true" :msg="'signup'"/>
</template>

<script>
import appHeader from '../cmps/app-cmps/app-header.vue'
import signupModal from '../cmps/app-cmps/signup-modal.vue'
export default {   
  components: { appHeader , signupModal},
}
</script>
