<template>
  <section v-if="editOptions">
    <section class="style-editor">

      <div v-if="isOptionsContain('fontFamily')">
        <edit-font-section @select="updateOptionsStyle" />
      </div>

      <div v-if="isOptionsContain('backgroundColor')">
        <edit-bg-color-section @select="updateOptionsStyle" />
      </div>

      <div v-if="isOptionsContain('color')">
        <edit-color-section @select="updateOptionsStyle" />
      </div>

      <div v-if="isOptionsContain('fontWeight')">
        <edit-font-weight-section @select="updateOptionsStyle" />
      </div>

      <div v-if="isOptionsContain('borderRadius')">
        <edit-radius-section
          @select="updateStyleValToEm"
          :borderRadius="parseFloat(editOptions.style.borderRadius)" />
      </div>

      <!-- TODO: add style to fontSize -->
      <div v-if="isOptionsContain('fontSize')">
        <edit-font-size-section
          @select="updateStyleValToEm"
          :fontSize="parseFloat(editOptions.style.fontSize)" />
      </div>
    </section>

    <section class="content-editor">
      <div v-if="isOptionsContain('src')">
        <edit-upload-section @select="updateOptionsMeta" />

        <input v-if="!isOptionsContain('backgroundImage')"
          @input="updateOptions"
          v-model="updatedOptions.meta.src"
          type="text"
          placeholder="src" />
      </div>
      
      <div v-if="isOptionsContain('backgroundImage')">
        <edit-upload-section @select="updateOptionsMeta" />

        <input 
          @input="updateOptions"
          v-model="updatedOptions.style.backgroundImage"
          type="text"
          placeholder="src" />
      </div>

      <div v-if="isOptionsContain('link')">
        Link
        <input
          @input="updateOptions"
          v-model="updatedOptions.meta.link"
          type="text"
          placeholder="link" />
      </div>

      <edit-map-section v-if="isOptionsContain('mapData')" @select="updateOptionsMeta"/>
      <!-- <div v-if="isOptionsContain('mapData')">
        Map Data
        <input @input="handleMapInput($event)" type="text" />
        <div v-if="isMapLocationLoader">
          <span v-if="loadedMapLocation">
            {{ loadedMapLocation.title }}
          </span>
          <span v-else> Loading </span>
        </div>
      </div> -->

      <div v-if="isOptionsContain('animation')">
        <edit-animation-section
          @select="updateOptionsMeta"
          :animation="editOptions.meta.animation" />
      </div>

      <div v-if="isOptionsContain('formInputs')">
        <h6 class="edit-type-label">Form Fields</h6>

        <div v-for="(field, idx) in updatedOptions.meta.formInputs">
          <div>
            <input
              @input="fieldChanged(id, idx, $event)"
              :value="field.tag"
              type="text" />
            <button @click="fieldRemoved(id, idx)">X</button>
          </div>
        </div>
        <el-button type="primary" @click="fieldAdded(id)" style="width: 100%; background: green; margin-bottom: 10px">
          add field
        </el-button>
      </div>

      <div>
        <el-button type="danger" @click.stop="onRemoveCmp">Remove</el-button>
      </div>
    </section>
  </section>
</template>

<script>
import { cmpEditorService } from '../../../services/cmp-editor.service'
import { eventBus } from '../../../services/event-bus.service'
import { utilService } from '../../../services/util.service'

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

      loadedMapLocation: null,
      isMapLocationLoader: false,
    }
  },

  methods: {
    fieldChanged(id, idx, e) {
      eventBus.emit('updateField', {
        id,
        idx,
        txt: e.target.value,
        childCmpId: this.childCmpId,
      })
    },
    fieldRemoved(id, idx) {
      this.updatedOptions.meta.formInputs.splice(idx, 1)
      eventBus.emit('updateField', { id, idx })
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
      this.updatedOptions.style[key] = val
      this.updateOptions()
    },

    updateOptionsMeta({ key, val }) {
      if (key === 'src' && this.isOptionsContain('backgroundImage')) {
        this.updatedOptions.style.backgroundImage = val
      } else {
        this.updatedOptions.meta[key] = val
      }

      
      this.updateOptions()
    },

    //TODO CHANGE NAME
    updateOptions() {
      if(this.updatedOptions.style.backgroundImage) this.updatedOptions.style.backgroundImage = `url(${this.updatedOptions.style.backgroundImage})`
      
      eventBus.emit('cmpUpdated', {
        cmpId: this.id,
        elType: this.elType,
        updatedStyle: this.updatedOptions,
        childCmpId: this.childCmpId,
      })
    },

    updateContent() {
      this.$emit('cmpUpdated', {
        cmpId: id,
        elType,
        content: info.text.content,
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
    log() {
      window.getComputedStyle(this.elDom)
      this.elDom.style.height = Math.floor(Math.random() * 100) + 'px'
    },
  },
  watch: {
    editOptions() {
      this.updatedOptions = JSON.parse(JSON.stringify(this.editOptions))
    },
  },

  created() {
    this.getMapData = utilService.debounce(this.getMapData, 1500)
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
    editMapSection
  },
}
</script>
