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
import { socketService } from './services/socket.service.js'
import { ElMessage } from 'element-plus'

export default {
  mounted() {
    const user = userService.getLoggedinUser()
    if (user) store.commit({ type: 'setLoggedinUser', user })
    console.log('root cmp mounted');
    socketService.on('formSent', (sentMsg) => {
      console.log('soket')
    console.log(this.$store.getters.loggedinUser._id)

      if (sentMsg.wapOwnerId === this.$store.getters.loggedinUser._id) {
        ElMessage({
          message: `You have a new lead from site '${sentMsg.wapName}''`,
          type: 'success',
        })
      }
    })
  },
  unmounted() {
    console.log('root cmp unmounted');

    socketService.off('formSent')
  },
  components: {
    userMsg,
  },
}
</script>
