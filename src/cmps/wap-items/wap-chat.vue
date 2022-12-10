<template>
    <button @click="log">Log</button>    


</template>
  
<script>
import { socketService } from '../../services/socket.service'
import { utilService } from '../../services/util.service'

export default {
    props: {
        owner: Object,
        options: Object
    },
    data() {
        return {
            chatRoom: this.options?.meta?.chatData?.chatId
        }
    },
    created() {
    },
    unmounted() {
    },
    methods: {
        addMsg() {
        },
        sendMsg() {
        },
        setActiveConversation(g) {
        },
        sendTypeState() {
        },
        avatar() {
            return '../../assets/imgs/png-96/avatar1.png'
        },
        isTyping() {
        },
        clearTyping() {
        },
        log() {
            console.log('this.owner, this.chatRoom', this.owner, this.chatRoom)
        }
    },

}
</script>
  