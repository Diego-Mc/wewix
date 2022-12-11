<template>
  <section class="wap-chat-container">
    <section @click="isChatOpen = true" class="chat-icon" v-if="!isChatOpen">
      <i class="bi bi-chat-right-dots"></i>
    </section>
    <section class="wap-chat" v-else>
      <header class="admin-header" v-if="user.isAdmin && !activeConversation">
        <span class="header-text">
          <i @click="isChatOpen = false" class="bi bi-x-lg"></i>
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
        v-else-if="!user.isAdmin || (user.isAdmin && activeConversation)">
        <i
          v-if="user.isAdmin"
          @click="activeConversation = null"
          class="bi bi-arrow-left-short"></i>
        <i
          v-else
          @click="isChatOpen = false"
          class="bi bi-arrow-down-short"></i>
        <img class="guest-avatar" src="../../assets/imgs/png-96/avatar1.png" />
        <!-- <span v-if="isTyping(g.userId)">typing...</span> -->
        <!-- <span v-else-if="isTyping('Admin')">Admin typing...</span> -->
        <span class="header-text">
          <h3 v-if="this.user.isAdmin">Guest 1</h3>
          <h3 v-else>Admin</h3>
        </span>
      </header>

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
    wapId: String,
    owner: Object,
  },
  data() {
    return {
      msg: { txt: '' },
      isChatOpen: false,
      conversations: {},
      activeGuests: [],
      activeConversation: null,
      user: this.getUser(),
      // chatId: this.options?.meta?.chatData?.chatId || this.wapId,
      chatId: null,
      isUserTyping: {},
    }
  },
  created() {
    this.chatId = this.owner
      ? this.owner._id
      : this.$store.getters.editedWap.owner._id
    // this.chatId = this.owner ? this.owner._id : this.wapId
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
      this.activeConversation = msg.id
      if (this.conversations[msg.id]) this.conversations[msg.id].push(msg)
      else this.conversations[msg.id] = [msg]
    },
    sendMsg() {
      this.msg.from = 'Davud'
      socketService.emit('addMsg', {
        msg: this.msg,
        activeConversation: this.activeConversation,
      })
      this.msg = { txt: '' }
    },
    getUser() {
      //TODO VERIFICATION WAPID === USERID
      // // const user = JSON.parse(JSON.stringify(this.$store.getters.loggedinUser))
      //   this.chatId = this.owner
      // ? this.owner._id
      // : this.$store.getters.editedWap.owner._id
      const user = this.owner && utilService.deepCopy(this.owner)
      if (!this.owner) return { nickname: 'guest', id: Math.random() + '' }
      user.isAdmin = true
      user.nickname = 'Admin'
      user.id = user._id
      delete user._id
      return user
    },
    setActiveConversation(g) {
      console.log('this', g)
      const { userId } = g
      this.activeConversation = userId
      // this.user.isAdmin
      // if (g.msgs) this.chatId = g.msgs[0].id
      // this.chatId =
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
  watch: {
    wapId(newWapId) {
      // watch it
      socketService.emit('startConversation', {
        // chatId: newWapId,
        chatId: this.chatId,
        userId: this.user.id,
        adminId: this.user.isAdmin ? this.user.id : '',
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>