<template>
  <main v-if="wap">
    <button @click="undo">undo</button>
    <general-editor @themeChanged="themeChanged" />
    <wap-templates />
    <button style="background-color: orange; margin: 10px 0" @click="updateWap(wap)">
      publish site
    </button>

    <cmp-editor v-if="isOpenCmpEditor" :id="selectedCmp.id" :childCmpId="selectedCmp.childCmpId"
      :editOptions="selectedCmp.options" :elType="selectedCmp.elType" @update="handleUpdate">
    </cmp-editor>

    <draggable class="list-group" :component-data="{
      type: 'transition-group',
      name: !drag ? 'flip-list' : null,
    }" @add="saveWapToStorage" v-model="wap.cmps" v-bind="dragOptions" @start="drag = true" @end="onDrop" item-key="order" group="sections">
      <template #item="{ element }">
        <div>
          <component :is="element.type" :info="element.info" :options="element.options" :cmps="element.cmps"
            :cmpId="element.id" @select="select" @update="handleUpdate">
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

import wapHeader from '../cmps/wap-sections/wap-header.vue'
import wapHero from '../cmps/wap-sections/wap-hero.vue'
import wapCards from '../cmps/wap-sections/wap-cards.vue'
import wapSection from '../cmps/wap-sections/wap-section.vue'
import wapForm from '../cmps/wap-sections/wap-form.vue'
import wapVideo from '../cmps/wap-items/wap-video.vue'

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

    themeChanged(classState) {
      this.wap.classState = classState
      this.saveWapToStorage()

    },
    undo() {
      const wapChanges = this.loadFromStorage('wapChanges')
      wapChanges.pop()
      const cmps = wapChanges[wapChanges.length - 1].cmps
      this.wap.cmps = cmps
      this.saveToStorage('wapChanges', wapChanges)

    },
    saveLastChange() {
      const wapChanges = this.loadFromStorage('wapChanges')
      if (wapChanges) {
        const lastChanges = this.loadFromStorage('wapChanges')
        lastChanges.push(this.wap)
        this.saveToStorage('wapChanges', lastChanges)
      } else {
        this.saveToStorage('wapChanges', [this.wap])
      }
    },
    saveWapToStorage(wap = this.wap) {
      console.log('saved to storage')
      this.saveToStorage('editedWap', wap)
      this.saveLastChange()

    },
    //TODO: think about removing them completly or move to service.
    saveToStorage(key, val) {
      localStorage[key] = JSON.stringify(val)
    },
    loadFromStorage(key) {
      const str = localStorage.getItem(key)
      return JSON.parse(str)
    },

    onDrop() {
      this.drag = false
     //  this.saveWapToStorage()

    },

    handleUpdate({ cmpId, updatedStyle, elType, content, childCmpId }) {
      let cmpIdx

      const cmp = this.wap.cmps.find(({ id }, idx) => {
        if (id === cmpId) {
          cmpIdx = idx
          return true
        }
      })
      if (cmp?.cmps) {
        const childCmpIndex = this.wap.cmps[cmpIdx].cmps.findIndex(({ id }) => id === childCmpId)
        if (updatedStyle) elType ? this.wap.cmps[cmpIdx].cmps[childCmpIndex].info[elType].options.style = updatedStyle.style : this.wap.cmps[cmpIdx].cmps[childCmpIndex].info[elType].options.style = updatedStyle.style
        if (content) elType ? this.wap.cmps[cmpIdx].cmps[childCmpIndex].info[elType].content.text = content : this.wap.cmps[cmpIdx].cmps[childCmpIndex].info[elType].options.style = updatedStyle.style
        return
      }

      if (updatedStyle) elType ? this.wap.cmps[cmpIdx].info[elType].options.style = updatedStyle.style : this.wap.cmps[cmpIdx].options.style = updatedStyle.style
      if (content) elType ? this.wap.cmps[cmpIdx].info[elType].content.text = content : this.wap.cmps[cmpIdx].options.style = updatedStyle.style
      // TODO: remove from here, its only for demonstartion
     //  this.saveWapToStorage()

    },

    async loadWap() {
      if (this.$route.params?.id) {
        const wap = await this.$store.dispatch({
          type: 'getWap',
          id: this.$route.params.id,
        })
        this.wap = JSON.parse(JSON.stringify(wap))
      } else {
        // add condition: user not logged in.
        this.wap = this.loadFromStorage('editedWap') || this.getEmptyWap()
      }
      if (this.wap.classState) {
        document.body.className = `${this.wap.classState.fontClass} ${this.wap.classState.themeClass}`
      }
    },

    // handleDrop() {
    //   this.saveWapToStorage()
    // },

    async updateWap(wap) {
      const { _id } = await this.$store.dispatch({ type: 'updateWap', wap: wap })
      if (_id) this.wap._id = _id
     //  this.saveWapToStorage()

    },

    publishWap() {
      this.updateWap(this.wap)
    },

    select({ cmpId, elType, childCmpId }) {
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
  },

  created() {
    this.loadWap()
    eventBus.on('update', ({ cmpId, updatedStyle, elType, content }) => {
      this.handleUpdate({ cmpId, updatedStyle, elType, content })
    })
    eventBus.on('onInnerCmpDrop', ({ cmpId, cmps }) => {
      const cmpIndex = this.wap.cmps.findIndex(({ id }) => id === cmpId)
      // console.log(this.wap.cmps[cmpIndex].cmps)
      this.wap.cmps[cmpIndex].cmps = cmps
      // console.log(this.wap.cmps[cmpIndex].cmps)

     //  this.saveWapToStorage()

      // this.handleUpdate({ cmpId, updatedStyle, elType, content })
    })

  },

  // watch: {
  //   wap: {
  //     handler(wap) {
  //       // this.saveWapToStorage(wap)
  //       console.log('watch, wap changed')
  //     },
  //     deep: true,
  //   },
  // },

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
