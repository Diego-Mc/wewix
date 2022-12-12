<template>
  <section class="editor-sidebar">
    <nav class="editor-nav">
      <editor-btn-group
        :info="{ key: 'editOpt' }"
        dir="column"
        :style="{ paddingBlock: '30px', paddingInline: '14px', margin: '4px' }"
        v-model="tabState.editOpt"
        :key="tabState.editOpt"
        :opts="[
          {
            val: 'add-cmp',
            icon: 'plus-lg',
            title: { text: 'Add', placement: 'right' },
          },
          {
            val: 'edit-cmp',
            icon: 'droplet',
            title: { text: 'Edit', placement: 'right' },
          },
          {
            val: 'edit-site',
            icon: 'file-richtext',
            title: { text: 'Themes', placement: 'right' },
          },
        ]" />
    </nav>
    <section
      class="section-select"
      :class="{ open: tabState.editOpt === 'add-cmp' }">
      <nav class="section-names">
        <h2 class="title">Section</h2>
        <editor-btn-group
          class="desktop-section-names-btns"
          :info="{ key: 'section' }"
          dir="column"
          v-model="tabState.section"
          :style="{
            margin: '4px',
            justifyContent: 'flex-start',
            padding: '18px 20px',
          }"
          :opts="[
            { val: 'header', text: 'Header' },
            { val: 'hero', text: 'Hero' },
            { val: 'section', text: 'Section' },
            { val: 'gallery', text: 'Gallery' },
            { val: 'cards', text: 'Cards' },
            { val: 'testimonials', text: 'Testimonials' },
            { val: 'contact', text: 'Contact' },
            { val: 'video', text: 'Video' },
          ]" />
        <editor-btn-group
          class="mobile-section-names-btns"
          :info="{ key: 'section', type: 'picker' }"
          dir="row"
          v-model="tabState.section"
          :style="{
            padding: '30px',
            margin: '4px',
          }"
          :opts="[
            { val: 'header', small: 'Header', sample: 'Hh' },
            { val: 'hero', small: 'Hero', sample: 'He' },
            { val: 'section', small: 'Section', sample: 'Sc' },
            { val: 'gallery', small: 'Gallery', sample: 'Gl' },
            { val: 'cards', small: 'Cards', sample: 'Cr' },
            { val: 'testimonials', small: 'Testimonials', sample: 'Tt' },
            { val: 'contact', small: 'Contact', sample: 'Cc' },
            { val: 'video', small: 'Video', sample: 'Vd' },
          ]" />
      </nav>
      <section class="section-cmps" :class="{ open: tabState.section }">
        <wap-templates :cmpType="tabState.section" @addByClick="(cmp) => $emit('addByClick', cmp)"/>
      </section>
    </section>
    <section
      class="cmp-editor"
      :class="{ open: tabState.editOpt === 'edit-cmp' }">
      <h2 class="title">Edit</h2>
      <cmp-editor
        v-if="selectedCmp.id"
        :id="selectedCmp.id"
        :childCmpId="selectedCmp.childCmpId"
        :editOptions="selectedCmp.options"
        :elType="selectedCmp.elType"
        :elDom="selectedCmp.elDom"
        @changeOrder="(newOrder) => {this.$emit('changeOrder', newOrder)}"
       />
      <h3 v-else>Select an element to edit</h3>
    </section>

    <section
      class="page-editor cmp-editor"
      :class="{ open: tabState.editOpt === 'edit-site' }">
      <h2 class="title">Settings</h2>
      <!-- <edit-font-section /> -->
      <general-editor/>
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
  created() {
    eventBus.on('openCmpEditor', this.openCmpEditor)
    eventBus.on('closeCmpEditor', this.closeCmpEditor)
  },
  data() {
    return {
      tabState: {
        editOpt: '',
        section: '',
      },
    }
  },
  methods: {
    openCmpEditor() {
      this.tabState.editOpt = 'edit-cmp'
    },
    closeCmpEditor() {
      this.tabState.editOpt = ''
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
