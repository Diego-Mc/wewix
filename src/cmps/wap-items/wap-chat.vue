<template>
  <button @click="(isChatOpen = !isChatOpen)">Click Here To Open Chat</button>

  <section class="wap-chat" v-if="isChatOpen">
    <header>
      <nav>
        <ul>
          <li>
            👧👸👨‍🦱
          </li>
          <li>
            ®©®
          </li>
        </ul>
      </nav>
      <div class="welcome-txt">
        <h1>Hey! 👋</h1>
        <h1>How Could We Help?</h1>
      </div>
    </header>


    <hr />
    <ul>
      <li v-for="(msg, idx) in conversations[this.activeConversation]" :key="idx">
        <span>{{ msg.from }}:</span>{{ msg.txt }}
      </li>
    </ul>
    <form @submit.prevent="sendMsg">
      <input type="text" v-model="msg.txt" placeholder="Your msg" />
      <button>Send</button>
    </form>
    
    <span v-for="u in activeUsers" :key="u" @click="setActiveConversation(u)">
      <!-- Todo Make It Random -->
      <img class="guest-avatar" src="../../assets/imgs/png-96/avatar1.png">
      <span>{{u.unread}}</span>
    </span>
  </section>
</template>

<script>
import {
  socketService,
  SOCKET_EMIT_SEND_MSG,
  SOCKET_EVENT_ADD_MSG,
} from '../../services/socket.service'
import { utilService } from '../../services/util.service'


export default {
  props: {
    options: Object
  },
  data() {
    return {
      msg: {txt: '' },
      msgs: [],
      isChatOpen: false,

      conversations: {},
      activeUsers: [],
      activeConversation: null,
      user: this.getUser(),
      chatId: this.options.meta.chatData.chatId,
    }
  },
  created() {
    socketService.emit('startConversation', {
      chatId: this.chatId, 
      userId: this.user.id, 
      adminId: (this.user.isAdmin) ? this.user.id : ''
    })

    socketService.on('emitToAdmin', (activeUsers) => {
        if (!this.user.isAdmin) return

        this.activeUsers = activeUsers
        socketService.emit('listenAll', {})
    })

    socketService.on('addMsg', this.addMsg)

    socketService.on('setGuestActiveConversation', (userId) => {
        if (this.user.id !== userId) return

        const user = this.activeUsers.find(({activeUser}) => activeUser.userId === userId)
        this.activeConversation = userId
    })

  },
  unmounted() {
    socketService.off(SOCKET_EVENT_ADD_MSG, this.addMsg)
  },
  methods: {
    addMsg(msg) {
      this.msgs.push(msg)
      if (this.conversations[msg.id]) this.conversations[msg.id].push(msg)
      else this.conversations[msg.id] = [msg]

      const user = this.activeUsers.find(({userId}) => userId === msg.id)
      
      console.log('this.activeConversation, user:', this.activeConversation, user)
      if (user && (this.activeConversation !== user.userId)) user.unread++

    },
    sendMsg() {
      this.msg.from = this.user.userNickname
      socketService.emit('addMsg', this.msg)
      this.msg = { txt: '' }
    },
    getUser() {
        const user = JSON.parse(JSON.stringify(this.$store.getters.loggedinUser))

        if (!user) return {nickname: 'guest', id: Math.random() + ''}

        user.isAdmin = true
        user.nickname = 'Admin'
        user.id = user._id

        delete user._id
        console.log('user:', user)
        return user       
    },
    setActiveConversation(user) {
        this.activeConversation = user.userId
        user.unread = 0
        socketService.emit('activateConversation', user.userId)
    },
    avatar() { 
      return '../../assets/imgs/png-96/avatar1.png'
    },
  },

  computed: {
  }

}
</script>

<style lang="scss" scoped>
.guest-avatar {
    height: 50px;
}
.wap-chat {
  position: fixed;
  bottom: 25px;
  right: 25px;
  height: 400px;
  width: 350px;
  background-color: lightblue;
  padding: 10px;

  nav ul {
    display: flex;
    justify-content: space-between;
    margin-block: 0;
    padding-inline: 0;
  }

  .welcome-txt {
    margin-block-start: 50px;
  }
}
</style>
