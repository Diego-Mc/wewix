<template>
  <section v-if="editOptions" class="cmp-editor">

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
        <input @input="updateBorderRadius" type="range" v-model="tempBorderRadius" min="0.1" max="2"  step="0.1"/>
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
          <input @change="getLatLng($event)" type="text">
      </div>


      <div>
        <button @click.stop="removeCmp">Delete</button>
      </div>

    </section>


  </section>
</template>

<script>
import axios from 'axios'
import { eventBus } from '../../services/event-bus.service'
import { utilService } from '../../services/util.service'
import mapEdit from './map-edit.vue'
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
      tempBorderRadius: parseInt(this.editOptions.style?.borderRadius)
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
          cmpId: (this.childCmpId) ? this.childCmpId : this.id})
    },

    updateBorderRadius() {
      const borderRadius = this.tempBorderRadius + 'em'
      this.editOptions.style.borderRadius = borderRadius
      this.updateOptions()
    },

    async getLatLng(ev) {
        const place = ev.target.value

        if (!place) return

        const api_key = 'pk.dc87f5d9af931a664e3281457d48045b'
        
        const {data} = await axios.get(`https://eu1.locationiq.com/v1/search?key=${api_key}&q=${place}&format=json`)
        const mapData = (data[0]) ? 
              {title: place, label: place.charAt(0),  position: {lat: data[0].lat, lng: data[0].lon}} :
              {title: 'Jerusalem', label: 'JSM', position: { lat: 31.7683, lng: 35.2137 }}
        
        this.updatedOptions.meta.mapData = mapData
        this.updateOptions()
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
    this.getLatLng = utilService.debounce(this.getLatLng)
  },

  component: {
    mapEdit,
  }
}
</script>
