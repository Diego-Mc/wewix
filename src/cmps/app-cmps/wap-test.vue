<template>
  <div class="wap" :style="{ fontFamily: 'SpaceGrotesk' }">
    <wap-header
      :cmpId="header.id"
      :typeId="header.typeId"
      :info="header.info"
      :options="header.options" />
    <wap-hero
      :cmpId="hero.id"
      :typeId="hero.typeId"
      :info="hero.info"
      :options="hero.options"
      :cmps="hero.cmps" />
    <wap-section
      :cmpId="section.id"
      :typeId="section.typeId"
      :info="section.info"
      :options="section.options"
      :cmps="section.cmps" />
    <wap-section
      :cmpId="section2.id"
      :typeId="section2.typeId"
      :info="section2.info"
      :options="section2.options"
      :cmps="section2.cmps" />
    <wap-cards
      :cmpId="cards.id"
      :typeId="cards.typeId"
      :info="cards.info"
      :options="cards.options"
      :cmps="cards.cmps" />
    <wap-section
      :cmpId="section3.id"
      :typeId="section3.typeId"
      :info="section3.info"
      :options="section3.options"
      :cmps="section3.cmps" />
    <!-- <wap-form :cmpId="form.id" :info="form.info" :options="form.options" /> -->
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
      header: getCmp('wap-header', 2),
      hero: getCmp('wap-hero', 2),
      cards: getCmp('wap-cards', 2),
      section: getCmp('wap-section', 2),
      section2: getCmp('wap-section', 3),
      section3: getCmp('wap-section', 4),
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
