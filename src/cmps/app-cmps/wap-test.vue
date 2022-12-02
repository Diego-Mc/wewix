<template>
  <div class="wap" :style="{ fontFamily: 'SpaceGrotesk' }">
    <wap-header
      :cmpId="header.id"
      :info="header.info"
      :options="header.options" />
    <wap-hero :cmpId="hero.id" :info="hero.info" :options="hero.options" />
    <wap-section
      :cmpId="section.id"
      :info="section.info"
      :options="section.options"
      :cmps="section.cmps" />
    <wap-cards
      :cmpId="cards.id"
      :info="cards.info"
      :options="cards.options"
      :cmps="cards.cmps" />
    <wap-form :cmpId="form.id" :info="form.info" :options="form.options" />
  </div>
</template>

<script>
import wapHeader from '../wap-sections/wap-header.vue'
import wapHero from '../wap-sections/wap-hero.vue'
import wapCards from '../wap-sections/wap-cards.vue'
import wapSection from '../wap-sections/wap-section.vue'
import wapForm from '../wap-sections/wap-form.vue'
import getCmp from '../../services/wap-cmps.service'
import editorBtnGroup from '../main-editor/editor-items/editor-btn-group.vue'
import mainHeader from '../app-cmps/main-header.vue'
import editorHeader from '../main-editor/editor-header.vue'
import editorSidebar from '../main-editor/editor-sidebar.vue'
export default {
  data() {
    return {
      header: getCmp('wap-header', 1),
      hero: getCmp('wap-hero', 1),
      cards: getCmp('wap-cards', 1),
      section: getCmp('wap-section', 1),
      form: getCmp('wap-form', 1),
    }
  },
  components: {
    wapHeader,
    wapHero,
    wapCards,
    wapSection,
    wapForm,
    editorBtnGroup,
    mainHeader,
    editorHeader,
    editorSidebar,
  },
}
</script>

<style lang="scss" scoped></style>
