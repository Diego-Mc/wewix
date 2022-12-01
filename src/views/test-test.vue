<template>
  <!-- <div :style="{ fontFamily: 'SpaceGrotesk' }">
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
  </div> -->
  <header class="main-header">
    <div class="main-logo">
      <img src="#" />
      <h1>wewix</h1>
    </div>
    <div class="auth-info">Diego Mc</div>
  </header>

  <section class="main-editor">
    <i class="fa-solid fa-mobile-screen-button"></i>
    <nav class="editor-options">
      <section class="media-select">
        <editor-btn-group
          info="media"
          :opts="[
            { val: 'desktop', icon: 'desktop' },
            { val: 'tablet', icon: 'tablet-screen-button' },
            { val: 'mobile', icon: 'mobile-screen-button' },
          ]" />
      </section>
      <div class="url-bar">
        <p class="address">
          https://wewix.onrender.com/<span class="site-name" contenteditable
            >my-site</span
          >
        </p>
        <router-link to="#" class="preview-btn">preview site</router-link>
      </div>
      <section class="history-options">
        <i class="undo-btn bi bi-arrow-counterclockwise"></i>
        <i class="redo-btn bi bi-arrow-clockwise"></i>
      </section>
      <section class="work-together">
        <i class="work-together-btn bi bi-people"></i>
      </section>
      <section class="upload-site">
        <i class="upload-site-btn bi bi-cast"></i>
      </section>
    </nav>
  </section>
</template>

<script>
import wapHeader from '../cmps/wap-sections/wap-header.vue'
import wapHero from '../cmps/wap-sections/wap-hero.vue'
import wapCards from '../cmps/wap-sections/wap-cards.vue'
import wapSection from '../cmps/wap-sections/wap-section.vue'
import wapForm from '../cmps/wap-sections/wap-form.vue'
import getCmp from '../services/wap-cmps.service'
import editorBtnGroup from '../cmps/app-cmps/editor-btn-group.vue'
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
  },
}
</script>

<options lang="scss" scoped></options>
