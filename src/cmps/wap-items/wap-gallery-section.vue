<template>
  <section
    v-if="info.img1"
    class="gallery-section"
    :class="'type-' + typeId"
    :style="options.style">
    <div class="gallery-item" v-for="(cmp, key) in info">
      <div class="img-container">
        <img :src="cmp.options.meta.src"  @click.stop="emitSelect(key, $event)"/>
      </div>
        <!-- <h6
        v-if="cmp.content.text"
        class="img-text"
        @input="updateContent(key, $event)"
        :style="info[key]?.options.style"
        @click.stop="emitSelect(key, $event)"
        :contenteditable="$store.getters.isEditMode">
        {{ info[key]?.content.text }}
      </h6> -->
     
    </div>
  </section>
</template>

<script>
import { eventBus } from '../../services/event-bus.service'

export default {
  props: ['info', 'cmpId', 'childCmpId', 'options', 'typeId'],
  methods: {
    // Change 'gallery' into 'img1'
    updateContent(elType, e) {
      eventBus.emit('cmpUpdated', {
        cmpId: this.cmpId,
        elType,
        content: e.target.innerText,
        childCmpId: this.childCmpId,
        elDom: e,
      })
    },
    emitSelect(key, e) {
      console.log(key)
      eventBus.emit('select', {
        cmpId: this.cmpId,
        elType: key,
        childCmpId: this.childCmpId,
        elDom: e,
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
