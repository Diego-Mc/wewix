<template>
  <section v-if="editOptions">
    <section class="style-editor">
      <div v-if="isOptionsContain('fontFamily')">
        <edit-font-section @select="updateOptionsStyle" />
        <!-- <select
          @change="updateOptions"
          v-model="updatedOptions.style.fontFamily">
          <option>arial</option>
          <option>Gill Sans</option>
          <option>Calibri</option>
        </select> -->
      </div>

      <div v-if="isOptionsContain('backgroundColor')">
        <edit-bg-color-section @select="updateOptionsStyle" />
        <!-- <input
          @input="updateOptions"
          v-model="updatedOptions.style.backgroundColor"
          type="color" /> -->
      </div>

      <div v-if="isOptionsContain('color')">
        <edit-color-section @select="updateOptionsStyle" />
        <!-- <input
          @input="updateOptions"
          v-model="updatedOptions.style.color"
          type="color" /> -->
      </div>

      <div v-if="isOptionsContain('fontWeight')">
        <edit-font-weight-section @select="updateOptionsStyle" />

        <!-- <select
          @change="updateOptions"
          v-model="updatedOptions.style.fontWeight">
          <option>lighter</option>
          <option>normal</option>
          <option>bold</option>
          <option>bolder</option>
        </select> -->
      </div>

      <div v-if="isOptionsContain('borderRadius')">
        <edit-radius-section @select="updateBorderRadius" />

        <!-- <input
          @input="updateBorderRadius"
          type="range"
          v-model="tempBorderRadius"
          min="0.1"
          max="2"
          step="0.1" /> -->
      </div>

      <!-- TODO: add style to fontSize -->
      <div v-if="isOptionsContain('fontSize')">
        font size
        <select @change="updateOptions" v-model="updatedOptions.style.fontSize">
          <option>small</option>
          <option>medium</option>
          <option>large</option>
          <option>x-large</option>
        </select>
      </div>
    </section>

    <section class="content-editor">
      <div v-if="isOptionsContain('src')">
        <edit-upload-section />

        <input
          @input="updateOptions"
          v-model="updatedOptions.meta.src"
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

      <div v-if="updatedOptions.meta.mapData">
        Map Data

        <input @input="handleMapInput($event)" type="text" />
        <div v-if="isMapLocationLoader">
          <span v-if="loadedMapLocation">
            {{ loadedMapLocation.title }}
          </span>
          <span v-else> Loading </span>
        </div>
      </div>

      <div v-if="isOptionsContain('formInputs')">
        enter name of fields
        <div v-for="(field, idx) in updatedOptions.meta.formInputs">
          <div>
            <input
              @input="fieldChanged(id, idx, $event)"
              :value="field.tag"
              type="text" />
            <button @click="fieldRemoved(id, idx)">X</button>
          </div>
        </div>
        <button @click="fieldAdded(id)" style="width: 100%; background: green">
          add field
        </button>
        <!-- <input
          @input="updateOptions"
          v-model="updatedOptions.meta.link"
          type="text"
          placeholder="link" /> -->
      </div>

      <div>
        <button @click.stop="onRemoveCmp">Delete</button>
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
import editColorSection from '../cmp-edit-sections/edit-color-section.vue'
import editBgColorSection from '../cmp-edit-sections/edit-bg-color-section.vue'
import editRadiusSection from '../cmp-edit-sections/edit-radius-section.vue'
import editUploadSection from '../cmp-edit-sections/edit-upload-section.vue'

import mapEdit from '../../app-cmps/map-edit.vue'
export default {
  props: {
    id: String,
    childCmpId: String,
    editOptions: Object,
    elType: String,
  },
  data() {
    return {
      updatedOptions: JSON.parse(JSON.stringify(this.editOptions)),
      tempBorderRadius: parseInt(this.editOptions.style?.borderRadius),

      loadedMapLocation: null,
      isMapLocationLoader: false,
    }
  },
  methods: {
    fieldChanged(id, idx, e) {
      eventBus.emit('updateField', { id, idx, txt: e.target.value })
    },
    fieldRemoved(id, idx) {
      this.updatedOptions.meta.formInputs.splice(idx, 1)
      eventBus.emit('updateField', { id, idx })
    },
    fieldAdded(id) {
      this.updatedOptions.meta.formInputs.push({ tag: 'wa', txt: '' })
      eventBus.emit('updateField',{id})
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

    //TODO CHANGE NAME
    updateOptions() {
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

    updateBorderRadius(key, val) {
      this.tempBorderRadius = val
      const borderRadius = this.tempBorderRadius + 'em'
      this.editOptions.style.borderRadius = borderRadius
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
  },
  watch: {
    editOptions() {
      this.updatedOptions = JSON.parse(JSON.stringify(this.editOptions))
    },
    id() {
      this.tempBorderRadius = parseInt(this.editOptions.style?.borderRadius)
    },
  },

  created() {
    this.getMapData = utilService.debounce(this.getMapData, 1500)
  },

  components: {
    mapEdit,
    editFontSection,
    editFontWeightSection,
    editColorSection,
    editBgColorSection,
    editRadiusSection,
    editUploadSection,
  },
}
</script>
