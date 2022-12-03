<template>
    <section class="cmp-edit-section">
      <h6 class="edit-type-label">FONT SIZE</h6>
      <el-slider v-model="fontSize" placement="right" @input="handleBtnSelect($event)" :min="0" :max="3" :step="0.001"/>
    </section>
  </template>
  
  <script>
  export default {
    props: ['editOptions'],
    data() {
      return {
        fontSize: parseFloat(this.editOptions?.style?.fontSize) || 0 
      }
    },
    components: {},
    methods: {
      handleBtnSelect() { 
        this.$emit('select', { key: 'fontSize', val: this.fontSize })
      },
    },
  }
  </script>
  
  <style lang="scss" scoped></style>
  