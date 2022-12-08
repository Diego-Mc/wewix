<template>
  <button @click="isChatOpen = !isChatOpen">Click Here To Open Chat</button>

  <section class="wap-chat" v-if="isChatOpen">
    <header
      class="admin-header"
      v-if="this.user.isAdmin && !activeConversation">
      <!-- <nav>
        <ul>
          <li>👧👸👨‍🦱</li>
          <li>®©®</li>
        </ul>
      </nav> -->
      <span class="header-text">
        <small>Hello manager,</small>
        <h3>wewix chat</h3>
      </span>
      <nav class="guests">
        <span
          v-for="g in activeGuests"
          :key="g"
          @click="setActiveConversation(g)">
          <img
            class="guest-avatar"
            src="../../assets/imgs/png-96/avatar1.png" />
          <span>{{ g.unread }}</span>
          <span v-if="isTyping(g.userId)">typing...</span>
          <span v-else-if="isTyping('Admin')">Admin typing...</span>
        </span>
      </nav>
    </header>

    <header
      class="in-chat"
      v-else-if="
        !this.user.isAdmin || (this.user.isAdmin && activeConversation)
      ">
      <i
        v-if="this.user.isAdmin"
        @click="activeConversation = null"
        class="bi bi-arrow-left-short"></i>
      <i v-else @click="isChatOpen = false" class="bi bi-arrow-down-short"></i>
      <img class="guest-avatar" src="../../assets/imgs/png-96/avatar1.png" />
      <!-- <span v-if="isTyping(g.userId)">typing...</span> -->
      <!-- <span v-else-if="isTyping('Admin')">Admin typing...</span> -->
      <span class="header-text">
        <h3 v-if="this.user.isAdmin">Guest 1</h3>
        <h3 v-else>Admin</h3>
      </span>
    </header>

    <!-- <section
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
    </section> -->
    <section
      class="messages"
      v-if="!this.user.isAdmin || (this.user.isAdmin && activeConversation)">
      <article
        v-for="(msg, idx) in conversations[this.activeConversation]"
        :key="idx"
        class="message"
        :class="{ manager: msg.isFromAdmin }">
        {{ msg.txt }}
      </article>
    </section>

    <form
      v-if="(activeConversation && this.user.isAdmin) || !this.user.isAdmin"
      @submit.prevent="sendMsg"
      class="input">
      <input
        @input="sendTypeState"
        type="text"
        v-model="msg.txt"
        placeholder="Your msg" />
    </form>
    <span class="admin-msg" v-else>
      <div class="texts">
        <h3>Hey! 👋</h3>
        <h4>Select a user to start chatting</h4>
      </div>
    </span>
  </section>

  <!-- <section class="wap-chat" v-if="isChatOpen">
    <header>
      <nav>
        <ul>
          <li>👧👸👨‍🦱</li>
          <li>®©®</li>
        </ul>
      </nav>
      <div class="welcome-txt">
        <h1>Hey! 👋</h1>
        <h1>How Could We Help?</h1>
      </div>
    </header>

    <hr />
    <ul>
      <li
        v-for="(msg, idx) in conversations[this.activeConversation]"
        :key="idx">
        <span>{{ msg.from }}:</span>{{ msg.txt }}
      </li>
    </ul>
    <form @submit.prevent="sendMsg">
      <input
        v-if="(activeConversation && this.user.isAdmin) || !this.user.isAdmin"
        @input="sendTypeState"
        type="text"
        v-model="msg.txt"
        placeholder="Your msg" />
      <span v-else>Please Select User To Msg</span>
      <button>Send</button>
    </form>

    <span v-for="g in activeGuests" :key="g" @click="setActiveConversation(g)">
      <img class="guest-avatar" src="../../assets/imgs/png-96/avatar1.png" />
      <span>{{ g.unread }}</span>
      <span v-if="isTyping(g.userId)">typing...</span>
      <span v-else-if="isTyping('Admin')">Admin typing...</span>
    </span>
  </section> -->
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
    socketService.on('updateGuests', (data) => {
      if (Array.isArray(data)) {
        this.activeGuests = data

        this.conversations = this.activeGuests.reduce((updatedGuest, guest) => {
          updatedGuest[guest.userId] = guest.msgs
          return updatedGuest
        }, {})
      } else if (typeof data === 'object' && data !== null)
        this.activeGuests.push(data)
    })
    socketService.on('addGuestMsg', this.addMsg)
    socketService.on('addAdminMsg', this.addMsg)
    socketService.on('addOwnMsg', this.addMsg)
    socketService.on('typing', (user) => {
      this.isUserTyping[user] = true
      this.clearTyping(user)
    })
    this.clearTyping = utilService.debounce(this.clearTyping)
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
      return user
    },
    setActiveConversation({ userId }) {
      this.activeConversation = userId
      socketService.emit('activateChat', this.activeConversation)
    },
    sendTypeState() {
      socketService.emit('typing', this.user.id)
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
