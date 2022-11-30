<template>
  <section v-if="editOptions" class="cmp-editor">
    <button @click="log">click</button>
    <section class="style-editor">
      <div v-if="isOptionsContain('fontFamily')">
        Font Picker
        <select @change="log" v-model="updatedOptions.style.fontFamily">
          <option>arial</option>
          <option>Gill Sans</option>
          <option>Calibri</option>
        </select>
      </div>

      <div v-if="isOptionsContain('backgroundColor')">
        Background Color Picker
        <input @input="log" v-model="updatedOptions.style.backgroundColor" type="color" />
      </div>

      <div v-if="isOptionsContain('color')">
        Color Picker
        <input @input="log" v-model="updatedOptions.style.color" type="color" />
      </div>

      <div v-if="isOptionsContain('fontWeight')">
        Font Weight Picker
        <select @change="log" v-model="updatedOptions.style.fontWeight">
          <option>lighter</option>
          <option>normal</option>
          <option>bold</option>
          <option>bolder</option>
        </select>
      </div>

      <div v-if="isOptionsContain('borderRadius')">
        Border Radius Picker
        <input @input="log" v-model="updatedOptions.style.borderRadius" type="range" />
      </div>
    </section>

    <section class="content-editor">
      <div v-if="isOptionsContain('img')">
        Img Picker
        <input @input="log" v-model="updatedOptions.meta.img" type="text" placeholder="img" />
      </div>

      <div v-if="isOptionsContain('link')">
        Link
        <input @input="log" v-model="updatedOptions.meta.link" type="text" placeholder="link" />
      </div>

      <div>
        <button @click.stop="removeCmp">Delete</button>
      </div>
    </section>


  </section>
</template>

<script>
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
    }
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
    log() {
      this.$emit('update', {
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
      console.log(this.childCmpId, this.cmpId);
        this.$store.dispatch({ 
          type: 'removeCmp', 
          isChildCmp: this.childCmpId, 
          cmpId: (this.childCmpId) ? this.childCmpId : this.id})
    }
  },
  watch: {
    editOptions() {
      this.updatedOptions = JSON.parse(JSON.stringify(this.editOptions))
    },
  },


}
</script>
