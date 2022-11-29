<template>
  <div>
    <cmp-editor></cmp-editor>
    <component
      v-for="cmp in cmps"
      is="cmp.type"
      @update="handleUpdate()"></component>
  </div>
</template>

<script>
import { utilService } from '../services/util.service'
import cmpEditor from '../cmps/cmp-editor.vue'

export default {
  data() {
    return {
      cmps: null,
    }
  },
  methods: {
    handleUpdate({ cmpId, name, content, style }) {
      const cmp = cmps.find(({ id }) => id === cmpId)
      cmp[name] = content ?? cmp.content
      cmp[name] = style ?? cmp.style
    },
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
