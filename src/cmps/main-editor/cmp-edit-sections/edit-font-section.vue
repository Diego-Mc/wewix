<template>
  <section class="cmp-edit-section">
    <h6 class="edit-type-label">FONT</h6>
    <editor-btn-group
      class="editor-btns"
      :info="{ key: 'fontFamily', type: 'picker' }"
      dir="row"
      v-model="elStyle"
      @setVal="handleBtnSelect"
      :style="{
        padding: '30px',
      }"
      :opts="[
        {
          val: 'Poppins',
          small: 'System',
          sample: 'Aa',
          style: 'font-family:\'Poppins\'', //Asap
        },
        {
          val: 'JosefinSans',
          small: 'Old',
          sample: 'Ss',
          style: 'font-family:\'JosefinSans\'', //Baskerville
        },
        {
          val: 'Oswald',
          small: 'Retro',
          sample: 'Yg',
          style: 'font-family:\'Oswald\'', //FiraCode
        },
        {
          val: 'Dosis',
          small: 'Round',
          sample: 'Rr',
          style: 'font-family:\'Dosis\'', //VarelaRound
        },
        {
          val: 'Inter',
          small: 'Neat',
          sample: 'Ff',
          style: 'font-family:\'Inter\'',
        },
        {
          val: 'Caveat',
          small: 'Freestyle',
          sample: 'Pr',
          style: 'font-family:\'Caveat\'',
        },
        {
          val: 'PlayfairDisplay',
          small: 'Fashion',
          sample: 'Cc',
          style: 'font-family:\'PlayfairDisplay\'',
        },
        {
          val: 'RedHatDisplay',
          small: 'Pro',
          sample: 'At',
          style: 'font-family:\'RedHatDisplay\'',
        },
      ]" />
  </section>
</template>

<script>
import editorBtnGroup from '../editor-items/editor-btn-group.vue'
export default {
  props: {
    elStyle: String,
  },
  created() {},
  components: {
    editorBtnGroup,
  },
  methods: {
    handleBtnSelect(res) {
      console.log('font selected, emitting @select', res)
      this.$emit('select', res)
    },
  },
}
</script>

<style lang="scss" scoped></style>
