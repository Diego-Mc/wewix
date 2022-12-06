<template>
  <div class="wap" :style="{ fontFamily: 'SpaceGrotesk' }">
    <button
      @click="changeTheme('theme-1')"
      :style="{
        padding: '20px',
        backgroundColor: 'green',
        color: 'white',
        position: 'sticky',
        top: 0,
        'z-index': 5000,
      }">
      מסעדה
    </button>
    <button
      @click="changeTheme('theme-2')"
      :style="{
        padding: '20px',
        backgroundColor: 'blue',
        color: 'white',
        position: 'sticky',
        top: 0,
        'z-index': 5000,
      }">
      מברשת שיניים
    </button>
    <button
      @click="changeTheme('theme-3')"
      :style="{
        padding: '20px',
        backgroundColor: 'black',
        color: 'white',
        position: 'sticky',
        top: 0,
        'z-index': 5000,
      }">
      סוכנות עיצוב
    </button>
    <component
      v-for="section in sections"
      :is="section.type"
      :cmpId="section.id"
      :typeId="section.typeId"
      :info="section.info"
      :options="section.options"
      :cmps="section.cmps" />
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
        // template 3
        getCmp('wap-header', 4),
        getCmp('wap-hero', 4),
        getCmp('wap-section', 9),
        getCmp('wap-section', 10),
        getCmp('wap-cards', 6),
        getCmp('wap-section', 11),
        getCmp('wap-section', 12),
        getCmp('wap-section', 13),
        // getCmp('wap-section', 14),

        // template 2
        getCmp('wap-header', 2),
        getCmp('wap-hero', 2),
        getCmp('wap-cards', 2),
        getCmp('wap-section', 2),
        getCmp('wap-section', 3),
        getCmp('wap-section', 4),
        // getCmp('wap-form', 1),

        // template 1
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
