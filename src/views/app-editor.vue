<template>
  <div>
    <component v-for="cmp in cmps" is="cmp.type" @update="handleUpdate()"></component>
  </div>
</template>

<script>
import { utilService } from '../services/util.service'

export default {
  data() {
    return {
      cmps: wap,
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
    getCmpt() {
      return this.$store.getters.cmps
    },
  },
  created() {
    this.$store.dispatch('loadWaps')
  },
  watch: {
    cmps: {
      handler() {
        this.$store.dispatch({ type: 'updateCmps', cmps })
      },
      deep: true,
    },
  },
}
</script>

<style lang="scss" scoped>

</style>
