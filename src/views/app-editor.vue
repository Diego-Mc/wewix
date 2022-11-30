<template>
    <app-templates />
    <cmp-editor v-if="isOpenCmpEditor" :id="selectedCmp._id" :editOptions="selectedCmp.options"
      :cmpStyle="selectedCmp.style" @update="handleUpdate()"></cmp-editor>

    <!-- <component
        v-for="cmp in cmps"
        :is="cmp.type"
        :info="cmp.info"
        :cmpId="cmp._id"
        @update="handleUpdate()"
        @select="select">
    </component> -->

    <draggable 
        class="list-group"  
        :component-data="{
          type: 'transition-group',
          name: !drag ? 'flip-list' : null
        }" 
        v-model="cmps" 
        v-bind="dragOptions"
        @start="drag = true"
        @end="drag = false"
        item-key="order"
    >
    <template #item="{ element }">
      <pre>{{ element }}</pre>
    </template>
      
    </draggable>

</template>

<script>
import draggable from 'vuedraggable'

import { utilService } from '../services/util.service'

import cmpEditor from '../cmps/cmp-editor.vue'
import wapHeader from '../cmps/wap-header.vue'
import appTemplates from './app-templates.vue'

export default {
  data() {
    return {
      selectedCmp: {},
      isOpenCmpEditor: true,
      dragOptions: {
        animation: 200,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      }
    }
  },
  methods: {
    handleUpdate({ cmpId, name, content, style }) {
      const cmp = cmps.find(({ _id }) => _id === cmpId)
      cmp[name] = content ?? cmp.content
      cmp[name] = style ?? cmp.style
    },

    async loadWap() {
      if (this.$route.params.id) {
        const { cmps } = await this.$store.dispatch({ type: 'getWap', id: this.$route.params.id })
      }
    },

    handleDrop() {
      this.$store.dispatch({ type: 'updateCmps', cmps: this.cmps })
    },

    select({ cmpId, name }) {
      const cmp = cmps.find(({ _id }) => id === cmpId)

      this.selectedCmp.style = cmp.style
      this.selectedCmp._id = cmpId
      this.selectedCmp.options = Object.keys(this.selectedCmp.style)

      this.isOpenCmpEditor = true
    }

  },
  computed: {
    cmps() {
      return JSON.parse(JSON.stringify(this.$store.getters.editedWap?.cmps || ''))
    },

  },
  created() {
    this.loadWap()
    this.handleDrop() 
  },

  watch: {
    cmps: {
      handler(cmps) {
      },
      deep: true,
    },
    
  },

  components: {
    cmpEditor,
    appTemplates,
    wapHeader,
    draggable
  },
}
</script>

