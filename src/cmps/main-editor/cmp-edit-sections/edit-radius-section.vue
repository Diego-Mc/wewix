<template>
  <section class="cmp-edit-section">
    <h6 class="edit-type-label">BORDER RADIUS</h6>
    <el-slider v-model="borderRadiusToEdit" placement="right" @input="handleBtnSelect" :min="0" value="1" :max="2" :step="0.001"/>
  </section>
</template>

<script>
export default {
  props: ['borderRadius', 'elStyle'],
  data() {
    return {
      borderRadiusToEdit: this.borderRadius || 0 
    }
  },
  components: {},
  methods: {
    handleBtnSelect() { 
      this.$emit('select', { key: 'borderRadius', val: this.borderRadiusToEdit })
    },
  },
  created() {
    console.log(this.elStyle);
  }
}
</script>

<style lang="scss" scoped></style>
