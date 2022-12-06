<template>
  <nav class="editor-header">
    <div class="options">
      <section class="work-together">
        <editor-btn-group
          @setVal="(data) => $emit('setVal', data)"
          :info="{ key: 'workTogether', type: 'click' }"
          :style="{ paddingInline: '14px', marginLeft: '4px' }"
          :opts="[
            {
              val: 'workTogether',
              icon: 'people',
              title: { text: 'Work together', placement: 'bottom' },
            },
          ]" />
      </section>
      <section class="history-options">
        <editor-btn-group
          gap="4px"
          :style="{ paddingInline: '14px' }"
          :info="{ key: 'history', type: 'click' }"
          :opts="[
            {
              val: 'undo',
              icon: 'arrow-return-left',
              title: { text: 'Undo', placement: 'bottom' },
            },
            {
              val: 'redo',
              icon: 'arrow-return-right',
              title: { text: 'Redo', placement: 'bottom' },
            },
          ]" />
      </section>

      <section class="media-select">
        <editor-btn-group
          :info="{ key: 'media', type: 'radioDefault' }"
          @setVal="handleMediaSelect"
          gap="4px"
          :style="{ paddingInline: '14px' }"
          initialValue="desktop"
          :opts="[
            {
              val: 'desktop',
              icon: 'display',
              title: { text: 'Desktop', placement: 'bottom' },
            },
            {
              val: 'tablet',
              icon: 'tablet',
              title: { text: 'Tablet', placement: 'bottom' },
            },
            {
              val: 'phone',
              icon: 'phone',
              title: { text: 'Mobile', placement: 'bottom' },
            },
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
    </div>

    <div class="publish-btns">
      <section class="url-bar">
        <p class="address">
          https://<span class="mb-hide">wewix.onrender.com/</span
          ><span class="mb-show">... /</span
          ><span
            class="site-name"
            :style="{color: siteNameColor}"
            @input="setUpdatedWapName($event)"
            :contenteditable="!isOnline"
            >{{ updatedWapName }}</span
          >
        </p>
      </section>
      <a @click="preview" class="preview-btn">preview site</a>
      <a @click="validate" class="publish-btn">publish site</a>
    </div>
    <!-- <section class="upload-site">
      <editor-btn-group
        :info="{ key: 'publishSite' }"
        @setVal="handleBtnSelect"
        :style="{ gap: '10px' }"
        :opts="[{ val: true, icon: 'cast', text: 'Publish' }]" />
    </section> -->
  </nav>
</template>

<script>
import editorBtnGroup from '../main-editor/editor-items/editor-btn-group.vue'
import { wapService } from '../../services/wap.service'

export default {
  props: {
    wapName: String,
  },
  data() {
    return {
      media: '',
      updatedWapName: this.wapName || 'mySite',
      isValidName: true
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
    setUpdatedWapName(ev) {
      this.updatedWapName = ev.target.innerText
      if (true) { //TODO Replace WITH isValid
          this.$emit('setName', this.updatedWapName)
      }
    },
    validate() {
      if (this.isValidName) {
        // TODO : BUILD MODAL, SAVE WAP WITH USER DATA, SWITCH isOnline = true
      }
      else {
        console.log('Not A Valid Site')
        //Todo add user msg
      }
    },
    preview() {
      this.$router.push({ path: `/${this.updatedWapName}`, query: { preview: 'true' }})
    }
  },
  computed: {
    async isValidUpdatedWapName() {
        //TODO: cannot be 'signup', 'login', '', 'templates', 'edit', 'dashboard', 'preview', 
        try {
          const isUnique = await this.$store.dispatch({ type: 'getWapByName', wapName: this.updatedWapName })
          return isUnique
        } catch (err) {
          this.siteNameColor = '#e35a5a'
          console.log('err:', err)
          return false
        }  
    }, 
  },
  components: {
    editorBtnGroup,
  },
}
</script>

<style lang="scss" scoped></style>
