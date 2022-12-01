<template>
  <nav class="editor-header">
    <section class="media-select">
      <editor-btn-group
        gap="4px"
        info="media"
        :opts="[
          { val: 'desktop', icon: 'display' },
          { val: 'tablet', icon: 'tablet' },
          { val: 'phone', icon: 'phone' },
        ]" />
    </section>
    <section class="url-bar">
      <p class="address">
        https://wewix.onrender.com/<span class="site-name" contenteditable
          >my-site</span
        >
      </p>
      <router-link to="#" class="preview-btn">preview site</router-link>
    </section>

    <section class="upload-site">
      <editor-btn-group
        gap="4px"
        info="media"
        :opts="[{ val: 'undo', icon: 'cast' }]" />
      Publish
    </section>
  </nav>
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
