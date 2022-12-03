<template>
  <section class="cmp-edit-section">
    <h6 class="edit-type-label">COLOR</h6>
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
      console.log('color selected, emitting @select', {
        key: 'color',
        val: color,
      })
      this.$emit('select', { key: 'color', val: color })
    },
  },
}
</script>

<style lang="scss" scoped></style>
