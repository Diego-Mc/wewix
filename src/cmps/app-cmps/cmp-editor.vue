<template>
  <section v-if="editOptions" class="cmp-editor">
    <button @click="updateOptions">click</button>
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

      <div >
        <button @click.stop="removeCmp">Delete</button>
      </div>
    </section>


  </section>
</template>

<script>
import { eventBus } from '../../services/event-bus.service'

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
}
</script>
