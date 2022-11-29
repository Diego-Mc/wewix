<template>
  <div>
    <cmp-editor v-if="isOpenCmpEditor" :id="selectedCmp._id" :editOptions="selectedCmp.options" :cmpStyle="selectedCmp.style" @update="handleUpdate()"></cmp-editor>

    <component
        v-for="cmp in cmps"
        is="cmp.type"
        @update="handleUpdate()"
        @select="select">
    </component>

  </div>
</template>

<script>
import { utilService } from '../services/util.service'
import cmpEditor from '../cmps/cmp-editor.vue'

export default {
  data() {
    return {
      cmps: null,
      selectedCmp: {},
      isOpenCmpEditor: true
    }
  },
  methods: {
    handleUpdate({ cmpId, name, content, style }) {
      const cmp = cmps.find(({ _id }) => _id === cmpId)
      cmp[name] = content ?? cmp.content
      cmp[name] = style ?? cmp.style
    },

    select({cmpId, name}) {
      const cmp = cmps.find(({ _id }) => id === cmpId)

      this.selectedCmp.style = cmp.style
      this.selectedCmp._id = cmpId
      this.selectedCmp.options = Object.keys(this.selectedCmp.style)

      this.isOpenCmpEditor = true
    }

  },
  computed: {
    getCmps() {
      return this.$store.getters.cmps
    },
  },
  created() {
    //change to loadWapById
    console.log('wa')
    // this.$store.dispatch('loadWaps').then(console.log(this.$store.getters))
  },
  watch: {
    cmps: {
      handler() {
        this.$store.dispatch({ type: 'updateCmps', cmps })
      },
      deep: true,
    },
  },
  components: {
    cmpEditor,
  },
}
</script>

<style lang="scss" scoped></style>
