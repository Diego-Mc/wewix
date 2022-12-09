<template>
  <main class="wap" :style="{ fontFamily: 'SpaceGrotesk' }">
    <component
      v-if="wap"
      v-for="cmp in wap.cmps"
      :is="cmp.type"
      :cmpId="cmp.id"
      :typeId="cmp.typeId"
      :info="cmp.info"
      :options="cmp.options"
      :cmps="cmp.cmps" />

    <section v-if="showErrPage">
      <page-not-found />
    </section>
  </main>
</template>

<script>
import wapHeader from '../cmps/wap-sections/wap-header.vue'
import wapHero from '../cmps/wap-sections/wap-hero.vue'
import wapCards from '../cmps/wap-sections/wap-cards.vue'
import wapSection from '../cmps/wap-sections/wap-section.vue'
// import wapForm from '../cmps/wap-sections/wap-form.vue'
import wapChat from '../cmps/wap-items/wap-chat.vue'
import { eventBus } from '../services/event-bus.service'
import pageNotFound from './page-not-found.vue'
//   import getCmp from '../../services/wap-cmps.service'
//   import editorBtnGroup from '../main-editor/editor-items/editor-btn-group.vue'
//   import mainHeader from '../app-cmps/main-header.vue'
//   import editorHeader from '../main-editor/editor-header.vue'
//   import editorSidebar from '../main-editor/editor-sidebar.vue'

export default {
  data() {
    return {
      wap: null,
      showErrPage: false,
      userInfo: {},
      // header: getCmp('wap-header', 2),
      // hero: getCmp('wap-hero', 2),
      // cards: getCmp('wap-cards', 2),
      // section: getCmp('wap-section', 2),
      // section2: getCmp('wap-section', 3),
      // section3: getCmp('wap-section', 4),
      // form: getCmp('wap-form', 1),
    }
  },
  async created() {
    const { preview } = this.$route.query
    if (preview) {
      const id = this.$route.params.name
      await this.getWap(id)
     
    } else {
      const wapName = this.$route.params.name
      await this.getWapByName(wapName)
      this.checkNewVisit()
      eventBus.on('formSubmited', this.addUserInfo)
    }
    this.$store.commit('setEditMode', { isEditMode: false })

  },
  unmounted() {
    eventBus.off('formSubmited')
  },
  methods: {
    async getWapByName(wapName) {
      this.wap = await this.$store.dispatch({ type: 'getWapByName', wapName })
      if (!this.wap) this.showErrPage = true
      console.log('chat data' ,this.wap.chatData);
    },
    
    async updateWap() {
      return await this.$store.dispatch({ type: 'updateWap', wap: this.wap })
    },

    async getWap(wapId) {
      this.wap = await this.$store.dispatch({ type: 'getWap', id: wapId })
      if (!this.wap) this.showErrPage = true
      this.$store.commit('setCurrWap', { wap: this.wap })
    },

    async addUserInfo(userInfo) {
      if (userInfo.type === 'subscription')
        this.wap.usersData.subscriptions.push(userInfo)
      else this.wap.usersData.contacts.push(userInfo)
      try {
        await this.updateWap()
        this.$notify({
          title: 'Message sent successfully',
          type: 'success',
        })
      } catch (error) {
        this.$notify({
          title: 'Couldn\'t send message',
          type: 'error',
        })
      }
    },
    checkNewVisit() {
      if (!sessionStorage.getItem('newVisit', 'new!')) {
        const currVisit = { createdAt: Date.now() }
        this.wap.visits
          ? this.wap.visits.push(currVisit)
          : (this.wap.visits = [currVisit])
        sessionStorage.setItem('newVisit', 'new!')
        console.log('new visit!', this.wap.visits)
        this.updateWap()
      }
    },
  },

  components: {
    wapHeader,
    wapHero,
    wapCards,
    wapSection,
    wapChat,
    pageNotFound,
    //   wapForm,
    //   editorBtnGroup,
    //   mainHeader,
    //   editorHeader,
    //   editorSidebar,
  },
}
</script>

<style lang="scss" scoped></style>
