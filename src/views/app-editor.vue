<template>
  <main v-if="wap">
    <wap-templates />
    <button style="background-color: orange; margin: 10px 0" @click="updateWap(wap)">
      publish site
    </button>

    <cmp-editor
      v-if="isOpenCmpEditor"
      :id="selectedCmp.id"
      :childCmpId="selectedCmp.childCmpId"
      :editOptions="selectedCmp.options"
      :elType="selectedCmp.elType"
      @update="handleUpdate">
    </cmp-editor>

    <draggable
        class="list-group"
        :component-data="{
          type: 'transition-group',
          name: !drag ? 'flip-list' : null,
        }"
        v-model="wap.cmps"
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"

        item-key="order"
        group="sections"
    >
        <template #item="{ element }">
          <div>
            <component
                :is="element.type"
                :info="element.info"
                :options="element.options"
                :cmps="element.cmps"
                :cmpId="element.id" @select="select"
                @update="handleUpdate">

            </component>
          </div>
        </template>
    </draggable>
    <pre>{{ wap.cmps }}</pre>
  </main>
</template>

<script>
import draggable from 'vuedraggable'

import { utilService } from '../services/util.service'

import cmpEditor from '../cmps/app-cmps/cmp-editor.vue'
import wapTemplates from '../cmps/app-cmps/wap-templates.vue'
import wapHeader from '../cmps/wap-sections/wap-header.vue'
import wapHero from '../cmps/wap-sections/wap-hero.vue'
import wapCards from '../cmps/wap-sections/wap-cards.vue'
import wapSection from '../cmps/wap-sections/wap-section.vue'
import wapForm from '../cmps/wap-sections/wap-form.vue'

import loginModal from '../cmps/app-cmps/login-modal.vue'
import { eventBus } from '../services/event-bus.service.js'

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
    //TODO: think about removing them completly or move to service.
    saveToStorage(key, val) {
      const str = JSON.stringify(val)
      localStorage.setItem(key, str)
    },

    loadFromStorage(key) {
      const str = localStorage.getItem(key)
      return JSON.parse(str)
    },

    handleUpdate({ cmpId, updatedStyle, elType, content }) {
      let cmpIdx
      const cmp = this.wap.cmps.find(({ id }, idx) => {
        if (id === cmpId) {
          cmpIdx = idx
          return true
        }
      })
      console.log(this.wap.cmps[cmpIdx].info)
      if (updatedStyle) this.wap.cmps[cmpIdx].info[elType].options.style = updatedStyle.style
      if (content) this.wap.cmps[cmpIdx].info[elType].content.text = content
      // TODO: remove from here, its only for demonstartion

      this.updateWap(this.wap)
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
    },

    handleDrop() {
      this.updateWap(this.wap)
    },

    async updateWap(wap) {
      const { _id } = await this.$store.dispatch({ type: 'updateWap', wap: wap })
      if (_id) this.wap._id = _id
      this.saveToStorage('editedWap', this.wap)
    },

    publishWap() {
      this.$store.dispatch({ type: 'updateWap', wap: wap })
    },

    select({ cmpId, elType, childCmpId }) {
      let cmp = this.wap.cmps.find(({ id }) => id === cmpId)

      if (childCmpId) {
          cmp = cmp.cmps.find(({id}) => id === childCmpId)
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
    // console.log(this.wap.cmps[0].info['title'].options.style.style);
  },

  watch: {
    wap: {
      handler(wap) {
        console.log('wa')
        this.saveToStorage('editedWap', wap)
      },
      deep: true,
    },
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
