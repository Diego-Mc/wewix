<template>
  <section
    v-if="info.img1"
    class="gallery-section"
    :class="'type-' + typeId"
    @click.stop="emitSelect"
    :style="options.style">
    <div class="gallery-item" v-for="(cmp, key) in info">
      <div class="img-container">
        <img :src="cmp.options.meta.src" />
      </div>
      <h6
        v-if="cmp.content.text"
        class="img-text"
        @input="updateContent(key, $event)"
        :style="info[key]?.options.style"
        @click.stop="emitSelect(key)"
        :contenteditable="$store.getters.isEditMode">
        {{ info[key]?.content.text }}
      </h6>
    </div>
  </section>
</template>

<script>
import { eventBus } from '../../services/event-bus.service'

export default {
  props: ['info', 'cmpId', 'childCmpId', 'options', 'typeId'],
  methods: {
    // Change 'gallery' into 'img1'
    emitSelect() {
      eventBus.emit('select', {
        cmpId: this.cmpId,
        childCmpId: this.childCmpId,
        elType: 'gallery',
      })
    },
    onSelect() {
      eventBus.emit('select', {
        cmpId: this.cmpId,
        childCmpId: this.childCmpId,
        elType: 'gallery',
      })
    },
  },
  created() {
    console.log(this.info, 'HR')
  },
}
</script>

<style lang="scss" scoped></style>
