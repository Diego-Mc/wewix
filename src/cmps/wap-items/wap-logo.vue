<template>
  <article class="logo" :class="'type-' + typeId">
    <img
      v-if="info.img"
      :style="info?.img?.options.style"
      @click.stop="emitSelect('img', $event)"
      class="card-img"
      :src="info?.img?.options.meta.src" />
    <h1
      v-if="info?.title"
      class="title"
      :style="info?.title?.options.style"
      @click.stop="emitSelect('title', $event)"
      @input="updateContent('title', $event)"
      :contenteditable="$store.getters.isEditMode">
      {{ info?.title?.content.text }}
    </h1>
  </article>
</template>

<script>
import { eventBus } from '../../services/event-bus.service'

export default {
  props: ['info', 'cmpId', 'options', 'childCmpId', 'typeId'],
  methods: {
    updateContent(elType, e) {
      eventBus.emit('cmpUpdated', {
        cmpId: this.cmpId,
        elType,
        content: e.target.innerText,
        childCmpId: this.childCmpId,
        elDom: e,

      })
    },
    emitSelect(elType, e) {
      eventBus.emit('select', {
        cmpId: this.cmpId,
        childCmpId: this.childCmpId,
        elType,
        elDom: e,
      })
    },
  },
}
</script>

<style lang="scss" scoped></style>
