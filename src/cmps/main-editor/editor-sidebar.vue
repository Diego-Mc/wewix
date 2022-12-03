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
          class="desktop-section-names-btns"
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
        <editor-btn-group
          class="mobile-section-names-btns"
          :info="{ key: 'section', type: 'picker' }"
          dir="row"
          @setVal="handleBtnSelect"
          :style="{
            padding: '30px',
            margin: '4px',
          }"
          :opts="[
            { val: 'header', small: 'Header', sample: 'Hh' },
            { val: 'hero', small: 'Hero', sample: 'He' },
            { val: 'contact', small: 'Contact', sample: 'Cc' },
            { val: 'cta', small: 'CTA', sample: 'Ct' },
            { val: 'testimonial', small: 'Testimonial', sample: 'Tt' },
            { val: 'text', small: 'Text', sample: 'Tx' },
            { val: 'about', small: 'About', sample: 'Ab' },
            { val: 'gallery', small: 'Gallery', sample: 'Gl' },
          ]" />
      </nav>
      <section
        class="section-cmps"
        :class="{ open: isOpen('section', 'header') }">
        <wap-templates />
        <cmp-item src="src/assets/imgs/cmp-img-test.png" />
        <cmp-item src="src/assets/imgs/cmp-cards-1.png" />
        <cmp-item src="src/assets/imgs/cmp-gallery-1.png" />
        <cmp-item src="src/assets/imgs/cmp-hero-1.png" />
        <cmp-item src="src/assets/imgs/cmp-section-1.png" />
        <cmp-item src="src/assets/imgs/cmp-section-2.png" />
      </section>
    </section>
    <section
      class="cmp-editor"
      :class="{ open: isOpen('editOpt', 'edit-cmp') }">
      <h2 class="title">Section</h2>
      <cmp-editor
        v-if="selectedCmp.id"
        :id="selectedCmp.id"
        :childCmpId="selectedCmp.childCmpId"
        :editOptions="selectedCmp.options"
        :elType="selectedCmp.elType" />
    </section>

    <section
      class="page-editor cmp-editor"
      :class="{ open: isOpen('editOpt', 'edit-site') }">
      <h2 class="title">Section</h2>
      <edit-font-section />
      <general-editor />
    </section>
  </section>
</template>

<script>
import { eventBus } from '../../services/event-bus.service'
import cmpEditor from './editor-items/cmp-editor.vue'

import wapTemplates from './wap-templates.vue'
import generalEditor from '../app-cmps/general-editor.vue'

//------------------------------------------------------------/
import editorBtnGroup from '../main-editor/editor-items/editor-btn-group.vue'
import cmpItem from './editor-items/cmp-item.vue'
import editorColorPicker from './editor-items/editor-color-picker.vue'

import editFontSection from '../main-editor/cmp-edit-sections/edit-font-section.vue'
import editFontWeightSection from '../main-editor/cmp-edit-sections/edit-font-weight-section.vue'
import editColorSection from '../main-editor/cmp-edit-sections/edit-color-section.vue'
import editBgColorSection from '../main-editor/cmp-edit-sections/edit-bg-color-section.vue'
import editRadiusSection from '../main-editor/cmp-edit-sections/edit-radius-section.vue'
import editUploadSection from '../main-editor/cmp-edit-sections/edit-upload-section.vue'

export default {
  props: {
    selectedCmp: Object,
  },
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
    openCmpEditor() {
      this.section = 'edit-cmp'
      this.editOpt = 'edit-cmp'
    },
  },

  watch: {
    selectedCmp: {
      handler() {
        this['editOpt'] === 'edit-cmp'
        this.openCmpEditor()
      },
      deep: true,
    },
  },

  components: {
    editorBtnGroup,
    cmpItem,
    editorColorPicker,
    editFontSection,
    editFontWeightSection,
    editColorSection,
    editRadiusSection,
    editUploadSection,
    editBgColorSection,
    wapTemplates,
    generalEditor,
    cmpEditor,
  },
}
</script>

<style lang="scss" scoped></style>
