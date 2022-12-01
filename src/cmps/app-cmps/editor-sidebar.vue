<template>
  <section class="editor-sidebar">
    <nav class="editor-nav">
      <editor-btn-group
        info="media"
        dir="column"
        :style="{ paddingBlock: '30px', margin: '4px' }"
        :opts="[
          { val: 'desktop', icon: 'plus-lg' },
          { val: 'tablet', icon: 'droplet' },
          { val: 'phone', icon: 'file-richtext' },
        ]" />
    </nav>
    <section class="section-picker">
      <section class="section-cmps"></section>
    </section>
    <section class="cmp-editor"></section>
    <section class="page-editor"></section>
  </section>
</template>

<script>
import editorBtnGroup from './editor-btn-group.vue'
export default {
  components: {
    editorBtnGroup,
  },
}
</script>

<style lang="scss" scoped></style>
