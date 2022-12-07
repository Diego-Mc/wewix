<template #default>
  <section>
    <user-msg />
    <notifications />
    <router-view />
  </section>
</template>

<script>
import { store } from './store/store'
import userMsg from './cmps/app-cmps/user-msg.vue'
import { userService } from './services/user.service'

export default {

  created() {
    const user = userService.getLoggedinUser()
    if (user) store.commit({ type: 'setLoggedinUser', user })
  },
  components: {
    userMsg,
  },
}
</script>
