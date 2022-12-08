<template>
  <section class="editor-color-picker">
    <!-- <el-color-picker v-model="color" @active-change="doColor" /> -->
    <component
      is="color-item"
      v-for="(color, idx) in colors"
      :initialValue="color.initialValue"
      :selected="color.selected"
      @colorPicked="handleColorPicked($event, idx)"
      :isPicker="color.isPicker" />
  </section>
</template>

<script>
import colorItem from './color-item.vue'
export default {
  data() {
    return {
      colors: [
        { initialValue: 'var(--clr-1)', selected: true, isPicker: false },
        { initialValue: 'var(--clr-2)', selected: false, isPicker: false },
        { initialValue: 'var(--clr-3)', selected: false, isPicker: false },
        { initialValue: '#0400ff', selected: false, isPicker: false },
        { initialValue: '#0064ff', selected: false, isPicker: false },
        { initialValue: '#00bae5', selected: false, isPicker: false },
        { initialValue: '#00ca84', selected: false, isPicker: false },
        { initialValue: '#c400ff', selected: false, isPicker: false },
        { initialValue: '#ef032a', selected: false, isPicker: false },
        { initialValue: '#ff9202', selected: false, isPicker: false },
        { initialValue: '#864d01', selected: false, isPicker: false },
        { initialValue: '#7eb2e4', selected: false, isPicker: true },
      ],
    }
  },
  methods: {
    handleColorPicked(color, idx) {
      this.colors.forEach((col, i) => (col.selected = idx === i ? true : false))
      this.$emit('color', color)
    },
  },
  components: {
    colorItem,
  },
}
</script>

<style lang="scss" scoped></style>
