<template>
  <section v-if="editOptions">
    <section class="style-editor">
      <section class="cmp-edit-section" v-if="elType?.slice(0, 3) === 'nav'">
        <h6 class="edit-type-label">
          QUICK LINKS&nbsp;
          <el-tooltip
            class="box-item"
            effect="light"
            content="Select the part you want to quick-link to"
            placement="right">
            <i class="bi bi-question-circle"></i>
          </el-tooltip>
        </h6>
        <div class="preview-quick-links-container">
          <!-- <h1>{{ cmp.type.replace('wap-', '').toUpperCase() }}</h1> -->
          <div
            class="img-container"
            v-for="cmp in currWap?.cmps"
            :class="{ selected: cmp.id === updatedOptions.meta.scrollTo }"
            @click="updateOptionsMeta({ key: 'scrollTo', val: cmp.id })">
            <img :src="cmp.previewImg" class="preview-nav-quick-link" />
            <i class="bi bi-link-45deg link-icon"></i>
          </div>
        </div>
      </section>

      <div v-if="isOptionsContain('fontFamily')">
        <edit-font-section @select="updateOptionsStyle" :elStyle="fontFamily" />
      </div>

      <div v-if="isOptionsContain('backgroundColor')">
        <edit-bg-color-section @select="updateOptionsStyle" />
      </div>

      <div v-if="isOptionsContain('color')">
        <edit-color-section @select="updateOptionsStyle" />
      </div>
      <div v-if="isOptionsContain('fontWeight')">
        <edit-font-weight-section
          @select="updateOptionsStyle"
          :elStyle="fontWeight" />
      </div>

      <div v-if="isOptionsContain('borderRadius')">
        <edit-radius-section
          @select="updateStyleValToEm"
          :borderRadius="parseFloat(editOptions.style.borderRadius)"
          :elStyle="borderRadius" />
      </div>

      <!-- TODO: add style to fontSize -->
      <div v-if="isOptionsContain('fontSize')">
        <edit-font-size-section
          @select="updateStyleValToEm"
          :fontSize="fontSize" />
      </div>
    </section>

    <section class="content-editor">
      <div v-if="isOptionsContain('src')">
        <!-- Link
        <input @input="updateOptions" v-model="updatedOptions.meta.src" type="text" placeholder="link" /> -->
        <edit-upload-section @select="updateOptionsMeta" />
      </div>

      <div v-if="isOptionsContain('backgroundImage')">
        <edit-upload-section @select="updateOptionsStyle" />
      </div>

      <div v-if="isOptionsContain('link')">
        <h6 class="edit-type-label">YouTube Link</h6>
        <!-- need to add regex -->
        <input
          @input="updateOptions"
          v-model="updatedOptions.meta.link"
          type="text"
          placeholder="link" />
      </div>

      <div v-if="isOptionsContain('href')">
        <!-- Link
        <input @input="updateOptions" v-model="updatedOptions.meta.src" type="text" placeholder="link" /> -->
        <h6 class="edit-type-label">ADD A LINK</h6>
        <input
          @input="updateOptions"
          v-model="updatedOptions.meta.href"
          type="text"
          placeholder="href" />
      </div>

      <edit-map-section
        v-if="isOptionsContain('mapData')"
        @select="updateOptionsMeta" />

      <div v-if="isOptionsContain('formInputs')">
        <h6 class="edit-type-label">Form Fields</h6>

        <div
          v-for="(field, idx) in updatedOptions.meta.formInputs"
          class="form-inputs-container">
          <div style="display: flex">
            <input
              class="editor-form-input"
              @input="fieldChanged(id, idx, $event)"
              :value="field.tag"
              type="text" />
            <button style="color: red" @click="fieldRemoved(id, idx)">X</button>
          </div>
        </div>

        <el-button
          type="primary"
          @click="fieldAdded(id)"
          style="width: 100%; margin-bottom: 10px">
          Add field to form
        </el-button>
      </div>

      <!-- //TODO: continue working? -->
    </section>
  </section>
</template>

<script>
import { cmpEditorService } from '../../../services/cmp-editor.service'
import { eventBus } from '../../../services/event-bus.service'
import { utilService } from '../../../services/util.service'
import { ElMessage } from 'element-plus'

import editFontSection from '../cmp-edit-sections/edit-font-section.vue'
import editFontWeightSection from '../cmp-edit-sections/edit-font-weight-section.vue'
import editFontSizeSection from '../cmp-edit-sections/edit-font-size-section.vue'
import editColorSection from '../cmp-edit-sections/edit-color-section.vue'
import editBgColorSection from '../cmp-edit-sections/edit-bg-color-section.vue'
import editRadiusSection from '../cmp-edit-sections/edit-radius-section.vue'
import editUploadSection from '../cmp-edit-sections/edit-upload-section.vue'
import editAnimationSection from '../cmp-edit-sections/edit-animation-section.vue'
import editMapSection from '../cmp-edit-sections/edit-map-section.vue'

export default {
  props: {
    id: String,
    childCmpId: String,
    editOptions: Object,
    elType: String,
    elDom: Object,
  },
  data() {
    return {
      updatedOptions: JSON.parse(JSON.stringify(this.editOptions)),
      fontFamily: null,
      fontWeight: null,
      fontSize: null,
      borderRadius: null,
    }
  },
  created() {
    eventBus.on('onRemoveCmp', () => {
      if (this.id) {
        console.log('this.id:', this.id)
        this.onRemoveCmp()
        eventBus.emit('resetSelectedCmp')
        ElMessage({
          message: 'The selected element has been successfully deleted',
          type: 'success',
        })
      } else {
        ElMessage({
          message:
            'Deletion has failed. There are no selected element to delete',
          type: 'error',
        })
      }
    })
  },

  methods: {
    fieldChanged(id, idx, e) {
      this.updatedOptions.meta.formInputs[idx].tag = e.target.value
      eventBus.emit('updateField', {
        id,
        idx,
        txt: e.target.value,
        childCmpId: this.childCmpId,
      })
    },
    fieldRemoved(id, idx) {
      this.updatedOptions.meta.formInputs.splice(idx, 1)
      eventBus.emit('updateField', { id, idx, childCmpId: this.childCmpId })
    },
    fieldAdded(id) {
      this.updatedOptions.meta.formInputs.push({ tag: '', txt: '' })
      eventBus.emit('updateField', { id, childCmpId: this.childCmpId })
    },
    onRemoveCmp() {
      eventBus.emit('removeCmp', {
        id: this.id,
        childCmpId: this.childCmpId,
        elType: this.elType,
      })
    },
    isOptionsContain(type) {
      const options = [
        ...Object.keys(this.editOptions.style),
        ...Object.keys(this.editOptions.meta),
      ]
      return options.includes(type)
    },

    updateOptionsStyle({ key, val }) {
      if (key === 'src' && this.isOptionsContain('backgroundImage')) {
        this.updatedOptions.style.backgroundImage = `url(${val})`
      } else {
        this.updatedOptions.style[key] = val
      }
      this.updateOptions()
    },

    updateOptionsMeta({ key, val }) {
      // if(key === 'link'){
      //   val =
      // }
      this.updatedOptions.meta[key] = val
      this.updateOptions()
    },

    //TODO CHANGE NAME
    updateOptions() {
      eventBus.emit('cmpUpdated', {
        cmpId: this.id,
        elType: this.elType,
        updatedStyle: this.updatedOptions,
        childCmpId: this.childCmpId,
      })
    },
    removeCmp() {
      this.$store.dispatch({
        type: 'removeCmp',
        cmpId: this.childCmpId ? this.childCmpId : this.id,
      })
    },

    updateStyleValToEm({ key, val }) {
      const updatedVal = val + 'em'
      this.updatedOptions.style[key] = updatedVal
      this.updateOptions()
    },

    handleMapInput(ev) {
      this.isMapLocationLoader = true
      this.getMapData(ev)
    },

    async getMapData(ev) {
      const locationName = ev.target.value

      try {
        this.loadedMapLocation = await cmpEditorService.getMapData(locationName)

        if (!this.loadedMapLocation) throw new Error("Map Has'nt been loaded")

        // Handle state when getting data
        this.updatedOptions.meta.mapData = this.loadedMapLocation
        this.updateOptions()
      } catch (err) {
        this.closeMapLocationLoader()
        console.log(err)
      }
    },

    closeMapLocationLoader() {
      this.isMapLocationLoader = false
    },

    getElStyle(styleProp) {
      // console.log(styleProp);
      // console.log(window.getComputedStyle(this.elDom));
      if (this.elDom) {
        return window.getComputedStyle(this.elDom).getPropertyValue(styleProp)
      }
    },
  },

  computed: {
    currWap() {
      return this.$store.getters.editedWap
    },
  },

  //TODO: change this awful thing
  watch: {
    editOptions() {
      this.updatedOptions = JSON.parse(JSON.stringify(this.editOptions))
    },
    id: {
      immediate: true,
      handler() {
        this.fontFamily = this.getElStyle('font-family')
        this.fontWeight = this.getElStyle('font-weight')
        this.fontSize = this.getElStyle('font-size')
        this.borderRadius = this.getElStyle('border-radius')
      },
    },
    childCmpId: {
      immediate: true,
      handler() {
        this.fontFamily = this.getElStyle('font-family')
        this.fontWeight = this.getElStyle('font-weight')
        this.fontSize = this.getElStyle('font-size')
        this.borderRadius = this.getElStyle('border-radius')

        // this.fontWeight =
      },
    },
    elType: {
      immediate: true,
      handler() {
        this.fontFamily = this.getElStyle('font-family')
        this.fontWeight = this.getElStyle('font-weight')
        this.fontSize = this.getElStyle('font-size')
        this.borderRadius = this.getElStyle('border-radius')
      },
    },
  },

  components: {
    editFontSection,
    editFontWeightSection,
    editColorSection,
    editBgColorSection,
    editRadiusSection,
    editUploadSection,
    editFontSizeSection,
    editAnimationSection,
    editMapSection,
  },

  unmounted() {
    eventBus.off('onRemoveCmp')
  },
}
</script>

<style>
.form-inputs-container > * {
  margin-bottom: 14px;
  display: flex;
}
.editor-form-input {
  /* border: 1px solid rgb(177, 177, 177) !important; */
  flex: 1;
  padding: 10px 10px !important;
  border-radius: 8px;
  outline: 1px solid #ccc;
  border: none;
}
.editor-form-input:active {
  outline: 2px solid #00c2a6 !important;
}
.editor-form-input:focus-visible {
  outline: 2px solid #00c2a6 !important;
}
</style>
