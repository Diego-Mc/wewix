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
          ]" 
          @setVal="setEditorModalState"
          />
      </nav>
      <section :class="{open: openedEditModal === 'add-cmp'}" class="section-select">
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
            ]" @setVal="setEditorModalState"/>
        </nav>

        <app-templates/>
      </section>
      <section class="cmp-editor"></section>
      <section class="page-editor"></section>
    </section>
  </template>
  
  <script>
  import editorBtnGroup from './editor-btn-group.vue'
  import appTemplates from '../../views/app-templates.vue';
  export default {
    data() {
        return {
            openedSection: null,
            openedEditModal: null,
        }
    },
    components: {
      editorBtnGroup,
      appTemplates
    },

    methods: {
        setEditorModalState({ans}) {
            console.log(ans);
            if ('add-cmp edit-cmp edit-site'.includes(ans)) {
                this.openedEditModal = ans
                this.openedSection = null
                return
            }
            this.openedSection = ans
            
        }
    }
  }
  </script>
  
  <style lang="scss" scoped></style>
  