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
    <section class="history-options">
      <!-- <i class="icon undo-btn bi bi-arrow-counterclockwise"></i> -->
      <!-- <i class="icon redo-btn bi bi-arrow-clockwise"></i> -->
      <editor-btn-group
        gap="4px"
        info="media"
        :opts="[
          { val: 'undo', icon: 'arrow-counterclockwise' },
          { val: 'redo', icon: 'arrow-clockwise' },
        ]" />
    </section>
    <section class="work-together">
      <i class="icon work-together-btn bi bi-people"></i>
    </section>
    <section class="upload-site">
      <i class="icon upload-site-btn bi bi-cast"></i>
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
