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
        <cmp-item />
        <cmp-item />
        <cmp-item />
        <cmp-item />
        <cmp-item />
        <cmp-item />
        <cmp-item />
        <cmp-item />
        <cmp-item />
        <cmp-item />
        <cmp-item />
        <cmp-item />
      </section>
    </section>
    <section
      class="cmp-editor"
      :class="{ open: isOpen('editOpt', 'edit-cmp') }">
      <h2 class="title">Section</h2>
      <h6 class="edit-type-label">FONT</h6>
      <editor-btn-group
        :info="{ key: 'font', type: 'picker' }"
        dir="row"
        initialValue="system"
        @setVal="handleBtnSelect"
        :style="{
          margin: '4px',
          padding: '30px',
        }"
        :opts="[
          {
            val: 'system',
            small: 'System',
            sample: 'Aa',
            style: 'font-family:\'Rubik\'',
          },
          {
            val: 'fancy',
            small: 'Fancy',
            sample: 'Ss',
            style: 'font-family:\'Baskerville\'',
          },
          {
            val: 'mono',
            small: 'Mono',
            sample: '00',
            style: 'font-family:\'FiraCode\'',
          },
          {
            val: 'round',
            small: 'Round',
            sample: 'Rr',
            style: 'font-family:\'VarelaRound\'',
          },
          {
            val: 'fun',
            small: 'Fun',
            sample: 'Ff',
            style: 'font-family:\'SignPainter\'',
          },
          {
            val: 'pro',
            small: 'Pro',
            sample: 'Pr',
            style: 'font-family:\'Helvetica\'',
          },
          {
            val: 'cool',
            small: 'Cool',
            sample: 'Cc',
            style: 'font-family:\'Silom\'',
          },
          {
            val: 'old',
            small: 'Old',
            sample: 'At',
            style: 'font-family:\'AmericanTypewriter\'',
          },
        ]" />
    </section>
    <section
      class="page-editor cmp-editor"
      :class="{ open: isOpen('editOpt', 'edit-site') }">
      <h2 class="title">Section</h2>
      <h6 class="edit-type-label">FONT</h6>
      <editor-btn-group
        :info="{ key: 'font', type: 'picker' }"
        dir="row"
        initialValue="system"
        @setVal="handleBtnSelect"
        :style="{
          margin: '4px',
          padding: '30px',
        }"
        :opts="[
          {
            val: 'system',
            small: 'System',
            sample: 'Aa',
            style: 'font-family:\'Rubik\'',
          },
          {
            val: 'fancy',
            small: 'Fancy',
            sample: 'Ss',
            style: 'font-family:\'Baskerville\'',
          },
          {
            val: 'mono',
            small: 'Mono',
            sample: '00',
            style: 'font-family:\'FiraCode\'',
          },
          {
            val: 'round',
            small: 'Round',
            sample: 'Rr',
            style: 'font-family:\'VarelaRound\'',
          },
          {
            val: 'fun',
            small: 'Fun',
            sample: 'Ff',
            style: 'font-family:\'SignPainter\'',
          },
          {
            val: 'pro',
            small: 'Pro',
            sample: 'Pr',
            style: 'font-family:\'Helvetica\'',
          },
          {
            val: 'cool',
            small: 'Cool',
            sample: 'Cc',
            style: 'font-family:\'Silom\'',
          },
          {
            val: 'old',
            small: 'Old',
            sample: 'At',
            style: 'font-family:\'AmericanTypewriter\'',
          },
        ]" />
    </section>
  </section>
</template>

<script>
import editorBtnGroup from './editor-btn-group.vue'
import cmpItem from '../app-items/cmp-item.vue'
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
    cmpItem,
  },
}
</script>

<style lang="scss" scoped></style>
