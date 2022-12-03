<template>
  <section class="cmp-edit-section">
    <h6 class="edit-type-label">BORDER RADIUS</h6>
    <el-slider v-model="radius" placement="right" @input="handleBtnSelect" />
  </section>
</template>

<script>
export default {
  props: ['initialValue'],
  data() {
    return {
      radius: this.initialValue ?? 0,
    }
  },
  components: {},
  methods: {
    handleBtnSelect(radius) {
      console.log('radius selected, emitting @select', {
        key: 'borderRadius',
        val: radius,
      })
      this.$emit('select', { key: 'borderRadius', val: radius })
    },
  },
}
</script>

<style lang="scss" scoped></style>
