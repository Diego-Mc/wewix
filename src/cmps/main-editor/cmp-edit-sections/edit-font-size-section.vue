<template>
  <section class="cmp-edit-section">
    <h6 class="edit-type-label">FONT SIZE</h6>
    <el-slider
      v-model="fontSizeToEdit"
      placement="right"
      @input="handleBtnSelect"
      :min="0.5"
      :max="10"
      :step="0.001" />
  </section>
</template>

<script>
export default {
  props: ['fontSize'],
  data() {
    return {
      fontSizeToEdit: parseInt(this.fontSize) / 16,
    }
  },
  components: {},
  methods: {
    handleBtnSelect() {
      this.$emit('select', { key: 'fontSize', val: this.fontSizeToEdit })
    },
  },
  watch:{
    fontSize:{
      handler(){
        this.fontSizeToEdit =  parseInt(this.fontSize) / 16
        console.log('ya');
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
