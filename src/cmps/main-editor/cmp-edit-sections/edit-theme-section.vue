<template>
  <section class="cmp-edit-section">
    <h6 class="edit-type-label">DEFAULT THEME</h6>
    <editor-btn-group
      :info="{ key: 'theme', type: 'picker' }"
      dir="column"
      v-model="themeClass"
      class="theme-picker"
      @setVal="handleBtnSelect"
      :opts="[
        {
          val: 'theme-1',
          text: 'Theme 1',
        },
        {
          val: 'theme-2',
          text: 'Theme 2',
        },
        {
          val: 'theme-3',
          text: 'Theme 3',
        },
        {
          val: 'theme-4',
          text: 'Theme 4',
        },
        {
          val: 'theme-5',
          text: 'Theme 5',
        },
      ]" />
  </section>
</template>

<script>
import editorBtnGroup from '../editor-items/editor-btn-group.vue'
export default {
  data() {
    return {
      themeClass: '',
    }
  },
  components: {
    editorBtnGroup,
  },
  methods: {
    handleBtnSelect(res) {
      console.log('theme selected, emitting @select', res)
      this.$emit('select', res)
    },
  },
}
</script>

<style lang="scss" scoped></style>
