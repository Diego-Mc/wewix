<template>
  <div>
    <component v-for="cmp in cmps" is="cmp.type" @update="handleUpdate()"></component>
  </div>
</template>

<script>
import { utilService } from '../services/util.service'
import wap from '../services/wap-model.js'

export default {
  data: {
    cmps: wap,
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
    console.log(wap);
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
