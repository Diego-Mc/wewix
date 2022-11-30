<template>
  <main v-if="wap">
    <login-modal />
     <wap-templates />

    <cmp-editor v-if="isOpenCmpEditor" :id="selectedCmp._id" :editOptions="selectedCmp.options"
      :cmpStyle="selectedCmp.style" @update="handleUpdate()">
    </cmp-editor>


    <draggable class="list-group" :component-data="{
      type: 'transition-group',
      name: !drag ? 'flip-list' : null
    }" v-model="wap.cmps" v-bind="dragOptions" @start="drag = true" @end="drag = false" item-key="order"
      group="sections">
      <template #item="{ element }">
        <div>
          <component :is="element.type" :info="element.info" :cmpId="element.id" @select="select"></component>
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
    handleUpdate({ cmpId, name, content, style }) {
      const cmp = wap.cmps.find(({ _id }) => _id === cmpId)
      wap.cmps.cmp[name] = content ?? cmp.content
      wap.cmps.cmp[name] = style ?? cmp.style
      this.updateWap(wap)
    },

    async loadWap() {
      if (this.$route.params.id) {
        const wap = await this.$store.dispatch({
          type: 'getWap',
          id: this.$route.params.id,
        })
        this.wap = JSON.parse(JSON.stringify(wap))
      }
    },

    handleDrop() {
      this.updateWap(this.wap)
    },

    updateWap(wap) {
      // const updatedWap = JSON.parse(JSON.stringify(wap))
      this.$store.dispatch({ type: 'updateWap', wap: wap })
    },

    select({ cmpId, name }) {
      const cmp = this.wap.cmps.find(({ id }) => {
        return id === cmpId
      })
      this.selectedCmp._id = cmpId

      this.selectedCmp.id = cmpId
      this.selectedCmp.options = cmp.options
      this.isOpenCmpEditor = true
    },
  },

  created() {
    this.loadWap()
  },

  watch: {
    wap: {
      handler(wap) {
        console.log('wa')
        this.updateWap(wap)
      },
      deep: true,
    },
  },

  components: {
    cmpEditor,
    wapTemplates,
    wapHeader,
    draggable,
    wapHero,
    loginModal
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
