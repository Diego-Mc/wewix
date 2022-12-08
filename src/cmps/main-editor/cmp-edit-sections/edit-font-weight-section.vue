<template>
  <section class="cmp-edit-section">
    <h6 class="edit-type-label">FONT WEIGHT</h6>
    <editor-btn-group
      class="editor-btns"
      :info="{ key: 'fontWeight', type: 'picker' }"
      dir="row"
      initialValue="system"
      @setVal="handleBtnSelect"
      :style="{
        padding: '30px',
      }"
      :opts="[
        {
          val: '200',
          small: 'Light',
          sample: 'Li',
          style: 'font-weight:200',
        },
        {
          val: '400',
          small: 'Regular',
          sample: 'Re',
          style: 'font-weight:400',
        },
        {
          val: '600',
          small: 'Semi-Bold',
          sample: 'Sb',
          style: 'font-weight:600',
        },
        {
          val: '800',
          small: 'Bold',
          sample: 'Bb',
          style: 'font-weight:800',
        },
      ]" />
  </section>
</template>

<script>
import editorBtnGroup from '../editor-items/editor-btn-group.vue'
export default {
  components: {
    editorBtnGroup,
  },
  methods: {
    handleBtnSelect(res) {
      console.log('font weight selected, emitting @select', res)
      this.$emit('select', res)
    },
  },
}
</script>

<style lang="scss" scoped></style>
