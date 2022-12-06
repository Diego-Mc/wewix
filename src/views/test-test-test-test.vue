<template>
  <div class="wap" :style="{ fontFamily: 'SpaceGrotesk' }">
    <button
      @click="changeTheme('theme-1')"
      :style="{
        padding: '20px',
        backgroundColor: 'green',
        color: 'white',
      }">
      Theme 1
    </button>
    <button
      @click="changeTheme('theme-2')"
      :style="{
        padding: '20px',
        backgroundColor: 'blue',
        color: 'white',
      }">
      Theme 2
    </button>
    <component
      v-for="section in sections"
      :is="section.type"
      :cmpId="section.id"
      :typeId="section.typeId"
      :info="section.info"
      :options="section.options"
      :cmps="section.cmps" />
    <!-- <wap-header
      :cmpId="header.id"
      :typeId="header.typeId"
      :info="header.info"
      :options="header.options" />
    <h1>Hero {{ hero.typeId }}</h1>
    <p v-for="cmp in hero.cmps">children: {{ cmp.type + cmp.typeId }}</p>
    <wap-hero
      :cmpId="hero.id"
      :typeId="hero.typeId"
      :info="hero.info"
      :options="hero.options"
      :cmps="hero.cmps" />
    <h1>Section {{ section.typeId }}</h1>
    <p v-for="cmp in section.cmps">children: {{ cmp.type + cmp.typeId }}</p>
    <wap-section
      :cmpId="section.id"
      :typeId="section.typeId"
      :info="section.info"
      :options="section.options"
      :cmps="section.cmps" />
    <h1>Section {{ section2.typeId }}</h1>
    <p v-for="cmp in section2.cmps">children: {{ cmp.type + cmp.typeId }}</p>
    <wap-section
      :cmpId="section2.id"
      :typeId="section2.typeId"
      :info="section2.info"
      :options="section2.options"
      :cmps="section2.cmps" />
    <h1>Cards {{ cards.typeId }}</h1>
    <p v-for="cmp in cards.cmps">children: {{ cmp.type + cmp.typeId }}</p>
    <wap-cards
      :cmpId="cards.id"
      :typeId="cards.typeId"
      :info="cards.info"
      :options="cards.options"
      :cmps="cards.cmps" />
    <h1>Section {{ section3.typeId }}</h1>
    <p v-for="cmp in section3.cmps">children: {{ cmp.type + cmp.typeId }}</p>
    <wap-section
      :cmpId="section3.id"
      :typeId="section3.typeId"
      :info="section3.info"
      :options="section3.options"
      :cmps="section3.cmps" />
    <h1>Form {{ form.typeId }}</h1>
    <p v-for="cmp in form.cmps">children: {{ cmp.type + cmp.typeId }}</p>
    <wap-form :cmpId="form.id" :info="form.info" :options="form.options" />
  </div> -->
  </div>
</template>

<script>
import wapHeader from '../cmps/wap-sections/wap-header.vue'
import wapHero from '../cmps/wap-sections/wap-hero.vue'
import wapCards from '../cmps/wap-sections/wap-cards.vue'
import wapSection from '../cmps/wap-sections/wap-section.vue'
import wapForm from '../cmps/wap-sections/wap-form.vue'
import getCmp from '../services/wap-cmps.service'
import editorBtnGroup from '../cmps/main-editor/editor-items/editor-btn-group.vue'
import mainHeader from '../cmps/app-cmps/main-header.vue'
import editorHeader from '../cmps/main-editor/editor-header.vue'
import editorSidebar from '../cmps/main-editor/editor-sidebar.vue'
export default {
  data() {
    return {
      sections: [
        getCmp('wap-header', 2),
        getCmp('wap-hero', 2),
        getCmp('wap-cards', 2),
        getCmp('wap-section', 2),
        getCmp('wap-section', 3),
        getCmp('wap-section', 4),
        // getCmp('wap-form', 1),

        getCmp('wap-header', 3),
        getCmp('wap-hero', 3),
        getCmp('wap-cards', 3),
        getCmp('wap-section', 5),
        getCmp('wap-cards', 4),
        getCmp('wap-section', 6),
        getCmp('wap-cards', 5),
        getCmp('wap-section', 7),
        // getCmp('wap-section', 6),
        // getCmp('wap-section', 7),
        // getCmp('wap-form', 2),
      ],
      // header: getCmp('wap-header', 2),
      // hero: getCmp('wap-hero', 2),
      // cards: getCmp('wap-cards', 2),
      // section: getCmp('wap-section', 2),
      // section2: getCmp('wap-section', 3),
      // section3: getCmp('wap-section', 4),
      // form: getCmp('wap-form', 1),
    }
  },
  methods: {
    changeTheme(className) {
      document.querySelector('#app').className = className
    },
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
