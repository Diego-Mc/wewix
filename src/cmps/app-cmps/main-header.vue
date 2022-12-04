<template>
  <header class="main-header">
    <section class="edit-options">
      <section class="history-options">
        <editor-btn-group
          gap="4px"
          :style="{ paddingInline: '14px' }"
          info="media"
          :opts="[
            {
              val: 'undo',
              icon: 'arrow-return-left',
            },
            {
              val: 'redo',
              icon: 'arrow-return-right',
            },
          ]" />
        <!-- <editor-btn-group
          info="media"
          :opts="[
            { val: 'undo', icon: 'arrow-counterclockwise' },
            { val: 'redo', icon: 'arrow-clockwise' },
          ]" /> -->
        <!-- <img class="undo-btn" src="src/assets/imgs/undo-2-icon.svg" />
        &nbsp;
        <img class="undo-btn" src="src/assets/imgs/redo-icon.svg" />
        &nbsp; -->
      </section>
      <section class="work-together">
        <editor-btn-group
          info="media"
          :style="{ paddingInline: '14px', marginLeft: '4px' }"
          :opts="[{ val: 'workTogether', icon: 'people' }]" />
      </section>
    </section>
    <div class="main-logo">
      <img class="logo" src="src/assets/imgs/wewix-logo.svg" />
      <!-- <h1 class="logo-text">wewix</h1> -->
    </div>
    <div class="auth-info">Diego Mc</div>
  </header>
</template>

<script>
import editorBtnGroup from '../main-editor/editor-items/editor-btn-group.vue'
export default {
  components: {
    editorBtnGroup,
  },
}
</script>

<style lang="scss" scoped></style>
