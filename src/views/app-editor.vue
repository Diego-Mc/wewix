<template>
  <div>
    <cmp-editor></cmp-editor>
    <component v-for="cmp in cmps" is="cmp.type" @update="handleUpdate()"></component>
    <!-- test -->
    <p v-if="cmps"> {{ cmps }}</p>
    <!-- test -->
    <cmp-editor v-if="isOpenCmpEditor" :id="selectedCmp._id" :editOptions="selectedCmp.options"
      :cmpStyle="selectedCmp.style" @update="handleUpdate()"></cmp-editor>

    <component v-for="cmp in cmps" is="cmp.type" @update="handleUpdate()" @select="select">
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
    async loadWap() {
      if (this.$route.params.id) {
        const { cmps } = await this.$store.dispatch({ type: 'getWap', id: this.$route.params.id })
      }
    },
    handleDrop() {
      this.$store.dispatch({ type: 'updateCmps', cmps: this.cmps })
    }
    ,
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
    // else 
  },
  //change to loadWapById
  // this.$store.dispatch('loadWaps').then(console.log(this.$store.getters))
  watch: {
    cmps: {
      handler(cmps) {
      },
      deep: true,
    },
  },
  components: {
    cmpEditor,
  },
}
</script>

<style lang="scss" scoped>

</style>
