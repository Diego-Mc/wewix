<template>
  <!-- <wap-chat/> -->
  <!-- <publish-modal/> -->
  <user-confirm-modal
    class="confirm-modal"
    v-if="isConfirmModalOpen"
    :confirmData="confirmData"
    @closelModal="closeConfirmModal"
    @openWorkSpace="openWorkSpace" />

  <cursor v-if="workTogetherCursors[0]" :cursorsData="workTogetherCursors" />
  <div v-if="authModal.isShown" class="auth-edit-mode-modal">
    <div>
      <button @click="authModal.isShown = false">X</button>
    </div>

    <login-modal
      v-if="authModal.isShown === 'login'"
      @authenticated="publishWap"
      @swapAuthModal="swapAuthModal"
      :msg="authModal.loginMsg"
      :destPage="authModal.destPage" />

    <signup-modal
      v-else
      @authenticated="publishWap"
      @swapAuthModal="swapAuthModal"
      :msg="authModal.signupMsg"
      :destPage="authModal.destPage" />
  </div>

  <loading-screen v-if="isLoading" />
  <section
    @drag="sendMouseEvent('drag', $event)"
    @mousemove="sendMouseEvent('move', $event)"
    @mousedown="sendMouseEvent('down', $event)"
    @mouseup="sendMouseEvent('move', $event)"
    class="main-editor"
    v-if="wap && !isLoading">
    <section class="main-editor-tools">
      <main-header @dashboardLinkClicked="dashboardLinkClicked" />
      <!--
         @checkingSiteName="setCheckingSiteName(true)"
        @foundSiteName="setCheckingSiteName(false)"
       -->
      <editor-header
        @setName="setName"
        @setVal="openSocketsConfirm"
        @setMedia="setMedia"
        @publishWap="publishWap"
        @openPublishConfirm=""
        :wapName="wap.name"
        :isPublished="wap.isPublished"
        :wapId="wap._id" />

      <editor-sidebar
        :selectedCmp="selectedCmp"
        @changeOrder="changeOrder"
        @addByClick="addByClick" />
    </section>
    <main class="main-wap" :class="mediaType" ref="mainWap">
      <draggable
        class="list-group"
        :component-data="{
          type: 'transition-group',
          name: !drag ? 'flip-list' : null,
        }"
        @add="cmpAdded($event)"
        :list="wap.cmps"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
        @update="onCmpsChange"
        item-key="id"
        :disabled="!this.$store.getters.isEditMode"
        group="sections">
        <template #item="{ element }">
          <div>
            <component
              :is="element.type"
              :info="element.info"
              :options="element.options"
              :cmps="element.cmps"
              :typeId="element.typeId"
              :cmpId="element.id">
            </component>
          </div>
        </template>
      </draggable>
    </main>
  </section>
</template>

<script>
import draggable from 'vuedraggable'
import { socketService } from '../services/socket.service'

import { ElMessage } from 'element-plus'

import publishModal from '../cmps/app-cmps/publish-modal.vue'

import { eventBus, showUserMsg } from '../services/event-bus.service'
import { httpService } from '../services/http.service'
import getCmp, { wapUtils } from '../services/wap-cmps.service'
import { appEditorService } from '../services/app-editor.service'
import { utilService } from '../services/util.service'

import editorBtnGroup from '../cmps/main-editor/editor-items/editor-btn-group.vue'
import mainHeader from '../cmps/app-cmps/main-header.vue'
import editorHeader from '../cmps/main-editor/editor-header.vue'
import editorSidebar from '../cmps/main-editor/editor-sidebar.vue'
import cursor from '../cmps/app-cmps/cursor.vue'
import userConfirmModal from '../cmps/app-cmps/user-confirm-modal.vue'
import loginModal from '../cmps/app-cmps/login-modal.vue'
import signupModal from '../cmps/app-cmps/signup-modal.vue'

import wapHeader from '../cmps/wap-sections/wap-header.vue'
import wapHero from '../cmps/wap-sections/wap-hero.vue'
import wapCards from '../cmps/wap-sections/wap-cards.vue'
import wapSection from '../cmps/wap-sections/wap-section.vue'
import wapForm from '../cmps/wap-sections/wap-form.vue'
import wapVideo from '../cmps/wap-items/wap-video.vue'
import wapMap from '../cmps/wap-items/wap-map.vue'
import wapChat from '../cmps/wap-items/wap-chat.vue'

import { demoData } from '../services/demo-data'
import Chance from 'chance'

import loadingScreen from '../cmps/app-cmps/loading-screen.vue'
export default {
  data() {
    return {
      wap: null,
      selectedCmp: {},
      drag: false,
      dragOptions: {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      },
      mediaType: 'desktop',

      curserId: utilService.makeId(),
      cursorColor: utilService.getRandomColor(),
      workTogetherCursors: [],
      isSocketsOn: false,

      isConfirmModalOpen: false,
      confirmData: null,
      isLoading: false,
      authModal: {
        isShown: false,
        loginMsg: '',
        signupMsg: '',
      },

      overlayInterval: 0,
    }
  },
  async created() {
    this.onCmpsChange = utilService.debounce(this.onCmpsChange, 500)
    this.$store.commit('setEditMode', { isEditMode: true })
    const authenticeted = await this.loadWap()
    if (!authenticeted) return this.$router.push('/templates')
    this.initEventsFromBus()
    this.initHistory()
    if (this.wap.classState) {
      document.body.className = `${this.wap.classState.fontClass} ${this.wap.classState.themeClass}`
    }

    this.setSocketEvents()

    if (this.$route.query.workTogether) {
      this.isSocketsOn = true
      this.openWorkSpace()
    }

    if (this.isMobile())
      this.$store.commit({ type: 'setEditMode', isEditMode: false })
    console.log(
      'this.$store.getters.isEditMode:',
      this.$store.getters.isEditMode
    )
  },
  updated() {
    clearInterval(this.overlayInterval)
    this.overlayInterval = 0
    setInterval(appEditorService.addOverlays, 20, this.$refs.mainWap)
    appEditorService.addSelectionListeners(this.$refs.mainWap)
  },
  methods: {
    setAuthModalMsg(destinationPage) {
      if (destinationPage === 'dashboard') {
        this.authModal.loginMsg = 'Login to view dashboard'
        this.authModal.signupMsg = 'Signup  to view dashboard'
      } else {
        this.authModal.loginMsg = 'Login to publish website'
        this.authModal.signupMsg = 'Signup to publish website'
      }
      this.authModal.destPage = destinationPage
    },
    dashboardLinkClicked() {
      if (this.loggedinUser) this.$router.push('/dashboard')
      else {
        this.isConfirmModalOpen = false
        this.setAuthModalMsg('dashboard')
        this.authModal.isShown = 'login'
      }
    },
    swapAuthModal(modalType) {
      this.authModal.isShown = modalType
    },
    cmpAdded(e) {
      this.onCmpsChange()
    },
    updateField(fieldInfo) {
      const cmp = this.wap.cmps.find((cmp) => cmp.id === fieldInfo.id)
      const formCmp = cmp.cmps.find(
        (childCmp) => childCmp.id === fieldInfo.childCmpId
      )
      if (fieldInfo.txt || fieldInfo.txt === '')
        formCmp.options.meta.formInputs[fieldInfo.idx].tag = fieldInfo.txt
      else if (typeof fieldInfo.idx === 'number')
        formCmp.options.meta.formInputs.splice(fieldInfo.idx, 1)
      else formCmp.options.meta.formInputs.push({ tag: '', txt: '' })
      this.onCmpsChange()
    },
    keydownHandler(event) {
      if (event.ctrlKey && event.key === 'z') {
        this.undo()
      }
    },
    setMedia(mediaType) {
      this.mediaType = mediaType
    },
    removeCmp({ id, childCmpId, elType }) {
      let changedChildCmpIdx
      let changedCmpIdx = +this.wap.cmps.findIndex((cmp) => cmp.id === id)
      const parentCmp = this.wap.cmps[changedCmpIdx]
      let changedCmp = parentCmp
      if (childCmpId) {
        changedChildCmpIdx = +parentCmp.cmps.findIndex(
          (childCmp) => childCmp.id === childCmpId
        )
        changedCmp = parentCmp.cmps[changedChildCmpIdx]
      }
      if (elType) delete changedCmp.info[elType]
      else if (!childCmpId) {
        this.wap.cmps.splice(changedCmpIdx, 1)
      } else {
        parentCmp.cmps.splice(changedChildCmpIdx, 1)
      }

      if (
        (parentCmp.cmps && !parentCmp.cmps.length) ||
        (parentCmp.info && !Object.keys(parentCmp.info).length)
      ) {
        this.wap.cmps.splice(changedCmpIdx, 1)
      }

      this.onCmpsChange()
    },
    themeChanged(classState) {
      this.wap.classState = classState
      document.body.className = `${this.wap.classState.fontClass} ${this.wap.classState.themeClass}`
      this.onCmpsChange()
    },
    undo() {
      ;[1, 2, 3]
      const gHistory = appEditorService.loadFromStorage('gHistory') // get history
      if (!gHistory.changeIdx) return
      gHistory.changeIdx -= 1
      this.wap = gHistory.changes[gHistory.changeIdx]
      appEditorService.saveToStorage('gHistory', gHistory)
      this.updateWap()
    },
    redo() {
      const gHistory = appEditorService.loadFromStorage('gHistory')
      if (!gHistory || gHistory.changeIdx >= gHistory.changes.length - 1) return
      gHistory.changeIdx += 1
      this.wap = gHistory.changes[gHistory.changeIdx]
      appEditorService.saveToStorage('gHistory', gHistory)
    },
    saveLastChange() {
      let gHistory = appEditorService.loadFromStorage('gHistory')
      if (gHistory) {
        gHistory.changeIdx += 1
        gHistory.changes = gHistory.changes.slice(0, gHistory.changeIdx)
        gHistory.changes.push(this.wap)
        appEditorService.saveToStorage('gHistory', gHistory)
      } else {
        appEditorService.saveToStorage('gHistory', {
          changes: [this.wap],
          changeIdx: 0,
        })
      }
    },
    onCmpsChange() {
      this.updateWap()
      this.saveLastChange()
      if (this.isSocketsOn) {
        socketService.emit('cmpChange', this.wap)
      }
    },
    // I added return to this function
    async updateWap() {
      return await this.$store.dispatch({ type: 'updateWap', wap: this.wap })
    },
    //TODO: removing them completly or move to service.
    onDrop() {
      this.drag = false
      this.onCmpsChange()
    },

    // prettier-ignore
    handleUpdate({ cmpId, updatedStyle, elType, content, childCmpId }) {
      let changedCmp = this.wap.cmps.find( cmp => cmp.id === cmpId)
      if (childCmpId) changedCmp = changedCmp.cmps.find( childCmp => childCmp.id === childCmpId)
      if (elType) {
        updatedStyle ? changedCmp.info[elType].options = updatedStyle : changedCmp.info[elType].content.text = content
      } else {
        updatedStyle ? changedCmp.options=updatedStyle : changedCmp.content.text = content
      }
      this.onCmpsChange()
    },
    async loadWap() {
      if (this.$route.params?.id) {
        const wap = await this.$store.dispatch({
          type: 'getWap',
          id: this.$route.params.id,
        })
        if (wap.isPublished) {
          if (
            !this.loggedinUser ||
            !this.loggedinUser?.waps.includes(this.$route.params?.id)
          )
            return false
        }
        this.wap = JSON.parse(JSON.stringify(this.$store.getters.editedWap))

        // demo data:
        // this.wap.usersData.subscriptions = demoData
        // this.wap.visits = utilService.getDemoData()
      } else {
        if (this.$route.query.templateId) {
          const { templateId } = this.$route.query
          this.wap = utilService.deepCopy(wapUtils.getTemplate(templateId))
          const defaultTheme = wapUtils.getTemplateTheme(templateId)
          this.themeChanged({ themeClass: defaultTheme })
        } else this.wap = appEditorService.getEmptyWap()
        delete this.wap._id
        const editedWapId = await this.$store.dispatch({
          type: 'updateWap',
          wap: this.wap,
        })
        this.wap._id = editedWapId
        this.wap.visitors = [{ createdAt: Date.now() }]
        this.$router.push({ path: '/edit/' + editedWapId, replace: true })
      }
      return true
    },
    initHistory() {
      const gHistory = appEditorService.loadFromStorage('gHistory')
      if (!gHistory || gHistory.wapId !== this.wap._id) {
        appEditorService.saveToStorage('gHistory', {
          changes: [this.wap],
          changeIdx: 0,
          wapId: this.wap._id,
        })
      }
    },
    cmpSelected({ cmpId, elType, childCmpId, elDom }) {
      this.selectedCmp = {}
      let cmp = this.wap.cmps.find(({ id }) => {
        return id === cmpId
      })

      if (childCmpId) {
        cmp = cmp.cmps.find(({ id }) => id === childCmpId)
        this.selectedCmp.childCmpId = childCmpId
      }

      this.selectedCmp.id = cmpId
      this.selectedCmp.options = elType ? cmp.info[elType].options : cmp.options
      this.selectedCmp.elType = elType
      this.selectedCmp.elDom = elDom?.target
      eventBus.emit('openCmpEditor')
    },

    initEventsFromBus() {
      eventBus.on('cmpUpdated', this.handleUpdate)
      eventBus.on('onInnerCmpDrop', ({ cmpId, cmps }) => {
        const cmpIndex = this.wap.cmps.findIndex(({ id }) => id === cmpId)
        this.wap.cmps[cmpIndex].cmps = cmps
        this.updateWap()
      })
      eventBus.on('undo', this.undo)
      eventBus.on('redo', this.redo)
      eventBus.on('select', this.cmpSelected)
      eventBus.on('themeChanged', this.themeChanged)
      eventBus.on('removeCmp', this.removeCmp)
      eventBus.on('updateField', this.updateField)
      eventBus.on('toggleChat', this.toggleChat)
    },
    toggleChat() {
      if (this.wap.plugins?.chatData) {
        this.wap.plugins.chatData = null
      } else {
        this.wap.plugins = {}
        this.wap.plugins.chatData = {
          adminName: this.loggedinUser.fullname,
          adminID: this.loggedinUser._id,
          chatId: this.wap._id,
          // chatId: this.loggedinUser._id,
        }
        ElMessage({
          message: 'Chat added to website.',
          type: 'success',
        })
      }
      this.updateWap()
    },
    async publishWap(wapName) {
      //TODO ADD USER MSGS
      if (!this.loggedinUser) {
        this.authModal.isShown = 'login'
        console.log('not looged in')

        this.setAuthModalMsg('publishWap')
        this.isConfirmModalOpen = false
        return
      }
      if (this.wap.isPublished) {
        ElMessage({
          message: 'sites saved',
          type: 'success',
        })
        this.$router.push('/' + this.wap.name)

        return
      }

      // this.wap.name = wapName
      this.wap.createdAt = Date.now()
      this.wap.owner = this.loggedinUser
      this.wap.isPublished = !this.wap.isPublished
      this.authModal.isShown = false
      try {
        const wapId = await this.updateWap(this.wap)
        this.$store.dispatch('addWapToUser', { wapId: this.wap._id })
        this.$router.push('/' + this.wap.name)
        ElMessage({
          message: `Site is live at  ${window.location.href}`,
          type: 'success',
        })
      } catch (err) {
        console.log(err)
        ElMessage({
          message: 'Cannot Publish Site With Invalid Name',
          type: 'error',
        })
      }
    },
    async setName(wapName) {
      //TODO ADD USER MSGS
      this.wap.name = wapName
      try {
        this.updateWap()
      } catch (err) {
        console.log(err)
      }
    },
    terminateEventBus() {
      eventBus.off('select')
      eventBus.off('cmpUpdated')
      eventBus.off('onInnerCmpDrop')
      eventBus.off('undo')
      eventBus.off('redo')
      eventBus.off('themeChanged')
      eventBus.off('removeCmp')
      eventBus.off('updateField')
      eventBus.off('toggleChat')
    },

    async setSocketEvents() {
      socketService.on('cmpChange', (wap) => {
        this.wap = wap
      })

      socketService.on('mouseEvent', (cursorProps) => {
        const cursorPropIdx = this.workTogetherCursors.findIndex(({ id }) => {
          return id === cursorProps.id
        })
        if (cursorPropIdx !== -1)
          this.workTogetherCursors[cursorPropIdx] = cursorProps
        else this.workTogetherCursors.push(cursorProps)
      })

      socketService.on('userDisconnected', (cursorId) => {
        console.log('userDisconnected')
        const curserToRemoveIdx = this.workTogetherCursors.findIndex(
          ({ id }) => id === cursorId
        )
        this.workTogetherCursors.splice(curserToRemoveIdx, 1)
      })
    },

    sendMouseEvent(evType, ev) {
      if (!this.isSocketsOn) return

      const sendedCursor = { style: evType }
      const { clientX, clientY, offsetX, offsetY } = ev

      sendedCursor.clientXY = { clientX, clientY }
      sendedCursor.id = this.curserId
      sendedCursor.color = this.cursorColor
      sendedCursor.type = evType

      socketService.emit('mouseEvent', sendedCursor)
    },

    openSocketsConfirm({ key }) {
      if (this.isSocketsOn) {
        //Todo user msg
        console.log('There is opened work space')
        return
      }
      if (key !== 'workTogether') return

      utilService.copyToClipboard(window.location.href + '?workTogether=true')
      this.$router.replace({ ...this.$route, query: { workTogether: true } })
      this.openWorkSpace()
      ElMessage({
        message: 'Link copied! work together is on.',
        type: 'success',
      })

      // const data = {
      //   txt: 'Are you sure you want to open a work space?',
      // }

      // this.handleUserConfirmModal('open', data)
    },

    handleUserConfirmModal(state, data) {
      this.isConfirmModalOpen = state === 'open' ? true : false
      this.confirmData = data
    },

    closeConfirmModal() {
      this.confirmData = null
      this.isConfirmModalOpen = false
    },

    openWorkSpace() {
      this.isSocketsOn = true
      socketService.emit('joinWorkSpace', {
        wapId: this.wap._id,
        cursorId: this.curserId,
      })
      this.$router.replace({ ...this.$route, query: { workTogether: true } })
    },

    changeOrder({ oldIdx, newIdx }) {
      ;[this.wap.cmps[oldIdx], this.wap.cmps[newIdx]] = [
        this.wap.cmps[newIdx],
        this.wap.cmps[oldIdx],
      ]
      this.onCmpsChange()
    },

    addByClick(cmp) {
      console.log('cmp:', cmp)
      this.wap.cmps.push(cmp)
      this.onCmpsChange()
    },

    isMobile() {
      return window.innerWidth <= 960
    },
  },

  unmounted() {
    this.terminateEventBus()
    socketService.emit('doDisconnect', {})
    document.removeEventListener('keydown', this.keydownHandler)
  },
  computed: {
    loggedinUser() {
      return this.$store.getters.loggedinUser
    },
  },
  components: {
    editorBtnGroup,
    mainHeader,
    editorHeader,
    editorSidebar,
    draggable,
    wapHeader,
    wapCards,
    wapHero,
    wapCards,
    wapSection,
    wapForm,
    wapVideo,
    wapMap,
    cursor,
    userConfirmModal,
    wapChat,
    loadingScreen,
    loginModal,
    signupModal,
    publishModal,
  },
}
</script>

<options lang="scss" scoped>
.confirm-modal {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</options>

<style lang="scss">
.auth-edit-mode-modal,
.publish-modal {
  position: fixed;
  z-index: 20000;
  background-color: white;
  padding: 20px;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  text-align: end;
  border-radius: 10px;
  box-shadow: 0 0 0;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
</style>
