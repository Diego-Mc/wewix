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
import colorItem from '../app-items/color-item.vue'
export default {
  data() {
    return {
      colors: [
        { initialValue: '#202225', selected: true, isPicker: false },
        { initialValue: '#657487', selected: false, isPicker: false },
        { initialValue: '#9ea4aa', selected: false, isPicker: false },
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
    handleColorPicked(cl, idx) {
      this.colors.forEach((col, i) => (col.selected = idx === i ? true : false))
      this.$emit('color', cl)
    },
  },
  components: {
    colorItem,
  },
}
</script>

<style lang="scss" scoped></style>
