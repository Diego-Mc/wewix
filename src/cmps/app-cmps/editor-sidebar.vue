<template>
  <section class="editor-sidebar">
    <nav class="editor-nav">
      <editor-btn-group
        info="media"
        dir="column"
        :style="{ paddingBlock: '30px', margin: '4px' }"
        :opts="[
          { val: 'add-cmp', icon: 'plus-lg' },
          { val: 'edit-cmp', icon: 'droplet' },
          { val: 'edit-site', icon: 'file-richtext' },
        ]" />
    </nav>
    <section class="section-select open">
      <nav class="section-names">
        <h2 class="title">Section</h2>
        <editor-btn-group
          info="media"
          dir="column"
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
      <section class="section-cmps open">
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
  components: {
    editorBtnGroup,
  },
}
</script>

<style lang="scss" scoped></style>
