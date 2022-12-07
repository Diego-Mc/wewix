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
            :style="{ color: isValidWapName ? 'green' : 'red' }"
            @input="setUpdatedWapName($event)"
            :contenteditable="!isPublished"
            >{{ updatedWapName }}</span
          >
        </p>
      </section>
      <a @click="preview" class="preview-btn">preview</a>
      <a @click="publish" class="publish-btn">publish</a>
    </div>
  </nav>
</template>

<script>
import editorBtnGroup from '../main-editor/editor-items/editor-btn-group.vue'
import { wapService } from '../../services/wap.service'
import { utilService } from '../../services/util.service'

export default {
  props: {
    wapName: String,
    isPublished: Boolean,
  },
  data() {
    return {
      media: '',
      updatedWapName: this.wapName || ' a',
      isValidWapName: true,
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
    async setUpdatedWapName(ev) {
      this.updatedWapName = ev.target.innerText
      const isValid = await this.isValidName(this.updatedWapName)

      ///if (isValid.state)
      this.updateInlineNameStyle(isValid.state)
      
      if (isValid.state) {
        this.$notify({
          title: isValid.msg,
          type: 'success',
        })
        this.$emit('setName', this.updatedWapName)
      } else {
        this.$notify({
          title: isValid.msg,
          type: 'error',
        })
      }
    },
    updateInlineNameStyle(state) {
      this.isValidWapName = state
    },
    async isValidName(wapName) {
      const isExist = await this.$store.dispatch({
        type: 'getWapByName',
        wapName,
      })
      const regex = /^[A-Za-z0-9]*$/

      if (!isExist && regex.test(wapName) && wapName.length > 3) {
        return { state: true, msg: 'Site name is valid' }
        // TODO : BUILD MODAL, SAVE WAP WITH USER DATA, SWITCH isOnline = true
      } else if (isExist) {
        return { state: false, msg: 'Site name already in use' }
        //Todo add user msg
      } else {
        return {
          state: false,
          msg: 'Site name use invalid Characters (use only charachtors and numbers',
        }
      }
    },
    preview() {
      this.$router.push({
        path: `/${this.wapName}`,
        query: { preview: 'true' },
      })
    },

    async publish() {
      if(this.updatedWapName.length <= 3)return
      this.$emit('publishWap', this.updatedWapName)
      return
      const { state } = await this.isValidName(this.updatedWapName)
      console.log(this.updatedWapName);
      console.log(state);
      if (!state) {
        this.$notify({
          title: 'Cannot Publish Site With Invalid Name',
          type: 'error',
        })
      } else {
      }
    },
  },
  components: {
    editorBtnGroup,
  },
  created() {
    this.setUpdatedWapName = utilService.debounce(this.setUpdatedWapName, 1000)
  },
}
</script>

<style lang="scss" scoped></style>
