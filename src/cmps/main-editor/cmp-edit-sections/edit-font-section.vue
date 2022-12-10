<template>
  <section class="cmp-edit-section">
    <h6 class="edit-type-label">FONT</h6>
    <editor-btn-group
      class="editor-btns"
      :info="{ key: 'fontFamily', type: 'picker' }"
      dir="row"
      v-model="font"
      @setVal="handleBtnSelect"
      :style="{
        padding: '30px',
      }"
      :opts="[
        {
          val: 'PoppinsRegular',
          small: 'System',
          sample: 'Aa',
          style: 'font-family:\'PoppinsRegular\'', //Asap
        },
        {
          val: 'JosefinSans',
          small: 'Fancy',
          sample: 'Ss',
          style: 'font-family:\'JosefinSans\'', //Baskerville
        },
        {
          val: 'Raleway',
          small: 'Mono',
          sample: '00',
          style: 'font-family:\'Raleway\'', //FiraCode
        },
        {
          val: 'SpaceGrotesk',
          small: 'Round',
          sample: 'Rr',
          style: 'font-family:\'SpaceGrotesk\'', //VarelaRound
        },
        {
          val: 'fun',
          small: 'Fun',
          sample: 'Ff',
          style: 'font-family:\'SignPainter\'',
        },
        {
          val: 'pro',
          small: 'Pro',
          sample: 'Pr',
          style: 'font-family:\'Helvetica\'',
        },
        {
          val: 'cool',
          small: 'Cool',
          sample: 'Cc',
          style: 'font-family:\'Silom\'',
        },
        {
          val: 'old',
          small: 'Old',
          sample: 'At',
          style: 'font-family:\'AmericanTypewriter\'',
        },
      ]" />
  </section>
</template>

<script>
import editorBtnGroup from '../editor-items/editor-btn-group.vue'
export default {
  data() {
    return {
      font: 'PoppinsRegular',
    }
  },
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
