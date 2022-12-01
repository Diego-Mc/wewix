<template>
  <section class="editor-sidebar">
    <nav class="editor-nav">
      <editor-btn-group
        :info="{ key: 'editOpt' }"
        dir="column"
        :style="{ paddingBlock: '30px', paddingInline: '14px', margin: '4px' }"
        @setVal="handleBtnSelect"
        :opts="[
          { val: 'add-cmp', icon: 'plus-lg' },
          { val: 'edit-cmp', icon: 'droplet' },
          { val: 'edit-site', icon: 'file-richtext' },
        ]" />
    </nav>
    <section
      class="section-select"
      :class="{ open: isOpen('editOpt', 'add-cmp') }">
      <nav class="section-names">
        <h2 class="title">Section</h2>
        <editor-btn-group
          :info="{ key: 'section' }"
          dir="column"
          @setVal="handleBtnSelect"
          :style="{
            margin: '4px',
            justifyContent: 'flex-start',
            padding: '18px 20px',
          }"
          :opts="[
            { val: 'header', text: 'Header' },
            { val: 'hero', text: 'Hero' },
            { val: 'contact', text: 'Contact' },
            { val: 'cta', text: 'CTA' },
            { val: 'testimonial', text: 'Testimonial' },
            { val: 'text', text: 'Text' },
            { val: 'about', text: 'About' },
            { val: 'gallery', text: 'Gallery' },
          ]" />
      </nav>
      <section
        class="section-cmps"
        :class="{ open: isOpen('section', 'header') }">
        <article class="cmp-img-container">
          <img src="src/assets/imgs/cmp-img-test.png" />
          <i class="grab-icon bi bi-grip-vertical"></i>
        </article>
        <article class="cmp-img-container">
          <img src="src/assets/imgs/cmp-img-test.png" />
          <i class="grab-icon bi bi-grip-vertical"></i>
        </article>
        <article class="cmp-img-container">
          <img src="src/assets/imgs/cmp-img-test.png" />
          <i class="grab-icon bi bi-grip-vertical"></i>
        </article>
      </section>
    </section>
    <section class="cmp-editor"></section>
    <section class="page-editor"></section>
  </section>
</template>

<script>
import editorBtnGroup from './editor-btn-group.vue'
export default {
  data() {
    return {
      editOpt: '',
      section: '',
    }
  },
  methods: {
    handleBtnSelect({ key, val }) {
      console.log({ key, val })
      this[key] = val
    },
    isOpen(key, val) {
      return this[key] === val
    },
  },
  components: {
    editorBtnGroup,
  },
}
</script>

<style lang="scss" scoped></style>
