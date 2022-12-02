<template>
  <section class="cmp-edit-section">
    <h6 class="edit-type-label">BACKGROUND COLOR</h6>
    <editor-color-picker @color="handleBtnSelect" />
  </section>
</template>

<script>
import editorColorPicker from '../editor-items/editor-color-picker.vue'
export default {
  components: {
    editorColorPicker,
  },
  methods: {
    handleBtnSelect(color) {
      console.log('backgroundColor selected, emitting @select', {
        key: 'backgroundColor',
        val: color,
      })
      this.$emit('select', { key: 'backgroundColor', val: color })
    },
  },
}
</script>

<style lang="scss" scoped></style>
