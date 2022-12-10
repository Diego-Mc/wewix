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
          @setVal="doHistory"
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
          :info="{ key: 'back', type: 'click' }"
          @setVal="backToGallery"
          gap="4px"
          :style="{ paddingInline: '14px' }"
          :opts="[{ val: 'back', icon: 'arrow-left' }]" />
      </section>
    </div>

    <div class="publish-btns">
      <!-- <url-bar/> -->
      <section class="url-bar">
        <p class="address">
          <span>https://</span><span class="mb-hide">wewix.onrender.com/</span
          ><span class="mb-show">... /</span
          ><span
            class="site-name"
            :style="{ color: isValidWapName ? 'green' : 'red' }"
            @input="onInput($event)"
            :contenteditable="true"
            >{{ updatedWapName }}</span
          >
        </p>
      </section>
      <div class="publish-links">
        <a @click="preview" class="preview-btn">PREVIEW</a>
        <a @click="publish" class="publish-btn">PUBLISH</a>
      </div>

      <el-dropdown
        class="publish-links mobile"
        split-button
        type="primary"
        @click="preview">
        Preview
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="publish">Publish</el-dropdown-item>
            <el-dropdown-item @click="preview">Preview</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </nav>
</template>

<script>
import editorBtnGroup from '../main-editor/editor-items/editor-btn-group.vue'
import { wapService } from '../../services/wap.service'
import { utilService } from '../../services/util.service'
import urlBar from './url-bar.vue'
import { ElMessage } from 'element-plus'
import { eventBus } from '../../services/event-bus.service'

export default {
  props: {
    wapName: String,
    isPublished: Boolean,
    wapId: String,
  },
  data() {
    return {
      media: '',
      updatedWapName: this.wapName || '',
      isValidWapName: this.isPublished? true : false ,
      checkingSiteName: false,
    }
  },
  methods: {
    doHistory({ val: historyType }) {
      eventBus.emit(historyType)
    },
    handleBtnSelect({ key, val }) {
      console.log({ key, val })
      this[key] = val
    },
    handleMediaSelect({ key, val }) {
      this.handleBtnSelect({ key, val })
      this.$emit('setMedia', val)
    },
    onInput(ev) {
      this.checkingSiteName = true
      this.setUpdatedWapName(ev)
    },
    async setUpdatedWapName(ev) {
      this.updatedWapName = ev.target.innerText
      const isValid = await this.isValidName(this.updatedWapName)
      this.checkingSiteName = false

      ///if (isValid.state)
      this.updateInlineNameStyle(isValid.state)

      if (isValid.state) {
        ElMessage({
          message: isValid.msg,
          type: 'success',
        })
        this.$emit('setName', this.updatedWapName)
      } else {
        ElMessage({
          message: isValid.msg,
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
      this.$emit('foundSiteName')
      console.log('ha')
      const regex = /^[A-Za-z0-9]*$/
      console.log(regex.test(wapName))
      if (!isExist && regex.test(wapName) && wapName.length > 3) {
        this.isValidWapName = true
        return { state: true, msg: 'Site name is valid' }
        // TODO : BUILD MODAL, SAVE WAP WITH USER DATA, SWITCH isOnline = true
      } else if (isExist) {
        return { state: false, msg: 'Site name already in use' }
        //Todo add user msg
      } else {
        return {
          state: false,
          msg: 'Site name use invalid Characters (use only charachtors and numbers)',
        }
      }
    },
    preview() {
      this.$router.push({
        path: `/${this.wapId}`,
        query: { preview: 'true' },
      })
    },

    async publish() {
      if (this.checkingSiteName) {
        ElMessage({
          message: 'Validating site name...',
          type: 'error',
        })
        return
      } else if (
        this.updatedWapName.length <= 3 ||
        this.updatedWapName === 'site-name' ||
        this.updatedWapName === 'user' ||
        !this.isValidWapName
      ) {
        ElMessage({
          message: 'Cannot Publish Site With Invalid Name',
          type: 'error',
        })
        return
      }
      this.$emit('publishWap', this.updatedWapName)
    },
    backToGallery() {
      //TODO: add modal to ask use if he's sure
      this.$router.push('/templates')
    },
  },
  components: {
    editorBtnGroup,
    urlBar,
  },
  created() {
    this.setUpdatedWapName = utilService.debounce(this.setUpdatedWapName, 1000)
  },
}
</script>

<style lang="scss" scoped></style>
