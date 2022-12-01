<template>
  <header class="main-header">
    <section class="edit-options">
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
        <editor-btn-group
          gap="4px"
          info="media"
          :opts="[{ val: 'undo', icon: 'people' }]" />
      </section>
    </section>
    <div class="main-logo">
      <img class="logo" src="src/assets/imgs/wewix-logo.svg" />
      <h1 class="logo-text">wewix</h1>
    </div>
    <div class="auth-info">Diego Mc</div>
  </header>
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
