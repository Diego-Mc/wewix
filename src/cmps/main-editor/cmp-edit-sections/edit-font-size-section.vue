<template>
    <section class="cmp-edit-section">
      <h6 class="edit-type-label">FONT SIZE</h6>
      <el-slider v-model="fontSizeToEdit" placement="right" @input="handleBtnSelect" :min="0" :max="3" :step="0.001"/>
    </section>
  </template>
  
  <script>
  export default {
    props: ['fontSize'],
    data() {
      return {
        fontSizeToEdit: this.fontSize || 0 
      }
    },
    components: {},
    methods: {
      handleBtnSelect() { 
        this.$emit('select', { key: 'fontSize', val: this.fontSizeToEdit })
      },
    },
  }
  </script>
  
  <style lang="scss" scoped></style>
  