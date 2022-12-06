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
      <li v-for="(msg, idx) in msgs" :key="idx">
        <span>{{ msg.from }}:</span>{{ msg.txt }}
      </li>
    </ul>
    <form @submit.prevent="sendMsg">
      <input type="text" v-model="msg.txt" placeholder="Your msg" />
      <button>Send</button>
    </form>

  </section>
</template>

<script>
import {
  socketService,
  SOCKET_EMIT_SEND_MSG,
  SOCKET_EVENT_ADD_MSG,
} from '../../services/socket.service'


export default {
  props: {
    options: Object
  },
  data() {
    return {
      msg: {txt: '' },
      msgs: [],
      isChatOpen: false,
      wapId: this.options.meta.chatData.chatId,
      guestId: Math.random() + '',
      userNickname: (Math.random() > 0.5) ? 'Guest' : this.options.meta.chatData.adminName
    }
  },
  created() {
    socketService.emit('startConversation', {wapId: this.wapId, guestId: this.guestId})
    socketService.on('addMsg', this.addMsg)
  },
  unmounted() {
    socketService.off(SOCKET_EVENT_ADD_MSG, this.addMsg)
  },
  methods: {
    addMsg(msg) {
      this.msgs.push(msg)
    },
    sendMsg() {
      this.msg.from = this.userNickname
      socketService.emit('addMsg', this.msg)
      this.msg = { txt: '' }
    },
  },
}
</script>

<style lang="scss" scoped>
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
