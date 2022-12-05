<template>
  <section>
    <user-msg />
    <router-view />
  </section>
</template>

<script>
import { store } from './store/store'
import userMsg from './cmps/app-cmps/user-msg.vue'
import { userService } from './services/user.service'

export default {
  created() {
    console.log('Vue App created')
    const user = userService.getLoggedinUser()
    if (user) store.commit({ type: 'setLoggedinUser', user })
  },
  components: {
    userMsg,
  },
}
</script>
