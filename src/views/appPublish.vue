<template>
    <div class="wap" :style="{ fontFamily: 'SpaceGrotesk' }">
        <component v-if="wap" v-for="cmp in wap.cmps"
            :is="cmp.type"
            :cmpId="cmp.id"
            :typeId="cmp.typeId"
            :info="cmp.info"
            :options="cmp.options"
            :cmps="cmp.cmps"
        />
    </div>
</template>
  
<script>
import wapHeader from '../cmps/wap-sections/wap-header.vue'
//   import wapHero from '../wap-sections/wap-hero.vue'
//   import wapCards from '../wap-sections/wap-cards.vue'
//   import wapSection from '../wap-sections/wap-section.vue'
//   import wapForm from '../wap-sections/wap-form.vue'
//   import getCmp from '../../services/wap-cmps.service'
//   import editorBtnGroup from '../main-editor/editor-items/editor-btn-group.vue'
//   import mainHeader from '../app-cmps/main-header.vue'
//   import editorHeader from '../main-editor/editor-header.vue'
//   import editorSidebar from '../main-editor/editor-sidebar.vue'


export default {
    data() {
        return {
            wap: null
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
        async getWap(wapName) {
            this.wap = await this.$store.dispatch({ type: 'getWapByName', wapName })
        }
    },
    components: {
        wapHeader,
        //   wapHero,
        //   wapCards,
        //   wapSection,
        //   wapForm,
        //   editorBtnGroup,
        //   mainHeader,
        //   editorHeader,
        //   editorSidebar,
    },
    created() {
        const wapName = this.$route.params.name
        if (wapName) {
            this.getWap(wapName)
        }
    },
}
</script>
  
<style lang="scss" scoped>

</style>