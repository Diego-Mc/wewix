<template>
  <button @click="isChatOpen = !isChatOpen">Click Here To Open Chat</button>

  <section class="wap-chat" v-if="isChatOpen">
    <header v-if="this.user.isAdmin">
      <!-- <nav>
        <ul>
          <li>👧👸👨‍🦱</li>
          <li>®©®</li>
        </ul>
      </nav> -->
      <span class="header-text">
        <small>Hello manager,</small>
        <h3>wiwix chat</h3>
      </span>
      <nav class="guests">
        <span
          class="guest"
          v-for="u in activeUsers"
          :key="u"
          @click="setActiveConversation(u)">
          <!-- Todo Make It Random -->
          <img
            class="guest-avatar"
            src="../../assets/imgs/png-96/avatar1.png" />
          <span>{{ u.unread }}</span>
        </span>
      </nav>
      <!-- <div class="welcome-txt">
        <h1>Hey! 👋</h1>
        <h1>How Could We Help?</h1>
      </div> -->
      <div class="welcome-txt">
        <h1>Hey! 👋</h1>
      </div>
    </header>

    <section
      class="messages"
      v-if="!this.user.isAdmin || (this.user.isAdmin && activeConversation)">
      <article class="message guest">Hello</article>
      <article class="message guest">pls answer me</article>
      <article class="message manager">hey</article>
      <article class="message guest">sup</article>
      <article class="message manager">sup</article>
      <article class="message guest">Hello</article>
      <article class="message guest">pls answer me</article>
      <article class="message manager">hey</article>
      <article class="message guest">sup</article>
      <article class="message manager">sup</article>
      <article class="message guest">Hello</article>
      <article class="message guest">pls answer me</article>
      <article class="message manager">hey</article>
      <article class="message guest">sup</article>
      <article class="message manager">sup</article>
      <article class="message guest">Hello</article>
      <article class="message guest">pls answer me</article>
      <article class="message manager">hey</article>
      <article class="message guest">sup</article>
      <article class="message manager">sup</article>
    </section>
    <!-- <section
      v-for="(msg, idx) in conversations[this.activeConversation]"
      :key="idx">
      <span>{{ msg.from }}:</span>{{ msg.txt }}
    </section> -->

    <form @submit.prevent="sendMsg" class="input">
      <input
        v-if="(activeConversation && this.user.isAdmin) || !this.user.isAdmin"
        @input="sendTypeState"
        type="text"
        v-model="msg.txt"
        placeholder="Your msg" />
      <span v-else>Please Select User To Msg</span>
    </form>
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
    options: Object,
  },
  data() {
    return {
      msg: { txt: '' },
      msgs: [],
      isChatOpen: false,

      conversations: {},
      activeGuests: [],
      activeConversation: null,
      user: this.getUser(),
      chatId: this.options.meta.chatData.chatId,
      isUserTyping: {},
    }
  },
  created() {
    socketService.emit('startConversation', {
      chatId: this.chatId,
      userId: this.user.id,
      adminId: this.user.isAdmin ? this.user.id : '',
    })

    socketService.on('emitToAdmin', (activeUsers) => {
      if (!this.user.isAdmin) return

      this.activeUsers = activeUsers
      socketService.emit('listenAll', {})
    })

    socketService.on('setGuestActiveConversation', (userId) => {
      if (this.user.id !== userId) return

      const user = this.activeUsers.find(
        ({ activeUser }) => activeUser.userId === userId
      )
      this.activeConversation = userId
    })
  },
  unmounted() {
    this.activeGuests = this.activeGuests.filter(
      ({ userId }) => userId !== this.user.id
    )
    socketService.off(SOCKET_EVENT_ADD_MSG, this.addMsg)
  },
  methods: {
    addMsg(msg) {
      if (msg.isFromAdmin) this.activeConversation = msg.id

      if (this.conversations[msg.id]) this.conversations[msg.id].push(msg)
      else this.conversations[msg.id] = [msg]

      const user = this.activeUsers.find(({ userId }) => userId === msg.id)

      console.log(
        'this.activeConversation, user:',
        this.activeConversation,
        user
      )
      if (user && this.activeConversation !== user.userId) user.unread++
    },
    sendMsg() {
      // if (!this.conversations[this.user.id]) this.conversations[this.user.id] = [this.msg]
      // else {
      //   this.conversations[this.user.id].push(this.msg)
      // }

      this.msg.from = 'Davud'
      socketService.emit('addMsg', {
        msg: this.msg,
        activeConversation: this.activeConversation,
      })
      this.msg = { txt: '' }
    },
    getUser() {
      const user = JSON.parse(JSON.stringify(this.$store.getters.loggedinUser))

      if (!user) return { nickname: 'guest', id: Math.random() + '' }

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
    isTyping(user) {
      return this.isUserTyping[user]
    },
    clearTyping(user) {
      this.isUserTyping[user] = false
    },
  },

  computed: {},
}
</script>

<style lang="scss" scoped></style>
