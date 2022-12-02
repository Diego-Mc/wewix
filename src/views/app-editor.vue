<template>
  <main v-if="wap">
    <editor-undo />
    <wap-chat />

    <general-editor @themeChanged="themeChanged" />
    <wap-templates />
    <button
      style="background-color: orange; margin: 10px 0"
      @click="updateWap(wap)">
      publish site
    </button>

    <cmp-editor
      v-if="isOpenCmpEditor"
      :id="selectedCmp.id"
      :childCmpId="selectedCmp.childCmpId"
      :editOptions="selectedCmp.options"
      :elType="selectedCmp.elType">
    </cmp-editor>

    <draggable
      class="list-group"
      :component-data="{
        type: 'transition-group',
        name: !drag ? 'flip-list' : null,
      }"
      @add="onCmpsChange"
      v-model="wap.cmps"
      v-bind="dragOptions"
      @start="drag = true"
      @end="onDrop"
      item-key="order"
      group="sections">
      <template #item="{ element }">
        <div>
          <component
            :is="element.type"
            :info="element.info"
            :options="element.options"
            :cmps="element.cmps"
            :cmpId="element.id"
            @select="select"
            @update="handleUpdate">
          </component>
        </div>
      </template>
    </draggable>
  </main>
</template>

<script>
import draggable from 'vuedraggable'

import { utilService } from '../services/util.service'

import cmpEditor from '../cmps/app-cmps/cmp-editor.vue'
import wapTemplates from '../cmps/app-cmps/wap-templates.vue'
import generalEditor from '../cmps/app-cmps/general-editor.vue'
import editorUndo from '../cmps/app-cmps/editor-undo.vue'

import wapHeader from '../cmps/wap-sections/wap-header.vue'
import wapHero from '../cmps/wap-sections/wap-hero.vue'
import wapCards from '../cmps/wap-sections/wap-cards.vue'
import wapSection from '../cmps/wap-sections/wap-section.vue'
import wapForm from '../cmps/wap-sections/wap-form.vue'
import wapVideo from '../cmps/wap-items/wap-video.vue'
import wapMap from '../cmps/wap-items/wap-map.vue'
import wapChat from '../cmps/wap-items/wap-chat.vue'
import loginModal from '../cmps/app-cmps/login-modal.vue'
import { eventBus } from '../services/event-bus.service.js'
import getCmp from '../services/wap-cmps.service'

export default {
  data() {
    return {
      wap: null,
      selectedCmp: {},
      isOpenCmpEditor: false,
      drag: false,
      dragOptions: {
        animation: 200,
        group: 'description',
        disabled: false,
        ghostClass: 'ghost',
      },
    }
  },

  methods: {
    removeCmp(cmpId) {
      const cmpIndex = this.wap.cmps.findIndex(({ id }) => id === cmpId)
      this.wap.cmps.splice(cmpIndex, 1)
      this.onCmpsChange()
    },
    themeChanged(classState) {
      this.wap.classState = classState
      this.onCmpsChange()
    },
    // updateHistoryOnUpdate() {
    //   let gHistory = this.loadFromStorage('gHistory')
    //   gHistory = [
    //     ...gHistory.changes.slice(0, gHistory.changeIdx + 1),
    //     gHistory.changes[gHistory.changes.length - 1],
    //   ]
    //   console.log(gHistory)
    //   this.saveToStorage('gHistory', gHistory)
    // },
    // move to component
    undo() {
      const gHistory = this.loadFromStorage('gHistory')
      if (!gHistory.changeIdx) return
      gHistory.changeIdx -= 1
      this.wap = gHistory.changes[gHistory.changeIdx]
      this.saveToStorage('gHistory', gHistory)
      this.updateWap()
    },
    redo() {
      const gHistory = this.loadFromStorage('gHistory')
      console.log(gHistory.changes.length, gHistory.changeIdx)
      if (!gHistory || gHistory.changeIdx >= gHistory.changes.length - 1) return
      gHistory.changeIdx += 1
      this.wap = gHistory.changes[gHistory.changeIdx]
      this.saveToStorage('gHistory', gHistory)
    },
    saveLastChange() {
      let gHistory = this.loadFromStorage('gHistory')
      if (gHistory) {
        gHistory.changeIdx += 1
        console.log('idx', gHistory.changeIdx)
        gHistory.changes = gHistory.changes.slice(0, gHistory.changeIdx)
        gHistory.changes.push(this.wap)
        this.saveToStorage('gHistory', gHistory)
      } else {
        this.saveToStorage('gHistory', { changes: [this.wap], changeIdx: 0 })
      }
    },
    onCmpsChange() {
      this.updateWap()
      this.saveLastChange()
      // this.updateHistoryOnUpdate()
    },
    async updateWap() {
      await this.$store.dispatch({ type: 'updateWap', wap: this.wap })
    },
    //TODO: removing them completly or move to service.
    saveToStorage(key, val) {
      localStorage[key] = JSON.stringify(val)
    },
    loadFromStorage(key) {
      const str = localStorage.getItem(key)
      return JSON.parse(str)
    },

    onDrop() {
      this.drag = false
      // this.onCmpsChange()
    },

    // prettier-ignore
    handleUpdate({ cmpId, updatedStyle, elType, content, childCmpId }) {
      let changedCmp = this.wap.cmps.find(cmp => cmp.id === cmpId)
      if (childCmpId) changedCmp = changedCmp.cmps.find( childCmp => childCmp.id === childCmpId)

      if(elType){
        updatedStyle ? changedCmp.info[elType].options =updatedStyle : changedCmp.info[elType].content.text = content
      }else{
        updatedStyle ? changedCmp.options=updatedStyle :  changedCmp.content.text = content
      }
     
      this.onCmpsChange()
    },

    // TODO: work on logic, avoid repetition.
    async loadWap() {
      if (this.$route.params?.id) {
        const wap = await this.$store.dispatch({
          type: 'getWap',
          id: this.$route.params.id,
        })
        this.wap = JSON.parse(JSON.stringify(this.$store.getters.editedWap))
      } else if (this.loadFromStorage('editedWapId')) {
        await this.$store.dispatch({
          type: 'getWap',
          id: this.loadFromStorage('editedWapId'),
        })
        this.wap = JSON.parse(JSON.stringify(this.$store.getters.editedWap))
      } else {
        // add condition: user not logged in.
        this.wap = this.getEmptyWap()
        const editedWapId = await this.$store.dispatch({
          type: 'updateWap',
          wap: this.wap,
        })
        this.wap._id = editedWapId
        this.saveToStorage('editedWapId', editedWapId)
      }

      if (this.wap.classState) {
        document.body.className = `${this.wap.classState.fontClass} ${this.wap.classState.themeClass}`
      }
      const gHistory = this.loadFromStorage('gHistory')
      if (!gHistory || gHistory.wapId !== this.wap._id) {
        this.saveToStorage('gHistory', {
          changes: [this.wap],
          changeIdx: 0,
          wapId: this.wap._id,
        })
      }
    },

    publishWap() {
      this.updateWap(this.wap)
    },

    select({ cmpId, elType, childCmpId }) {
      sessionStorage.setItem('wa', 'wa')

      let cmp = this.wap.cmps.find(({ id }) => id === cmpId)
      
      if (childCmpId) {
        cmp = cmp.cmps.find(({ id }) => id === childCmpId)
        this.selectedCmp.childCmpId = childCmpId
      }

      this.selectedCmp.id = cmpId
      this.selectedCmp.options = elType ? cmp.info[elType].options : cmp.options
      this.selectedCmp.elType = elType
      this.isOpenCmpEditor = true
    },
    getEmptyWap() {
      return {
        
        cmps: [],
      }
    },
    addUserInfo(userInfo) {
      if(userInfo.type === 'subscription') this.wap.usersData.subscriptions.push(userInfo)
      else this.wap.usersData.contacts.push(userInfo)
      this.updateWap()
    },
    loadEvents() {
      eventBus.on(
        'cmpUpdated',
        ({ cmpId, updatedStyle, elType, content, childCmpId }) => {
          this.handleUpdate({
            cmpId,
            updatedStyle,
            elType,
            content,
            childCmpId,
          })
        }
      )
      eventBus.on('onInnerCmpDrop', ({ cmpId, cmps }) => {
        const cmpIndex = this.wap.cmps.findIndex(({ id }) => id === cmpId)
        this.wap.cmps[cmpIndex].cmps = cmps
        this.onCmpsChange()
      })
      eventBus.on('onRemoveCmp', (cmpId) => {
        this.removeCmp(cmpId)
      })
      eventBus.on('formSubmited', this.addUserInfo)
      eventBus.on('undo', this.undo)
      eventBus.on('redo', this.redo)
    },
  },

  created() {
    this.loadWap()
    this.loadEvents()
    this.onCmpsChange = utilService.debounce(this.onCmpsChange, 1000)
  },

  components: {
    cmpEditor,
    wapTemplates,
    wapHeader,
    wapCards,
    draggable,
    wapHero,
    loginModal,
    wapCards,
    wapSection,
    wapForm,
    wapVideo,
    generalEditor,
    wapMap,
    wapChat,
    editorUndo,
  },
}
</script>

<style>
* {
  box-sizing: border-box;
}

.main {
  display: grid;
  grid-template-columns: 200px 1fr;
}

.section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  padding: 20px 0;
}

.section p {
  text-align: center;
}

.cmp {
  padding: 10px;
  border: 1px dotted white;
  border-collapse: separate;
  text-align: center;
}

.button {
  margin-top: 35px;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

li {
  list-style: none;
}

.ghost {
  opacity: 0.5;
  background: grey;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}

tr {
  display: grid;
  grid-template-columns: 1fr 1fr;
}

td {
  padding: 5px;
  background-color: lightcoral;
  min-width: 200px;
}
</style>
