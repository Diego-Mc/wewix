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

    <!-- <label>
      <input type="radio" value="Politics" v-model="topic" @change="changeTopic" />
      Politics
    </label>
    <label>
      <input type="radio" value="Love" v-model="topic" @change="changeTopic" />
      Love
    </label> -->
  </section>
</template>

<script>
import {
  socketService,
  SOCKET_EMIT_SEND_MSG,
  SOCKET_EVENT_ADD_MSG,
  SOCKET_EMIT_SET_TOPIC,
} from '../../services/socket.service'

export default {
  data() {
    return {
      msg: { from: 'Guest', txt: '' },
      msgs: [],
      topic: 'Love',
      isChatOpen: false
    }
  },
  created() {
    socketService.setup()
    // socketService.emit(SOCKET_EMIT_SET_TOPIC, this.topic)
    socketService.on(SOCKET_EVENT_ADD_MSG, this.addMsg)
  },
  unmounted() {
    socketService.off(SOCKET_EVENT_ADD_MSG, this.addMsg)
    // socketService.terminate()
  },
  methods: {
    addMsg(msg) {
      this.msgs.push(msg)
    },
    sendMsg() {
      console.log('Sending', this.msg)
      // TODO: next line not needed after connecting to backend
      this.addMsg(this.msg)
      setTimeout(()=>this.addMsg({from: 'Dummy', txt: 'Yey'}), 2000)
      const user = userService.getLoggedinUser()
      const from = (user && user.fullname) || 'Guest'
      this.msg.from = from
      socketService.emit(SOCKET_EMIT_SEND_MSG, this.msg)
      this.msg = { from, txt: '' }
    },
    // changeTopic() {
    //   socketService.emit(SOCKET_EMIT_SET_TOPIC, this.topic)
    // },
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
