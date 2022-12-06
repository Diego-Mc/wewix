<template>
  <!-- <wap-chat/> -->
  <user-confirm-modal
    class="confirm-modal"
    v-if="isConfirmModalOpen"
    :confirmData="confirmData"
    @closelModal="closeConfirmModal"
    @openWorkSpace="openWorkSpace" 
  />

  <cursor v-if="workTogetherCursors[0]" :cursorsData="workTogetherCursors" />
  <section
    @drag="sendMouseEvent('drag', $event)"
    @mousemove="sendMouseEvent('move', $event)"
    @mousedown="sendMouseEvent('down', $event)"
    @mouseup="sendMouseEvent('move', $event)"
    class="main-editor"
    v-if="wap">
    <section class="main-editor-tools">
      <button
        @click="publishWap('yay')"
        :style="{
          backgroundColor: 'blue',
          position: 'fixed',
          bottom: 0,
          right: 0,
          padding: '20px',
          color: 'white',
        }">
        publish test
      </button>
      <main-header />
      <editor-header
        @setName="setName"
        @setVal="openWorkTogetherConfirm"
        @setMedia="setMedia"
        @publishWap="publishWap"
        :wapName="wap.name"
        :isOnline="wap.isOnline"
        
        />
      <editor-sidebar :selectedCmp="selectedCmp" />
    </section>
    <main class="main-wap" :class="mediaType">
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

import { eventBus } from '../services/event-bus.service'
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

import wapHeader from '../cmps/wap-sections/wap-header.vue'
import wapHero from '../cmps/wap-sections/wap-hero.vue'
import wapCards from '../cmps/wap-sections/wap-cards.vue'
import wapSection from '../cmps/wap-sections/wap-section.vue'
import wapForm from '../cmps/wap-sections/wap-form.vue'
import wapVideo from '../cmps/wap-items/wap-video.vue'
import wapMap from '../cmps/wap-items/wap-map.vue'
import wapChat from '../cmps/wap-items/wap-chat.vue'
import loginModal from '../cmps/app-cmps/login-modal.vue'

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
    }
  },
  async created() {
    this.onCmpsChange = utilService.debounce(this.onCmpsChange, 500)

    await this.loadWap()
    this.initEventsFromBus()
    this.initHistory()
    this.checkNewVisit() // TODO: only on published mode.

    if (this.wap.classState) {
      document.body.className = `${this.wap.classState.fontClass} ${this.wap.classState.themeClass}`
    }

    this.setSocketEvents()

    if (this.$route.query.workTogether) {
      this.isSocketsOn = true
      this.openWorkSpace()
    }
  },
  unmounted() {
    console.log('I AM UNMOUNTED!!!!!!', this.wap._id)
    document.removeEventListener('keydown', this.keydownHandler)
  },
  methods: {
    cmpAdded(e) {
      this.onCmpsChange()
    },
    updateField(fieldInfo) {
      const cmp = this.wap.cmps.find((cmp) => cmp.id === fieldInfo.id)
      if (fieldInfo.txt || fieldInfo.txt === '')
        cmp.options.meta.formInputs[fieldInfo.idx].tag = fieldInfo.txt
      else if (typeof fieldInfo.idx === 'number')
        cmp.options.meta.formInputs.splice(fieldInfo.idx, 1)
      else cmp.options.meta.formInputs.push({ tag: 'wa', txt: '' })
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
      this.onCmpsChange()
    },
    undo() {
      const gHistory = appEditorService.loadFromStorage('gHistory')
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

      console.log('style',updatedStyle)
      let changedCmp = this.wap.cmps.find(cmp => cmp.id === cmpId)
      if (childCmpId) changedCmp = changedCmp.cmps.find( childCmp => childCmp.id === childCmpId)
      if (elType) {
        // console.log(updatedStyle.options.style.backgroundColor)
        updatedStyle ? changedCmp.info[elType].options = updatedStyle : changedCmp.info[elType].content.text = content
      } else {
        updatedStyle ? changedCmp.options=updatedStyle :  changedCmp.content.text = content
      }
      this.onCmpsChange()
    },
    async loadWap() {
      // console.log('templatedId',this.$route.query.templateId)
      if (this.$route.params?.id) {
        const wap = await this.$store.dispatch({
          type: 'getWap',
          id: this.$route.params.id,
        })
        this.wap = JSON.parse(JSON.stringify(this.$store.getters.editedWap))
      } else {
        if (this.$route.query.templateId) {
          this.wap = wapUtils.getTemplate(this.$route.query.templateId)
          this.wap._id = ''
        } else this.wap = appEditorService.getEmptyWap()

        const editedWapId = await this.$store.dispatch({
          type: 'updateWap',
          wap: this.wap,
        })

        this.wap._id = editedWapId

        // TODO: fix this.
        this.$router.push({ path: '/edit/' + editedWapId, replace: true })
      }
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

    addUserInfo(userInfo) {
      if (userInfo.type === 'subscription')
        this.wap.usersData.subscriptions.push(userInfo)
      else this.wap.usersData.contacts.push(userInfo)
      this.updateWap()
    },
    initEventsFromBus() {
      eventBus.on('cmpUpdated', this.handleUpdate)
      eventBus.on('onInnerCmpDrop', ({ cmpId, cmps }) => {
        const cmpIndex = this.wap.cmps.findIndex(({ id }) => id === cmpId)
        this.wap.cmps[cmpIndex].cmps = cmps
        this.updateWap()
      })
      eventBus.on('formSubmited', this.addUserInfo)
      eventBus.on('undo', this.undo)
      eventBus.on('redo', this.redo)
      eventBus.on('select', this.cmpSelected)
      eventBus.on('themeChanged', this.themeChanged)
      eventBus.on('removeCmp', this.removeCmp)
      eventBus.on('updateField', this.updateField)
    },
    checkNewVisit() {
      if (!sessionStorage.getItem('newVisit', 'new!')) {
        // make visitcount default
        const currVisit = { at: Date.now() }
        this.wap.visitCount
          ? this.wap.visitCount.push(currVisit)
          : (this.wap.visitCount = [currVisit])
        sessionStorage.setItem('newVisit', 'new!')
      }
    },
    async publishWap(wapName) {
      //TODO ADD USER MSGS
      this.wap.name = wapName
      this.wap.owner = this.loggedinUser
      try {
        const wapId = await this.updateWap(this.wap)
        this.$store.dispatch('addWapToUser', { wapId: this.wap._id })
        // if (wapId) this.$router.push(`/${wapName}`)
      } catch (err) {
        console.log(err)
      }
    },
    async setName(wapName) {
      //TODO ADD USER MSGS
      this.wap.name = wapName
      try {
        const wapId = await this.updateWap(this.wap)  
        console.log('this.wap:', this.wap)
      } catch (err) {
        console.log(err)
      }
    },
    terminateEventBus() {
      eventBus.off('select')
      eventBus.off('cmpUpdated')
      eventBus.off('onInnerCmpDrop')
      eventBus.off('formSubmited')
      eventBus.off('undo')
      eventBus.off('redo')
      eventBus.off('select')
      eventBus.off('themeChanged')
      eventBus.off('removeCmp')
      eventBus.off('updateField')
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

    openWorkTogetherConfirm({ key }) {
      console.log(key);
      if (this.isSocketsOn) {
        //Todo user msg
        console.log('There is opened work space')
        return
      }
      if (key !== 'workTogether') return

      this.confirmData = {
        txt: 'Are you sure you want to open a work space?',
      }

      this.isConfirmModalOpen = true
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
    },
  },

  unmounted() {
    this.terminateEventBus()
    socketService.emit('doDisconnect', {})
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
