<template>
  <main v-if="wap">
    <wap-templates />
    <button style="background-color: orange; margin: 10px 0;" @click="updateWap(wap)">publish site</button>

    <cmp-editor v-if="isOpenCmpEditor" :id="selectedCmp._id" :editOptions="selectedCmp.options"
      :cmpStyle="selectedCmp.style" @update="handleUpdate()">
    </cmp-editor>

    <draggable class="list-group" :component-data="{
      type: 'transition-group',
      name: !drag ? 'flip-list' : null,
    }" v-model="wap.cmps" v-bind="dragOptions" @start="drag = true" @end="drag = false" item-key="order"
      group="sections">
      <template #item="{ element }">
        <div>
          <component :is="element.type" :info="element.info" :options="element.options" :cmps="element.cmps"
            :cmpId="element.id" @select="select"></component>
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

import loginModal from '../cmps/app-cmps/login-modal.vue'

export default {
  data() {
    return {
      wap: null,
      selectedCmp: {},
      isOpenCmpEditor: true,

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

    handleUpdate({ cmpId, name, content, style }) {
      const cmp = wap.cmps.find(({ _id }) => _id === cmpId)
      wap.cmps.cmp[name] = content ?? cmp.content
      wap.cmps.cmp[name] = style ?? cmp.style
      this.updateWap(wap)
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
        this.wap = this.loadFromStorage('wap') || this.getEmptyWap()
      }
    },

    handleDrop() {
      this.updateWap(this.wap)
    },

    updateWap(wap) {
      // const updatedWap = JSON.parse(JSON.stringify(wap))
      if (!this.$router.params?.id) {
        this.saveToStorage('wap', this.wap)
      } else {
        this.$store.dispatch({ type: 'updateWap', wap: wap })
      }
    },
    publishWap() {
      this.$store.dispatch({ type: 'updateWap', wap: wap })
    },
    select({ cmpId, name }) {
      const cmp = this.wap.cmps.find(({ id }) => id === cmpId)
      this.selectedCmp.id = cmpId
      this.selectedCmp.options = cmp.options
      this.isOpenCmpEditor = true
    },
    getEmptyWap() {
      return {
        cmps: []
      }
    },

  },

  created() {
    this.loadWap()
  },

  watch: {
    wap: {
      handler(wap) {
        this.updateWap(wap)
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
    wapHero,
    loginModal,
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
