<template>
  <section v-if="editOptions" class="cmp-editor">
    <imgUploader class="imgUploader"/>
    <section class="style-editor">
      <div v-if="isOptionsContain('fontFamily')">
        Font Picker
        <select @change="updateOptions" v-model="updatedOptions.style.fontFamily">
          <option>arial</option>
          <option>Gill Sans</option>
          <option>Calibri</option>
        </select>
      </div>

      <div v-if="isOptionsContain('backgroundColor')">
        Background Color Picker
        <input @input="updateOptions" v-model="updatedOptions.style.backgroundColor" type="color" />
      </div>

      <div v-if="isOptionsContain('color')">
        Color Picker
        <input @input="updateOptions" v-model="updatedOptions.style.color" type="color" />
      </div>

      <div v-if="isOptionsContain('fontWeight')">
        Font Weight Picker
        <select @change="updateOptions" v-model="updatedOptions.style.fontWeight">
          <option>lighter</option>
          <option>normal</option>
          <option>bold</option>
          <option>bolder</option>
        </select>
      </div>

      <div v-if="isOptionsContain('borderRadius')">
        Border Radius Picker
        <input @input="updateBorderRadius" type="range" v-model="tempBorderRadius" min="0.1" max="2" step="0.1" />
      </div>

      <div v-if="isOptionsContain('fontSize')">
        Font Size Picker
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
        Img Picker
        <input @input="updateOptions" v-model="updatedOptions.meta.src" type="text" placeholder="src" />
      </div>

      <div v-if="isOptionsContain('link')">
        Link
        <input @input="updateOptions" v-model="updatedOptions.meta.link" type="text" placeholder="link" />
      </div>

      <div v-if="updatedOptions.meta.mapData">
        Map Data
        <input @input="handleMapInput($event)" type="text">
        <div v-if="isMapLocationLoader">
            <span v-if="loadedMapLocation">
              {{ loadedMapLocation.title }}
            </span>
            <span v-else>
              Loading
            </span>
        </div>
      </div>


      <div>
        <button @click.stop="removeCmp">Delete</button>
      </div>

    </section>


  </section>
</template>

<script>
import { cmpEditorService } from '../../services/cmp-editor.service'
import { eventBus } from '../../services/event-bus.service'
import { utilService } from '../../services/util.service'

import imgUploader from './img-uploader.vue'
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
      isMapLocationLoader: false
    }
  },
  onRemove() {
    this.$emit('onRemoveCmp', this.cmpId)
  },

  methods: {
    isOptionsContain(type) {
      const options = [
        ...Object.keys(this.editOptions.style),
        ...Object.keys(this.editOptions.meta),
      ]
      console.log(this.editOptions.style);
      console.log('cmp', options.includes(type))

      return options.includes(type)
    },

    //TODO CHANGE NAME
    updateOptions() {
      eventBus.emit('cmpUpdated', {
        cmpId: this.id,
        elType: this.elType,
        updatedStyle: this.updatedOptions,
        childCmpId: this.childCmpId
      })
    },

    updateContent() {
      this.$emit('update', { cmpId: id, elType, content: info.text.content, childCmpId: this.childCmpId })
    },

    removeCmp() {
      this.$store.dispatch({
        type: 'removeCmp',
        cmpId: (this.childCmpId) ? this.childCmpId : this.id
      })
    },

    updateBorderRadius() {
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

        if (!this.loadedMapLocation) throw new Error('Map Has\'nt been loaded')

        // Handle state when getting data
        this.updatedOptions.meta.mapData = this.loadedMapLocation
        this.updateOptions()
      } catch(err) {
        this.closeMapLocationLoader()
        console.log(err);
      }

    },

    closeMapLocationLoader() {
        this.isMapLocationLoader = false
    }
  },
  watch: {
    editOptions() {
      this.updatedOptions = JSON.parse(JSON.stringify(this.editOptions))
    },
    id() {
      this.tempBorderRadius = parseInt(this.editOptions.style?.borderRadius)
    }
  },

  created() {
        this.getMapData = utilService.debounce(this.getMapData, 1500)

  },

  component: {
    imgUploader
  }
}
</script>

<style>
.imgUploader {
  padding: 150px;
  background-color: whitesmoke;
}
</style>
