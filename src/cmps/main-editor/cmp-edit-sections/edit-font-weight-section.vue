<template>
  <section class="cmp-edit-section">
    <h6 class="edit-type-label">FONT WEIGHT</h6>
    <editor-btn-group
      :info="{ key: 'fontWeight', type: 'picker' }"
      dir="row"
      initialValue="system"
      @setVal="handleBtnSelect"
      :style="{
        margin: '4px',
        padding: '30px',
      }"
      :opts="[
        {
          val: 'light',
          small: 'Light',
          sample: 'Li',
          style: 'font-weight:200',
        },
        {
          val: 'regular',
          small: 'Regular',
          sample: 'Re',
          style: 'font-weight:400',
        },
        {
          val: 'bold',
          small: 'Semi-Bold',
          sample: 'Sb',
          style: 'font-weight:600',
        },
        {
          val: 'bolder',
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
