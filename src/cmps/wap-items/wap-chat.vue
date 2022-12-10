<template>
    <section>
        <form @submit.prevent="sendMsg">
            <input type="text" v-model="msg.txt" @input="typing">
        </form>
        <section v-if="owner">
            <div v-for="(chat, key) in adminChats">
                <h2>{{ key }}</h2>
                
                <div v-for="(guest, key) in chat" :key="key" @click="adminChatWith(guest.guestId)"
                    style="cursor: pointer">
                    <h4 v-if="isTyping[guest.guestId]">Typing...</h4>
                    <h3>{{ key }}</h3>
                    
                    <p v-for="msg in guest.msgs">
                        <span>{{ msg.from }}: </span>
                        <span>{{ msg.txt }}: </span>
                    </p>
                </div>
            </div>
        </section>
        <section v-else>
            <h4 v-if="isTyping.admin">Typing...</h4>
            <pre>{{ guestChat }}</pre>
        </section>
    </section>



</template>
  
<script>
import { socketService } from '../../services/socket.service'
import { utilService } from '../../services/util.service'

import Chance from 'chance'
const chance = new Chance()
const ownerSupport = chance.name()

export default {
    props: ['owner', 'wapName'],

    data() {
        return {
            msg: { txt: '', from: (this.owner) ? ownerSupport : 'Guest' },
            guestId: utilService.makeId(),
            adminChats: {},
            guestChat: [],
            isTyping: {
                admin: false
            }
        }
    },
    created() {
        socketService.emit('joinChat', {
            fromWap: this.wapName,
            guestId: this.guestId,
            adminRoom: this.owner?._id || this.$store.getters.editedWap.owner._id,
            isOwner: this.owner
        })

        socketService.on('updateAdminGuestData', guestData => {
            this.adminChats = guestData.reduce((adminChats, currGuestData) => {
                if (adminChats[currGuestData.fromWap]) adminChats[currGuestData.fromWap].push(currGuestData)
                else adminChats[currGuestData.fromWap] = [currGuestData]
                return adminChats
            }, {})
        })

        socketService.on('updateGuestMsgs', msgs => {
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
    },
    unmounted() {
    },
    methods: {
        sendMsg() {
            socketService.emit('addMsg', this.msg)
            this.msg.txt = ''
        },
        adminChatWith(guestId) {
            socketService.emit('adminChatWith', guestId)
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
    },

}
</script>
  