<template>
  <section class="cmp-edit-section">
    <h6 class="edit-type-label">BORDER RADIUS</h6>
    <el-slider v-model="radius" placement="right" @input="handleBtnSelect($event)" :min="0" :max="2" :step="0.001"/>
  </section>
</template>

<script>
export default {
  props: ['editOptions'],
  data() {
    return {
      radius: parseFloat(this.editOptions?.style?.borderRadius) || 0 
    }
  },
  components: {},
  methods: {
    handleBtnSelect(radius) { 
      this.$emit('select', { key: 'borderRadius', val: radius })
    },
  },
}
</script>

<style lang="scss" scoped></style>
