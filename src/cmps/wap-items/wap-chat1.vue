<template>
  <section class="wap-chat-container">
    <section @click="isChatOpen = true" class="chat-icon" v-if="!isChatOpen">
      <i class="bi bi-chat-right-dots"></i>
    </section>

    <section class="wap-chat" v-else>
      <header class="admin-header" v-if="owner && !currGuest">
        <span class="header-text">
          <i @click="isChatOpen = false" class="bi bi-x-lg"></i>
          <small>Hello manager,</small>
          <h3>Live chat</h3>
        </span>
        <section
          v-for="(chat, siteName) in adminChats"
          class="site-chats-preview">
          <article class="site-chat-preview">
            <!-- <h4>site name: {{ siteName }}</h4> -->
            <!-- <pre>{{ adminChats }}</pre> -->
            <nav class="guests">
              <span
                v-for="(guest, idx) in chat"
                class="guest-icon"
                :key="guest.guestId"
                @click="adminChatWith(guest, siteName, idx)">
                <img
                  class="guest-avatar"
                  src="../../assets/imgs/png-96/avatar1.png" />
                <span class="unread notification" v-if="guest.unread">{{
                  guest.unread
                }}</span>
                <!-- //TODO: remove unread by entering (not by answering) -->
              </span>
            </nav>
          </article>
        </section>
      </header>

      <header class="in-chat" v-else-if="!owner || (owner && currGuest)">
        <i
          v-if="owner"
          @click="currGuest = null"
          class="bi bi-arrow-left-short"></i>
        <i
          v-else
          @click="isChatOpen = false"
          class="bi bi-arrow-down-short"></i>
        <img class="guest-avatar" src="../../assets/imgs/png-96/avatar1.png" />
        <span class="header-text">
          <h3 v-if="owner">Guest {{ currGuest.guestId }}</h3>
          <h3 v-else>Admin</h3>
        </span>
      </header>

      <section class="messages" ref="adminMsgs" v-if="owner && currGuest">
        <div class="time">{{ currGuest?.createdAt || 'Today at now' }}</div>
        <article
          v-for="(msg, idx) in adminChats[currSiteName][currGuestIdx]?.msgs"
          :key="idx"
          class="message"
          :class="{ manager: msg.from === 'Admin' }">
          {{ msg.txt }}
        </article>
        <article
          v-if="isTyping[currGuest?.guestId]"
          class="message typing-indicator">
          <div class="typing typing-1"></div>
          <div class="typing typing-2"></div>
          <div class="typing typing-3"></div>
        </article>
      </section>
      <section class="messages" ref="guestMsgs" v-if="!owner">
        <div class="time">{{ guestChat.createdAt || 'Today at now' }}</div>
        <article
          v-for="(msg, idx) in guestChat"
          :key="idx"
          class="message"
          :class="{ manager: msg.from !== 'Admin' }">
          {{ msg.txt }}
        </article>
        <article v-if="isTyping?.admin" class="message typing-indicator">
          <div class="typing typing-1"></div>
          <div class="typing typing-2"></div>
          <div class="typing typing-3"></div>
        </article>
      </section>

      <form
        v-if="
          (currGuest &&
            owner &&
            adminChats[currSiteName][currGuestIdx]?.msgs) ||
          !owner
        "
        @submit.prevent="sendMsg"
        class="input">
        <input
          @input="typing"
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
// import {
//   socketService,
//   SOCKET_EMIT_SEND_MSG,
//   SOCKET_EVENT_ADD_MSG,
// } from '../../services/socket.service'
// import { utilService } from '../../services/util.service'

import { socketService } from '../../services/socket.service'
import { utilService } from '../../services/util.service'

export default {
  props: {
    wapId: String,
    owner: Object,
  },
  data() {
    return {
      currGuest: null,
      isChatOpen: false,
      msg: { txt: '', from: this.owner ? 'Admin' : 'Guest' },
      guestId: utilService.makeId(),
      adminChats: {},
      guestChat: [],
      isTyping: {
        admin: false,
      },

      currGuestIdx: null,
      currSiteName: null,
      //old:
      // msg: { txt: '' },
      // conversations: {},
      // activeGuests: [],
      // user: this.getUser(),
      // chatId: this.options?.meta?.chatData?.chatId || this.wapId,
      // chatId: null,
      // isUserTyping: {},
    }
  },
  updated() {
    // const elMsgs = this.owner ? this.$refs.adminMsgs : this.$refs.guestMsgs
    // if (elMsgs?.scrollTop) {
    //   console.log('hr')
    //   elMsgs.scrollTop = elMsgs.lastElementChild.offsetTop
    // }
    // if (this.$el) {
    //   var messages = this.$el.querySelector('.messages')
    //   messages.scrollTop = messages.scrollHeight
    // }
    this.$nextTick(this.scrollToEnd)
  },
  created() {
    socketService.emit('joinChat', {
      fromWap: this.wapName,
      guestId: this.guestId,
      adminRoom: this.owner?._id || this.$store.getters.editedWap.owner._id,
      isOwner: this.owner,
    })

    socketService.on('updateAdminGuestData', (guestData) => {
      this.adminChats = guestData.reduce((adminChats, currGuestData) => {
        if (adminChats[currGuestData.fromWap])
          adminChats[currGuestData.fromWap].push(currGuestData)
        else adminChats[currGuestData.fromWap] = [currGuestData]
        return adminChats
      }, {})
    })

    socketService.on('updateGuestMsgs', (msgs) => {
      this.guestChat = msgs
    })

    socketService.on('initTyping', (guest) => {
      if (!guest) {
        this.isTyping.admin = true
      } else {
        this.isTyping[guest] = true
        console.log('this.isTyping[guest]:', this.isTyping)
      }

      this.clearTyping()
    })

    this.clearTyping = utilService.debounce(this.clearTyping)
    // this.chatId = this.owner
    //   ? this.owner._id
    //   : this.$store.getters.editedWap.owner._id
    // this.chatId = this.owner ? this.owner._id : this.wapId
    // socketService.emit('startConversation', {
    //   chatId: this.chatId,
    //   userId: this.user.id,
    //   adminId: this.user.isAdmin ? this.user.id : '',
    // })
    // socketService.on('updateGuests', (data) => {
    //   if (Array.isArray(data)) {
    //     this.activeGuests = data
    //     this.conversations = this.activeGuests.reduce((updatedGuest, guest) => {
    //       updatedGuest[guest.userId] = guest.msgs
    //       return updatedGuest
    //     }, {})
    //   } else if (typeof data === 'object' && data !== null)
    //     this.activeGuests.push(data)
    // })
    // socketService.on('addGuestMsg', this.addMsg)
    // socketService.on('addAdminMsg', this.addMsg)
    // socketService.on('addOwnMsg', this.addMsg)
    // socketService.on('typing', (user) => {
    //   this.isUserTyping[user] = true
    //   this.clearTyping(user)
    // })
    // this.clearTyping = utilService.debounce(this.clearTyping)
  },
  unmounted() {
    // this.activeGuests = this.activeGuests.filter(
    //   ({ userId }) => userId !== this.user.id
    // )
    // socketService.off(SOCKET_EVENT_ADD_MSG, this.addMsg)
  },
  methods: {
    scrollToEnd() {
      const elMsgs = document.querySelector('.messages')
      if (!elMsgs) return
      console.log('check', elMsgs, elMsgs?.scrollHeight)
      const scrollHeight = elMsgs.scrollHeight
      elMsgs.scrollTop = scrollHeight
    },
    sendMsg() {
      socketService.emit('addMsg', this.msg)
      this.msg.txt = ''
    },
    adminChatWith(guest, siteName, idx) {
      //TODO: maybe i should break pointer?
      this.currGuestIdx = idx
      this.currSiteName = siteName
      this.currGuest = guest
      socketService.emit('adminChatWith', guest.guestId)
    },
    avatar() {
      return '../../assets/imgs/png-96/avatar1.png'
    },
    typing() {
      socketService.emit('typing', {})
    },
    clearTyping() {
      this.isTyping = {}
    },
    // addMsg(msg) {
    //   this.activeConversation = msg.id
    //   if (this.conversations[msg.id]) this.conversations[msg.id].push(msg)
    //   else this.conversations[msg.id] = [msg]
    // },
    // sendMsg() {
    //   this.msg.from = 'Davud'
    //   socketService.emit('addMsg', {
    //     msg: this.msg,
    //     activeConversation: this.activeConversation,
    //   })
    //   this.msg = { txt: '' }
    // },
    // getUser() {
    //   //TODO VERIFICATION WAPID === USERID
    //   // // const user = JSON.parse(JSON.stringify(this.$store.getters.loggedinUser))
    //   //   this.chatId = this.owner
    //   // ? this.owner._id
    //   // : this.$store.getters.editedWap.owner._id
    //   const user = this.owner && utilService.deepCopy(this.owner)
    //   if (!this.owner) return { nickname: 'guest', id: Math.random() + '' }
    //   user.isAdmin = true
    //   user.nickname = 'Admin'
    //   user.id = user._id
    //   delete user._id
    //   return user
    // },
    // setActiveConversation(g) {
    //   console.log('this', g)
    //   const { userId } = g
    //   this.activeConversation = userId
    //   // this.user.isAdmin
    //   // if (g.msgs) this.chatId = g.msgs[0].id
    //   // this.chatId =
    //   socketService.emit('activateChat', this.activeConversation)
    // },
    // sendTypeState() {
    //   socketService.emit('typing', this.user.id)
    // },
    // avatar() {
    //   return '../../assets/imgs/png-96/avatar1.png'
    // },
    // isTyping(user) {
    //   return this.isUserTyping[user]
    // },
    // clearTyping(user) {
    //   this.isUserTyping[user] = false
    // },
  },
  // watch: {
  //   wapId(newWapId) {
  //     // watch it
  //     socketService.emit('startConversation', {
  //       // chatId: newWapId,
  //       chatId: this.chatId,
  //       userId: this.user.id,
  //       adminId: this.user.isAdmin ? this.user.id : '',
  //     })
  //   },
  // },
}
</script>

<style lang="scss" scoped></style>
