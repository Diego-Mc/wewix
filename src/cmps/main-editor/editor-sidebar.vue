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
            title: { text: 'Settings', placement: 'right' },
          },
        ]" />
    </nav>
    <section
      class="section-select"
      :class="{ open: tabState.editOpt === 'add-cmp' }">
      <nav class="section-names">
        <h2 class="title">
          <i
            @click="tabState.section = ''"
            v-if="tabState.section"
            class="bi bi-chevron-left back-btn"></i>
          &nbsp;Section
        </h2>
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
        <wap-templates
          :cmpType="tabState.section"
          @addByClick="(cmp) => $emit('addByClick', cmp)" />
      </section>
    </section>
    <section
      class="cmp-editor"
      :class="{ open: tabState.editOpt === 'edit-cmp' }">
      <h2 class="title editor-sidebar-actions-layout">
        Edit
        <div class="crud-actions">
          
          <section v-if="isMobile && !selectedCmp.childCmpId && currWap.cmps.length > 1">
              <el-button v-if="currCmpIdx < currWap.cmps.length - 1">
                <span
                  class="bi bi-arrow-down"
                  @click="changeOrder(currCmpIdx, currCmpIdx + 1)">
                </span>
              </el-button>
              <el-button v-if="currCmpIdx > 0">
                <span
                  class="bi bi-arrow-up"
                  @click="changeOrder(currCmpIdx, currCmpIdx - 1)">
                </span>
              </el-button>
          </section>
          <i
            @click.stop="onRemoveCmp"
            :hidden="!selectedCmp.id"
            class="bi bi-trash"></i>
        </div>
      </h2>
      <cmp-editor
        v-if="selectedCmp.id"
        :id="selectedCmp.id"
        :childCmpId="selectedCmp.childCmpId"
        :editOptions="selectedCmp.options"
        :elType="selectedCmp.elType"
        :elDom="selectedCmp.elDom"
        @changeOrder="
          (newOrder) => {
            this.$emit('changeOrder', newOrder)
          }
        " />
      <h3 class="placeholder-text" v-else>Select an element to edit</h3>
    </section>

    <section
      class="page-editor cmp-editor"
      :class="{ open: tabState.editOpt === 'edit-site' }">
      <h2 class="title">Settings</h2>
      <!-- <edit-font-section /> -->
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
      currCmpIdx: null
    }
  },
  methods: {
    openCmpEditor() {
      this.tabState.editOpt = 'edit-cmp'
    },
    closeCmpEditor() {
      this.tabState.editOpt = ''
    },
    onRemoveCmp() {
      eventBus.emit('onRemoveCmp')
    },
    changeOrder(oldIdx, newIdx) {
      this.currCmpIdx = newIdx
      this.$emit('changeOrder', { oldIdx, newIdx })
    },
  },

  computed: {
    currWap() {
      return this.$store.getters.editedWap
    },
    isMobile() {
      return window.innerWidth <= 900
    },
    getCmpIdx() {
      const currWap = this.$store.getters.editedWap
      if (!currWap) return

      const currCmps = currWap.cmps
      if (!currCmps.length) return

      return currCmps.findIndex(({ id }) => id === this.selectedCmp.id)
    },
  },

  watch: {
    'selectedCmp.id': {
      deep: true,
      immediate: true,
      handler() {
        this.currCmpIdx = this.getCmpIdx
      },
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

<style lang="scss" scoped>
.editor-sidebar-actions-layout {
  display: flex;
  justify-content: space-between;

  .bi-trash {
    transition: 0.2s;
    cursor: pointer;
    color: rgba(30, 30, 30, 0.4);

    &:hover {
      color: rgb(239, 3, 42) !important;
    }

    &::before {
      content: '\f5de';
      width: 32px;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
