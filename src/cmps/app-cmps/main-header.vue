<template>
  <header class="main-header">
    <section class="edit-options">
      <section class="history-options">
        <editor-btn-group
          gap="4px"
          :style="{ paddingInline: '14px' }"
          :info="{ key: 'history', type: 'click' }"
          :opts="[
            {
              val: 'undo',
              icon: 'arrow-return-left',
              title: { text: 'Undo', placement: 'bottom' },
            },
            {
              val: 'redo',
              icon: 'arrow-return-right',
              title: { text: 'Redo', placement: 'bottom' },
            },
          ]" />
      </section>
      <section class="work-together">
        <editor-btn-group
          :info="{ key: 'workTogether', type: 'click' }"
          :style="{ paddingInline: '14px', marginLeft: '4px' }"
          :opts="[
            {
              val: 'workTogether',
              icon: 'people',
              title: { text: 'Work together', placement: 'bottom' },
            },
          ]" />
      </section>
    </section>
    <div class="main-logo">
      <img class="logo" src="../../assets/imgs/wewix-logo.svg" />
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
