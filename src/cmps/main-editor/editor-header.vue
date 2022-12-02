<template>
  <nav class="editor-header">
    <section class="media-select">
      <editor-btn-group
        :info="{ key: 'media' }"
        @setVal="handleMediaSelect"
        gap="4px"
        :style="{ paddingInline: '14px' }"
        initialValue="desktop"
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
        :info="{ key: 'publishSite' }"
        @setVal="handleBtnSelect"
        :style="{ gap: '10px' }"
        :opts="[{ val: true, icon: 'cast', text: 'Publish' }]" />
    </section>
  </nav>
</template>

<script>
import editorBtnGroup from '../main-editor/editor-items/editor-btn-group.vue'
export default {
  data() {
    return {
      media: '',
      publishSite: '',
    }
  },
  methods: {
    handleBtnSelect({ key, val }) {
      console.log({ key, val })
      this[key] = val
    },
    handleMediaSelect({ key, val }) {
      this.handleBtnSelect({ key, val })
      this.$emit('setMedia', val)
    },
  },
  components: {
    editorBtnGroup,
  },
}
</script>

<style lang="scss" scoped></style>
