<template>
  <nav class="editor-header">
    <section class="media-select">
      <editor-btn-group
        :info="{ key: 'media' }"
        @setVal="handleMediaSelect"
        gap="4px"
        :style="{ paddingInline: '14px' }"
        initialValue="desktop"
        :opts="[
          { val: 'desktop', icon: 'display' },
          { val: 'tablet', icon: 'tablet' },
          { val: 'phone', icon: 'phone' },
        ]" />
    </section>
    <section class="back-btn">
      <editor-btn-group
        :info="{ key: 'back' }"
        @setVal="handleBtnSelect"
        gap="4px"
        :style="{ paddingInline: '14px' }"
        :opts="[{ val: 'back', icon: 'arrow-left' }]" />
    </section>
    <section class="url-bar" >
      <p class="address">
        https://<span class="mb-hide">wewix.onrender.com/</span
        ><span class="mb-show">... /</span
        ><span class="site-name" 
          :style="{color: isValidSiteName ? '#00c2a6' : '#e35a5a'}" 
          @input="setSiteName($event)" 
          :contenteditable="!wapName">{{getSiteName()}}</span>
      </p>
      <router-link to="#" class="preview-btn">preview site</router-link>
    </section>
    <section class="upload-site"> 
      <editor-btn-group
        :info="{ key: 'publishSite' }"
        @setVal="publishWap"
        
        :style="{ gap: '10px' }"
        :opts="[{ val: true, icon: 'cast', text: 'Publish' }]" />
    </section>
  </nav>
</template>

<script>
import editorBtnGroup from '../main-editor/editor-items/editor-btn-group.vue'
export default {
  props: {
    wapName: String
  },
  data() {
    return {
      media: '',
      publishSiteTxt: '',
      siteName: this.wapName,
      isValidSiteName: true
    }
  },
  methods: {
    handleBtnSelect({ key, val }) {
      console.log({ key, val })
      this[key] = val
    },
    handleMediaSelect({ key, val }) {
      this.handleBtnSelect({ key, val })
      this.$emit('setMedia', val)
    },
    async setSiteName(ev) {
      const regex = /[A-Za-z0-9]{4,}/i
      // Todo User Msg
        try {
          const isExist = await this.$store.dispatch({ type: 'getWapByName', wapName: ev.target.innerText })
          if (isExist) {
            // USER MSG
            this.isValidSiteName = false
            return
          } else if (!regex.test(ev.target.innerText) || ev.target.innerText.includes(' ')) {
            // USER MSG
            this.isValidSiteName = false
            return
          }

          this.isValidSiteName = true
          this.siteName = ev.target.innerText

        } catch(err) {
          console.log(err);
        }
    }, 
    getSiteName() {
        return this.wapName || 'Enter-Your-Website-Name-Here'
    },
    publishWap() {
      // Todo User Msg
      if (!this.isValidSiteName) {
        console.log('Website name has already taken');
        return
      }

      this.$emit('publishWap', this.siteName)
    } 
  },
  components: {
    editorBtnGroup,
  },
}
</script>

<style lang="scss" scoped></style>
