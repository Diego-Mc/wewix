<template>
  <section
    v-if="info.img1"
    class="gallery-section"
    :class="'type-' + typeId"
    :style="options.style">
    <div class="gallery-item" v-for="(cmp, key) in info">
      <div class="img-container">
        <img :src="cmp.options.meta.src" />
      </div>
      <!-- @click.stop="emitSelect" -->

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
    emitSelect(key) {
      console.log('key', key)
      eventBus.emit('select', {
        cmpId: this.cmpId,
        elType: 'img' + key,
        childCmpId: this.childCmpId,
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
